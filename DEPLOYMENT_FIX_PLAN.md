# Deployment Fix Plan - Detailed Implementation Checklist
**Created:** 2025-11-19  
**Status:** Ready for Implementation  
**Estimated Time:** 2-4 hours

---

## Overview

This plan addresses all critical issues identified in the Deployment Readiness Report to make the codebase production-ready for Vercel deployment.

---

## Phase 1: Fix Hardcoded Localhost URLs

### Issue
Multiple files contain hardcoded `localhost` URLs that will break in production.

### Files to Fix
1. `apps/docs/docusaurus.config.ts` (line 120)
2. `apps/docs/docs/overview.mdx` (lines 41, 44, 47, 159)
3. `apps/docs/docs/getting-started.mdx` (line 60)

### Implementation Steps

#### Step 1.1: Create Environment Configuration
**File:** `apps/docs/src/config.ts` (NEW)

```typescript
// Environment configuration for docs
export const config = {
  storybookUrl: 
    typeof window !== 'undefined' 
      ? (window as any).__STORYBOOK_URL__ || process.env.STORYBOOK_URL || 'https://storybook.figkit.dev'
      : process.env.STORYBOOK_URL || 'https://storybook.figkit.dev',
  
  sandboxUrl: 
    typeof window !== 'undefined'
      ? (window as any).__SANDBOX_URL__ || process.env.SANDBOX_URL || 'https://figkit.dev'
      : process.env.SANDBOX_URL || 'https://figkit.dev',
  
  performanceUrl:
    typeof window !== 'undefined'
      ? (window as any).__PERFORMANCE_URL__ || process.env.PERFORMANCE_URL || 'https://figkit.dev/performance'
      : process.env.PERFORMANCE_URL || 'https://figkit.dev/performance',
};
```

**Checklist:**
- [ ] Create file `apps/docs/src/config.ts`
- [ ] Add environment variable support
- [ ] Add fallback URLs for production
- [ ] Export config object

#### Step 1.2: Update Docusaurus Config
**File:** `apps/docs/docusaurus.config.ts`

**Change:**
```typescript
// Add import at top
import { config } from './src/config';

// In footer links (line ~120), change:
{
  label: 'Storybook',
  href: 'http://localhost:6006',  // ❌ OLD
}
// To:
{
  label: 'Storybook',
  href: config.storybookUrl,  // ✅ NEW
}
```

**Checklist:**
- [ ] Import config at top of file
- [ ] Replace `http://localhost:6006` with `config.storybookUrl`
- [ ] Verify no other localhost URLs remain in this file

#### Step 1.3: Update Overview Page
**File:** `apps/docs/docs/overview.mdx`

**Changes:**
```mdx
<!-- Add at top of file (after frontmatter) -->
import { config } from '../src/config';

<!-- Replace line 41: -->
<a href="http://localhost:6006" ...>  <!-- ❌ OLD -->
<!-- With: -->
<a href={config.storybookUrl} ...>  <!-- ✅ NEW -->

<!-- Replace line 44: -->
<a href="http://localhost:5173/test-npm" ...>  <!-- ❌ OLD -->
<!-- With: -->
<a href={`${config.sandboxUrl}/test-npm`} ...>  <!-- ✅ NEW -->

<!-- Replace line 47: -->
<a href="http://localhost:5173/performance" ...>  <!-- ❌ OLD -->
<!-- With: -->
<a href={config.performanceUrl} ...>  <!-- ✅ NEW -->

<!-- Replace line 159: -->
- **Storybook**: Interactive component playground at [http://localhost:6006](http://localhost:6006)  <!-- ❌ OLD -->
<!-- With: -->
- **Storybook**: Interactive component playground at [Storybook]({config.storybookUrl})  <!-- ✅ NEW -->
```

**Checklist:**
- [ ] Import config at top
- [ ] Replace all 4 localhost URLs
- [ ] Test that links work in MDX

