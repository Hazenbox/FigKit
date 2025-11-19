# Deployment Readiness Report - FigKit Design System
**Date:** 2025-11-19 15:10:55  
**Reviewer:** Principal Software Engineer  
**Target Platform:** Vercel

## Executive Summary

The codebase has **TWO separate applications** that need deployment:
1. **Sandbox App** (`apps/sandbox`) - Landing page, test-npm, performance pages
2. **Docs App** (`apps/docs`) - Docusaurus documentation site

**Current Status:** ⚠️ **PARTIALLY READY** - Sandbox is configured, Docs needs configuration

---

## 1. Current Deployment Configuration

### ✅ Sandbox App (Configured)
- **Location:** `vercel.json` (root)
- **Build Command:** `pnpm install && pnpm -w run build:vercel`
- **Output Directory:** `apps/sandbox/dist`
- **Framework:** Vite
- **Status:** ✅ Ready for deployment

### ❌ Docs App (NOT Configured)
- **Location:** `apps/docs/`
- **Build Command:** Not in `vercel.json`
- **Output Directory:** Not specified
- **Framework:** Docusaurus
- **Status:** ❌ Needs Vercel configuration

---

## 2. Critical Issues to Fix

### 🔴 CRITICAL: Hardcoded Localhost URLs

**Location:** Multiple files in `apps/docs/`

**Files Affected:**
1. `apps/docs/docusaurus.config.ts` (line 120)
   - Storybook link: `http://localhost:6006`
2. `apps/docs/docs/overview.mdx` (lines 41, 44, 47, 159)
   - Storybook: `http://localhost:6006`
   - Test NPM: `http://localhost:5173/test-npm`
   - Performance: `http://localhost:5173/performance`
3. `apps/docs/docs/getting-started.mdx` (line 60)
   - Storybook: `http://localhost:6006`

**Impact:** Links will be broken in production

**Fix Required:**
- Replace with environment variables or production URLs
- Use relative paths where possible
- Create environment-specific configuration

### 🔴 CRITICAL: Workspace Dependencies in Docs

**Issue:** `apps/docs/package.json` uses `workspace:*` for:
- `@figkit/ui: workspace:*`
- `@figkit/themes: workspace:*`

**Impact:** Vercel may not resolve workspace dependencies correctly during build

**Fix Required:**
- Option 1: Build packages before docs build
- Option 2: Use published npm versions
- Option 3: Ensure build order in Vercel config

### 🟡 MEDIUM: Missing Docs Build Configuration

**Issue:** `vercel.json` only configures sandbox app

**Fix Required:**
- Option 1: Create separate Vercel project for docs
- Option 2: Use Vercel monorepo configuration
- Option 3: Create separate `vercel.json` in `apps/docs/`

### 🟡 MEDIUM: Build Script Dependencies

**Current Build Command:**
```bash
pnpm mcp:pull:tokens && pnpm --filter @figkit/tokens build && pnpm --filter @figkit/themes prepublishOnly && pnpm --filter @figkit/ui build && pnpm --filter sandbox build
```

**Issues:**
1. `mcp:pull:tokens` may fail if `variables/` folder doesn't exist
2. Build order is critical - must build tokens → themes → ui → apps
3. Docs app not included in build chain

---

## 3. Deployment Strategy Recommendations

### Option A: Separate Projects (Recommended)
**Deploy sandbox and docs as separate Vercel projects**

**Pros:**
- Independent deployments
- Separate domains/subdomains
- Easier to manage
- Better for scaling

**Cons:**
- Two projects to manage
- Need to coordinate deployments

**Configuration:**
1. **Sandbox Project:**
   - Root: `/`
   - Build: `pnpm install && pnpm -w run build:vercel`
   - Output: `apps/sandbox/dist`

2. **Docs Project:**
   - Root: `apps/docs`
   - Build: `pnpm install && pnpm --filter @figkit/tokens build && pnpm --filter @figkit/themes prepublishOnly && pnpm --filter @figkit/ui build && pnpm build`
   - Output: `apps/docs/build`

### Option B: Monorepo with Path Routing
**Single Vercel project with path-based routing**

**Pros:**
- Single deployment
- Single domain
- Easier URL management

**Cons:**
- More complex configuration
- Both apps must build together
- Harder to scale independently

**Configuration:**
- Use Vercel's monorepo features
- Configure rewrites for `/docs/*` → docs app
- Configure rewrites for `/*` → sandbox app

### Option C: Single App (Simplest)
**Deploy only docs OR only sandbox**

**Pros:**
- Simplest configuration
- Single build process

**Cons:**
- Lose functionality of other app
- Not recommended for production

---

## 4. Required Fixes Before Deployment

### Priority 1: Critical Fixes

1. **Fix Hardcoded URLs**
   ```typescript
   // Create apps/docs/src/config.ts
   export const config = {
     storybookUrl: process.env.STORYBOOK_URL || 'https://storybook.figkit.dev',
     sandboxUrl: process.env.SANDBOX_URL || 'https://figkit.dev',
   };
   ```

2. **Fix Workspace Dependencies**
   - Ensure build order: tokens → themes → ui → docs
   - Add to build script:
     ```bash
     pnpm --filter @figkit/tokens build && \
     pnpm --filter @figkit/themes prepublishOnly && \
     pnpm --filter @figkit/ui build && \
     cd apps/docs && pnpm build
     ```

3. **Create Docs Vercel Config**
   - Option: Create `apps/docs/vercel.json`
   - Option: Update root `vercel.json` for monorepo

### Priority 2: Important Fixes

4. **Environment Variables**
   - Document required env vars
   - Set up in Vercel dashboard
   - Add to `.env.example`

5. **Build Verification**
   - Test build locally: `cd apps/docs && pnpm build`
   - Verify output in `apps/docs/build/`
   - Check for missing assets

