# Vercel Setup Checklist - Unified Deployment

## ⚠️ IMPORTANT: Vercel Project Settings

Your Vercel project MUST be configured correctly for the unified deployment to work.

## Step-by-Step Setup

### 1. Go to Vercel Dashboard
- Visit https://vercel.com/dashboard
- Select your project (the one deployed at `fig-kit.vercel.app`)

### 2. Check Root Directory
- Go to **Settings** → **General**
- Find **Root Directory**
- ✅ It should be **EMPTY** or set to **`.`** (dot)
- ❌ If it says `apps/docs`, **CHANGE IT** to empty/`.`

### 3. Verify Build Settings
In **Settings** → **General**, verify:

**Build Command:**
```
pnpm install && bash scripts/build-unified.sh
```

**Output Directory:**
```
.vercel-output
```

**Install Command:**
```
pnpm install
```

**Node.js Version:**
```
20.x
```

### 4. Save and Redeploy
- Click **Save**
- Go to **Deployments** tab
- Click **Redeploy** on the latest deployment
- Or push a new commit to trigger auto-deploy

## What Should Happen

After the build completes, you should see in the build logs:
```
✅ Copied docs build
✅ Copied Storybook build
✅ Copied sandbox build to /sandbox/
✅ Updated asset paths in sandbox index.html
✨ Unified build complete!
```

## Testing After Deployment

Once deployed, test these URLs:
- ✅ `https://fig-kit.vercel.app/` → Should show docs
- ✅ `https://fig-kit.vercel.app/storybook` → Should show Storybook
- ✅ `https://fig-kit.vercel.app/test-npm` → Should show test page
- ✅ `https://fig-kit.vercel.app/performance` → Should show performance page

## If Still Not Working

1. **Check Build Logs** - Look for errors in the build process
2. **Verify Files Exist** - Check that `.vercel-output` directory was created
3. **Check Rewrites** - Verify the rewrites in `vercel.json` are correct
4. **Contact Support** - If all else fails, check Vercel support docs

## Common Issues

### Issue: "Root Directory is apps/docs"
**Fix:** Change it to `.` (empty) in Vercel settings

### Issue: "Build script not found"
**Fix:** Ensure Root Directory is set to repo root, not `apps/docs`

### Issue: "Output directory not found"
**Fix:** Check that the build script created `.vercel-output/` directory

### Issue: "404 on all routes"
**Fix:** Verify Root Directory is correct and `vercel.json` is at repo root