#### Step 1.4: Update Getting Started Page
**File:** `apps/docs/docs/getting-started.mdx`

**Change:**
```mdx
<!-- Add import at top -->
import { config } from '../src/config';

<!-- Replace line 60: -->
- Check out the [Storybook](http://localhost:6006) for interactive examples  <!-- ❌ OLD -->
<!-- With: -->
- Check out the [Storybook]({config.storybookUrl}) for interactive examples  <!-- ✅ NEW -->
```

**Checklist:**
- [ ] Import config
- [ ] Replace localhost URL
- [ ] Verify markdown link syntax works

#### Step 1.5: Create Environment Variable Documentation
**File:** `apps/docs/.env.example` (NEW)

```bash
# Storybook deployment URL
STORYBOOK_URL=https://storybook.figkit.dev

# Sandbox deployment URL
SANDBOX_URL=https://figkit.dev

# Performance page URL
PERFORMANCE_URL=https://figkit.dev/performance
```

**Checklist:**
- [ ] Create `.env.example` file
- [ ] Document all environment variables
- [ ] Add to `.gitignore` (`.env` should already be ignored)

#### Step 1.6: Verification
**Checklist:**
- [ ] Run `cd apps/docs && pnpm build` - should complete without errors
- [ ] Check `apps/docs/build/` - verify HTML contains production URLs
- [ ] Search for "localhost" in built files: `grep -r "localhost" apps/docs/build/` - should return 0 results
- [ ] Test locally: `cd apps/docs && pnpm start` - verify links work

---

## Phase 2: Create Vercel Configuration for Docs

### Issue
Docs app has no Vercel deployment configuration.

### Implementation Steps

#### Step 2.1: Create Docs Vercel Config
**File:** `apps/docs/vercel.json` (NEW)

```json
{
  "version": 2,
  "buildCommand": "cd ../.. && pnpm install && pnpm --filter @figkit/tokens build && pnpm --filter @figkit/themes prepublishOnly && pnpm --filter @figkit/ui build && cd apps/docs && pnpm build",
  "outputDirectory": "build",
  "installCommand": "cd ../.. && pnpm install",
  "framework": null,
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        }
      ]
    }
  ]
}
```

**Checklist:**
- [ ] Create `apps/docs/vercel.json`
- [ ] Set correct build command (from root, builds dependencies first)
- [ ] Set output directory to `build` (Docusaurus default)
- [ ] Add security headers
- [ ] Add SPA rewrite rules

#### Step 2.2: Update Root Package.json Build Scripts
**File:** `package.json`

**Add new scripts:**
```json
{
  "scripts": {
    // ... existing scripts ...
    "build:docs": "pnpm mcp:pull:tokens && pnpm --filter @figkit/tokens build && pnpm --filter @figkit/themes prepublishOnly && pnpm --filter @figkit/ui build && cd apps/docs && pnpm build",
    "build:all": "pnpm mcp:pull:tokens && pnpm --filter @figkit/tokens build && pnpm --filter @figkit/themes prepublishOnly && pnpm --filter @figkit/ui build"
  }
}
```

**Checklist:**
- [ ] Add `build:docs` script
- [ ] Add `build:all` script (shared dependencies)
- [ ] Verify script order is correct

#### Step 2.3: Create .vercelignore for Docs
**File:** `apps/docs/.vercelignore` (NEW)

```
node_modules
.docusaurus
.cache
*.log
*.tsbuildinfo
```

**Checklist:**
- [ ] Create `.vercelignore` file
- [ ] Add unnecessary files/directories
- [ ] Ensure build output is NOT ignored

#### Step 2.4: Verification
**Checklist:**
- [ ] Test build command locally: `cd ../.. && pnpm install && pnpm --filter @figkit/tokens build && pnpm --filter @figkit/themes prepublishOnly && pnpm --filter @figkit/ui build && cd apps/docs && pnpm build`
- [ ] Verify `apps/docs/build/` directory is created
- [ ] Check build output size (should be reasonable)
- [ ] Verify no errors in build log