6. **Error Handling**
   - Add error boundaries
   - Handle missing dependencies gracefully
   - Add fallbacks for external links

### Priority 3: Nice to Have

7. **Performance Optimization**
   - Image optimization
   - Code splitting
   - Lazy loading

8. **Analytics**
   - Add Vercel Analytics
   - Track page views
   - Monitor errors

9. **SEO**
   - Meta tags
   - Open Graph
   - Sitemap

---

## 5. Build Process Verification

### Current Build Chain
```
1. pnpm install
2. pnpm mcp:pull:tokens (pulls from variables/)
3. @figkit/tokens build (JSON → JS/CSS)
4. @figkit/themes prepublishOnly (tokens → CSS)
5. @figkit/ui build (components)
6. sandbox build (Vite)
```

### Missing: Docs Build
```
7. apps/docs build (Docusaurus) ← MISSING
```

### Recommended Build Script
```json
{
  "scripts": {
    "build:all": "pnpm mcp:pull:tokens && pnpm --filter @figkit/tokens build && pnpm --filter @figkit/themes prepublishOnly && pnpm --filter @figkit/ui build",
    "build:sandbox": "pnpm build:all && pnpm --filter sandbox build",
    "build:docs": "pnpm build:all && cd apps/docs && pnpm build"
  }
}
```

---

## 6. Environment Variables

### Required for Build
- None (if `variables/` folder is committed)

### Optional for Runtime
- `STORYBOOK_URL` - Storybook deployment URL
- `SANDBOX_URL` - Sandbox deployment URL
- `FIGMA_PAT` - Figma API token (if using Figma integration)
- `FIGMA_FILE_KEY` - Figma file key (if using Figma integration)

### Recommended Setup
```bash
# In Vercel Dashboard → Settings → Environment Variables
STORYBOOK_URL=https://storybook.figkit.dev
SANDBOX_URL=https://figkit.dev
```

---

## 7. File Structure Review

### ✅ Good
- Monorepo structure is clean
- Workspace configuration is correct
- Build outputs are in correct locations
- `.gitignore` properly configured

### ⚠️ Concerns
- `variables/` folder must be committed (or build will fail)
- Large `node_modules` (consider `.npmrc` for optimization)
- Multiple build outputs (ensure `.vercelignore` is correct)

---

## 8. Testing Checklist

Before deploying, verify:

- [ ] `pnpm install` completes successfully
- [ ] `pnpm build:all` completes successfully
- [ ] `cd apps/docs && pnpm build` completes successfully
- [ ] `cd apps/sandbox && pnpm build` completes successfully
- [ ] No hardcoded localhost URLs remain
- [ ] All workspace dependencies resolve
- [ ] Build output directories exist
- [ ] Static assets are included
- [ ] No TypeScript errors
- [ ] No linting errors

---

## 9. Recommended Deployment Steps

### For Sandbox (Already Configured)
1. ✅ Connect GitHub repo to Vercel
2. ✅ Vercel auto-detects `vercel.json`
3. ✅ Deploy

### For Docs (Needs Configuration)
1. **Create new Vercel project** for docs
2. **Set root directory:** `apps/docs`
3. **Set build command:**
   ```bash
   cd ../.. && pnpm install && pnpm --filter @figkit/tokens build && pnpm --filter @figkit/themes prepublishOnly && pnpm --filter @figkit/ui build && cd apps/docs && pnpm build
   ```
4. **Set output directory:** `build`
5. **Set install command:** `cd ../.. && pnpm install`
6. **Add environment variables** (if needed)
7. **Deploy**

---

## 10. Post-Deployment Checklist

- [ ] Verify all pages load correctly
- [ ] Check all links work (no localhost)
- [ ] Verify images/assets load
- [ ] Test responsive design
- [ ] Check console for errors
- [ ] Verify analytics (if added)
- [ ] Test dark mode
- [ ] Verify SEO meta tags
- [ ] Check performance scores
- [ ] Test on multiple browsers

---

## 11. Risk Assessment

### High Risk
- **Workspace dependencies** - May fail in Vercel build
- **Hardcoded URLs** - Will break in production
- **Missing build config** - Docs won't deploy

### Medium Risk
- **Build order** - Dependencies must build in correct order
- **Large builds** - May hit Vercel build time limits
- **Asset paths** - May need adjustment for production

### Low Risk
- **TypeScript errors** - Should be caught in CI
- **Linting** - Non-blocking
- **Performance** - Can optimize post-deployment

---

## 12. Recommendations

### Immediate Actions (Before Deployment)
1. ✅ Fix hardcoded localhost URLs
2. ✅ Create docs Vercel configuration
3. ✅ Test build process locally
4. ✅ Verify workspace dependencies work

### Short-term (Post-Deployment)
1. Set up environment variables
2. Configure custom domains
3. Add analytics
4. Optimize performance

### Long-term (Future Improvements)
1. Set up CI/CD for both apps
2. Add preview deployments
3. Implement automated testing
4. Add monitoring and error tracking

---

## 13. Conclusion

**Current Status:** ⚠️ **NOT READY** for production deployment

**Blockers:**
1. Hardcoded localhost URLs in docs
2. Missing Vercel configuration for docs
3. Workspace dependencies may not resolve in Vercel

**Estimated Fix Time:** 2-4 hours

**Recommended Approach:**
1. Fix critical issues (2 hours)
2. Test builds locally (30 minutes)
3. Deploy to preview/staging (30 minutes)
4. Verify and deploy to production (30 minutes)

**Next Steps:**
1. Review and approve this report
2. Fix critical issues
3. Test deployment locally
4. Deploy to Vercel

---

**Report Generated:** 2025-11-19 15:10:55  
**Next Review:** After fixes are implemented

