# Vercel Deployment Fix Guide

## Issue
Vercel is building commit `7958ea2` (old) instead of `aaaeb2f` (new with fix).

## Current Status
✅ **vercel.json is correct** - Uses the correct build command:
```bash
pnpm install && pnpm --filter @figkit/tokens build && pnpm --filter @figkit/themes prepublishOnly && pnpm --filter @figkit/ui build && cd apps/sandbox && pnpm build
```

✅ **Code is pushed** - Latest commit `aaaeb2f` is on GitHub

## Solution Steps

### Option 1: Trigger New Deployment in Vercel Dashboard
1. Go to https://vercel.com/dashboard
2. Find your `FigKit` project
3. Click on the project
4. Go to **Deployments** tab
5. Click **"Redeploy"** on the latest deployment
6. Or click **"Deploy"** → **"Deploy Latest Commit"**

### Option 2: Check Vercel Project Settings
1. Go to your project in Vercel dashboard
2. Click **Settings** → **General**
3. Scroll to **Build & Development Settings**
4. **IMPORTANT**: Make sure **"Build Command"** is set to:
   - **"Override"** = OFF (so it uses `vercel.json`)
   - OR if "Override" is ON, set it to:
     ```
     pnpm install && pnpm --filter @figkit/tokens build && pnpm --filter @figkit/themes prepublishOnly && pnpm --filter @figkit/ui build && cd apps/sandbox && pnpm build
     ```

### Option 3: Manual Deploy via CLI
```bash
# Install Vercel CLI if needed
npm i -g vercel

# Login
vercel login

# Deploy
vercel --prod
```

### Option 4: Force New Deployment
If Vercel isn't detecting the new commit:
1. Make a small change (add a comment or space)
2. Commit and push:
   ```bash
   git commit --allow-empty -m "Trigger Vercel rebuild"
   git push origin master
   ```

## Build Command Breakdown
The correct build sequence is:
1. `pnpm install` - Install all dependencies
2. `pnpm --filter @figkit/tokens build` - Build tokens (generates JSON → JS/CSS)
3. `pnpm --filter @figkit/themes prepublishOnly` - Build themes (reads tokens JSON → generates CSS)
4. `pnpm --filter @figkit/ui build` - Build UI components
5. `cd apps/sandbox && pnpm build` - Build the sandbox app

## Verification
After deployment, check:
- ✅ Build logs show the correct command
- ✅ All packages build successfully
- ✅ No "Command not found" errors
- ✅ Site deploys successfully

## If Still Failing
1. Check Vercel build logs for the exact error
2. Verify the commit hash in Vercel matches `aaaeb2f`
3. Clear Vercel build cache (Settings → General → Clear Build Cache)
4. Check if there are any environment variables needed