---

## Phase 3: Fix Workspace Dependencies

### Issue
Docs app uses `workspace:*` which may not resolve correctly in Vercel.

### Implementation Steps

#### Step 3.1: Verify Build Order
**Current Order (CORRECT):**
1. `@figkit/tokens` - Generates JSON files
2. `@figkit/themes` - Reads tokens JSON, generates CSS
3. `@figkit/ui` - Uses themes CSS
4. `apps/docs` - Uses UI and themes

**Checklist:**
- [ ] Verify build order in `build:docs` script
- [ ] Ensure tokens build first
- [ ] Ensure themes build after tokens
- [ ] Ensure UI builds after themes
- [ ] Ensure docs builds last

#### Step 3.2: Add Build Verification
**File:** `apps/docs/package.json`

**Add prebuild script:**
```json
{
  "scripts": {
    "prebuild": "node -e \"require('@figkit/ui'); require('@figkit/themes');\" || (echo 'ERROR: Workspace dependencies not found. Run: pnpm install && pnpm --filter @figkit/tokens build && pnpm --filter @figkit/themes prepublishOnly && pnpm --filter @figkit/ui build' && exit 1)",
    "build": "docusaurus build"
  }
}
```

**Checklist:**
- [ ] Add `prebuild` script to verify dependencies exist
- [ ] Test that it fails gracefully if dependencies missing
- [ ] Test that it passes when dependencies are built

#### Step 3.3: Alternative: Use Published Packages (Optional)
**If workspace dependencies fail in Vercel, use published versions:**

**File:** `apps/docs/package.json`

**Change:**
```json
{
  "dependencies": {
    "@figkit/ui": "^0.1.1",  // Use published version
    "@figkit/themes": "^0.1.0"  // Use published version
  }
}
```

**Checklist:**
- [ ] Only do this if workspace dependencies fail
- [ ] Update to latest published versions
- [ ] Test that docs still work with published packages
- [ ] Document this as fallback option

#### Step 3.4: Verification
**Checklist:**
- [ ] Run full build: `pnpm build:docs`
- [ ] Verify no "module not found" errors
- [ ] Check that `@figkit/ui` and `@figkit/themes` are accessible
- [ ] Verify CSS imports work in built output

---

## Phase 4: Environment Variables Setup

### Implementation Steps

#### Step 4.1: Document Required Variables
**File:** `apps/docs/README.md`

**Add section:**
```markdown
## Environment Variables

For production deployment, set these in Vercel:

- `STORYBOOK_URL` - Storybook deployment URL (default: https://storybook.figkit.dev)
- `SANDBOX_URL` - Sandbox deployment URL (default: https://figkit.dev)
- `PERFORMANCE_URL` - Performance page URL (default: https://figkit.dev/performance)
```

**Checklist:**
- [ ] Add environment variables section to README
- [ ] Document defaults
- [ ] Document where to set in Vercel

#### Step 4.2: Create Vercel Environment Setup Guide
**File:** `apps/docs/VERCEL_SETUP.md` (NEW)

```markdown
# Vercel Setup for Docs

## Environment Variables

In Vercel Dashboard → Settings → Environment Variables, add:

1. **STORYBOOK_URL**
   - Production: `https://storybook.figkit.dev`
   - Preview: `https://storybook-preview.figkit.dev`

2. **SANDBOX_URL**
   - Production: `https://figkit.dev`
   - Preview: `https://figkit-preview.vercel.app`

3. **PERFORMANCE_URL**
   - Production: `https://figkit.dev/performance`
   - Preview: `https://figkit-preview.vercel.app/performance`

## Deployment Settings

