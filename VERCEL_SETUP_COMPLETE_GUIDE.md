# Complete Vercel Setup Guide - Step by Step

## 🎯 Goal
Deploy all apps (Docs, Storybook, Test NPM, Performance) on a single domain: `https://fig-kit.vercel.app`

## ⚠️ CRITICAL: Root Directory Fix

**This is the #1 issue causing build failures!**

### Step 1: Access Vercel Dashboard
1. Go to https://vercel.com/dashboard
2. Sign in if needed
3. Find your project (should be named something like `FigKit` or `fig-kit`)

### Step 2: Navigate to Settings
1. Click on your project
2. Click **Settings** tab (top navigation)
3. Click **General** (left sidebar)

### Step 3: Fix Root Directory
1. Scroll down to **Root Directory** section
2. **Current value**: Probably says `apps/docs` ❌
3. **Change to**: `.` (just a dot) or leave it **EMPTY** ✅
4. Click **Save**

### Step 4: Verify Build Settings
While you're in Settings → General, verify these settings:

#### Build & Development Settings
- **Framework Preset**: `Other` or leave empty
- **Build Command**: `pnpm install && node scripts/build-unified.js`
- **Output Directory**: `.vercel-output`
- **Install Command**: `pnpm install`
- **Root Directory**: `.` (or empty) ✅

#### Node.js Version
- Should be **20.x** or higher
- Check **Node.js Version** dropdown

### Step 5: Environment Variables (if needed)
Go to **Settings** → **Environment Variables**

You shouldn't need any for the basic build, but if you have any:
- Make sure they're set for **Production**, **Preview**, and **Development** as needed

### Step 6: Redeploy
1. Go to **Deployments** tab
2. Find the latest deployment (should show "Failed" or "Error")
3. Click the **three dots** (⋯) menu
4. Click **Redeploy**
5. Or click **Deploy** → **Deploy Latest Commit**

### Step 7: Monitor Build
1. Watch the build logs in real-time
2. Look for these success messages:
   ```
   ✅ Copied docs build to root
   ✅ Copied Storybook build
   ✅ Copied sandbox build
   ✅ Updated asset paths in sandbox index.html
   ✨ Unified build complete!
   ```

### Step 8: Test URLs
Once deployment succeeds, test these URLs:

- ✅ `https://fig-kit.vercel.app/` → Should show Docs homepage
- ✅ `https://fig-kit.vercel.app/storybook` → Should show Storybook
- ✅ `https://fig-kit.vercel.app/test-npm` → Should show Test NPM page
- ✅ `https://fig-kit.vercel.app/performance` → Should show Performance page

## 🔍 Troubleshooting

### Issue: Build still fails with "Cannot find module"
**Solution**: Double-check Root Directory is set to `.` (not `apps/docs`)

### Issue: "404 Page Not Found" on all routes
**Solution**: 
1. Check that `.vercel-output` directory was created during build
2. Verify rewrites in `vercel.json` are correct
3. Check build logs for any errors

### Issue: Assets not loading (CSS/JS broken)
**Solution**: 
1. Check that sandbox assets are in `.vercel-output/sandbox/assets/`
2. Verify asset paths in sandbox `index.html` were updated

### Issue: Storybook not loading
**Solution**:
1. Check that Storybook built successfully
2. Verify `packages/docs/storybook-static` exists
3. Check that it was copied to `.vercel-output/storybook-static/`

## 📋 Pre-Deployment Checklist

Before deploying, make sure:

- [ ] Root Directory is set to `.` (not `apps/docs`)
- [ ] Build Command is: `pnpm install && node scripts/build-unified.js`
- [ ] Output Directory is: `.vercel-output`
- [ ] Node.js version is 20.x or higher
- [ ] `vercel.json` exists at repo root (not in `apps/docs/`)
- [ ] `scripts/build-unified.js` exists at repo root
- [ ] All code is pushed to GitHub

## 🧪 Local Testing (Optional)

To test the build locally before deploying:

```bash
# Run the build script
node scripts/build-unified.js

# Check output
ls -la .vercel-output/

# You should see:
# - index.html (docs)
# - storybook-static/ (Storybook)
# - sandbox/ (sandbox app)
```

## 📞 Still Having Issues?

1. **Check Build Logs**: Look for specific error messages
2. **Verify File Structure**: Make sure all files exist in the right places
3. **Test Locally**: Run the build script locally to catch issues early
4. **Check Vercel Status**: Visit https://vercel-status.com

## ✅ Success Indicators

You'll know it's working when:
- ✅ Build completes without errors
- ✅ All 4 URLs load correctly
- ✅ Assets (CSS, JS, images) load properly
- ✅ Navigation between routes works
- ✅ No console errors in browser