- **Root Directory:** `apps/docs`
- **Build Command:** (auto-detected from vercel.json)
- **Output Directory:** `build`
- **Install Command:** `cd ../.. && pnpm install`
- **Node Version:** 20.x
```

**Checklist:**
- [ ] Create Vercel setup guide
- [ ] Document all environment variables
- [ ] Document deployment settings
- [ ] Add to git

---

## Phase 5: Testing & Verification

### Implementation Steps

#### Step 5.1: Local Build Test
**Commands:**
```bash
# From root
cd /path/to/project

# Clean install
rm -rf node_modules apps/*/node_modules packages/*/node_modules
pnpm install

# Build everything
pnpm build:docs

# Verify output
ls -la apps/docs/build/
```

**Checklist:**
- [ ] Clean install completes successfully
- [ ] Build completes without errors
- [ ] Build output directory exists
- [ ] Build output contains expected files
- [ ] No TypeScript errors
- [ ] No missing dependency errors

#### Step 5.2: Local Serve Test
**Commands:**
```bash
cd apps/docs
pnpm build
pnpm serve
# Visit http://localhost:3001
```

**Checklist:**
- [ ] Site loads correctly
- [ ] All pages accessible
- [ ] No console errors
- [ ] Links work (check Storybook, Sandbox links)
- [ ] Images/assets load
- [ ] Dark mode works
- [ ] Responsive design works

#### Step 5.3: Search for Remaining Issues
**Commands:**
```bash
# Search for localhost
grep -r "localhost" apps/docs/ --exclude-dir=node_modules --exclude-dir=.docusaurus --exclude-dir=build

# Search for hardcoded URLs
grep -r "http://localhost" apps/docs/ --exclude-dir=node_modules --exclude-dir=.docusaurus --exclude-dir=build

# Check for workspace dependencies
grep -r "workspace:\*" apps/docs/package.json
```

**Checklist:**
- [ ] No localhost URLs found (except in config.ts with fallbacks)
- [ ] No hardcoded localhost URLs
- [ ] Workspace dependencies are intentional

#### Step 5.4: Build Output Verification
**Commands:**
```bash
cd apps/docs/build

# Check for localhost in built files
grep -r "localhost" . | head -20

# Check file sizes
du -sh .
du -sh static/

# Check index.html exists
ls -la index.html
```

**Checklist:**
- [ ] No localhost in built HTML files
- [ ] Build output size is reasonable (< 50MB)
- [ ] index.html exists
- [ ] Static assets are included
- [ ] CSS files are present

---

## Phase 6: Vercel Deployment

### Implementation Steps

#### Step 6.1: Create Vercel Project for Docs
**In Vercel Dashboard:**
1. Go to https://vercel.com/dashboard
2. Click "Add New Project"
3. Import GitHub repository
4. **Configure:**
   - **Project Name:** `figkit-docs`
   - **Root Directory:** `apps/docs`
   - **Framework Preset:** Other
   - **Build Command:** (leave empty - uses vercel.json)
   - **Output Directory:** `build`
   - **Install Command:** `cd ../.. && pnpm install`

**Checklist:**
- [ ] Project created in Vercel
- [ ] Root directory set to `apps/docs`
- [ ] Build settings configured
- [ ] Install command set correctly

#### Step 6.2: Set Environment Variables
**In Vercel Dashboard → Settings → Environment Variables:**

Add:
- `STORYBOOK_URL` = `https://storybook.figkit.dev` (Production)
- `SANDBOX_URL` = `https://figkit.dev` (Production)
- `PERFORMANCE_URL` = `https://figkit.dev/performance` (Production)

**Checklist:**
- [ ] All environment variables added
- [ ] Production values set
- [ ] Preview values set (if different)
- [ ] Development values set (if needed)

#### Step 6.3: Deploy
**In Vercel Dashboard:**
1. Click "Deploy"
2. Monitor build logs
3. Wait for deployment to complete

**Checklist:**
- [ ] Build starts successfully
- [ ] No build errors
- [ ] Deployment completes
- [ ] Site is accessible
- [ ] All pages load correctly

#### Step 6.4: Post-Deployment Verification
**Test on deployed site:**
- [ ] Homepage loads
- [ ] All navigation links work
- [ ] Component pages load
- [ ] External links work (Storybook, Sandbox, etc.)
- [ ] No console errors
- [ ] Images load
- [ ] Dark mode works
- [ ] Mobile responsive
- [ ] SEO meta tags present

**Checklist:**
- [ ] All pages functional
- [ ] No broken links
- [ ] Performance is acceptable
- [ ] No errors in browser console
- [ ] Analytics working (if configured)

---

## Phase 7: Documentation Updates

### Implementation Steps

#### Step 7.1: Update Main README
**File:** `README.md`

**Add section:**
```markdown
## Deployment

### Docs Site
The documentation site is deployed to Vercel. See [apps/docs/VERCEL_SETUP.md](apps/docs/VERCEL_SETUP.md) for setup instructions.

### Sandbox App
The sandbox app is deployed to Vercel. See [apps/sandbox/README.md](apps/sandbox/README.md) for details.
```

**Checklist:**
- [ ] Add deployment section
- [ ] Link to setup guides
- [ ] Document both apps

#### Step 7.2: Update Deployment Guide
**File:** `DEPLOYMENT.md`

**Add section:**
```markdown
## Docs Deployment

The docs app requires separate Vercel configuration. See [apps/docs/VERCEL_SETUP.md](apps/docs/VERCEL_SETUP.md).
```

**Checklist:**
- [ ] Add docs deployment section
- [ ] Link to setup guide
- [ ] Document differences from sandbox

---

## Complete Checklist Summary

### Phase 1: Fix Hardcoded URLs
- [ ] Create `apps/docs/src/config.ts`
- [ ] Update `apps/docs/docusaurus.config.ts`
- [ ] Update `apps/docs/docs/overview.mdx`
- [ ] Update `apps/docs/docs/getting-started.mdx`
- [ ] Create `apps/docs/.env.example`
- [ ] Verify no localhost URLs remain

### Phase 2: Vercel Config for Docs
- [ ] Create `apps/docs/vercel.json`
- [ ] Update root `package.json` build scripts
- [ ] Create `apps/docs/.vercelignore`
- [ ] Verify build command works

### Phase 3: Workspace Dependencies
- [ ] Verify build order is correct
- [ ] Add prebuild verification script
- [ ] Test workspace dependencies resolve
- [ ] Document fallback option (published packages)

### Phase 4: Environment Variables
- [ ] Document in README
- [ ] Create Vercel setup guide
- [ ] Document all variables

### Phase 5: Testing
- [ ] Local build test
- [ ] Local serve test
- [ ] Search for remaining issues
- [ ] Build output verification

### Phase 6: Deployment
- [ ] Create Vercel project
- [ ] Set environment variables
- [ ] Deploy
- [ ] Post-deployment verification

### Phase 7: Documentation
- [ ] Update main README
- [ ] Update deployment guide
- [ ] Document any issues encountered

---

## Estimated Time Breakdown

- **Phase 1:** 45 minutes
- **Phase 2:** 30 minutes
- **Phase 3:** 30 minutes
- **Phase 4:** 15 minutes
- **Phase 5:** 30 minutes
- **Phase 6:** 30 minutes
- **Phase 7:** 15 minutes

**Total:** ~3 hours

---

## Rollback Plan

If deployment fails:

1. **Check build logs** in Vercel dashboard
2. **Verify environment variables** are set correctly
3. **Test build locally** with same command
4. **Check workspace dependencies** are built
5. **Verify file paths** are correct
6. **Rollback to previous commit** if needed

---

## Success Criteria

✅ **Deployment is successful when:**
- Docs site deploys to Vercel without errors
- All pages load correctly
- No localhost URLs in production
- All external links work
- Build completes in < 10 minutes
- Site is accessible and functional

---

**Next Steps:**
1. Review this plan
2. Start with Phase 1
3. Complete each phase in order
4. Test after each phase
5. Deploy when all phases complete

