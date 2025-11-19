# Vercel Routing Fix Guide

## Current Issue

All routes are showing "Page Not Found" because Vercel isn't finding the files in the expected locations.

## Root Cause

The issue is likely one of these:
1. **Build output not being created correctly** - The `.vercel-output` directory might not exist after build
2. **Vercel project configuration** - The Vercel project might be configured to use `apps/docs` as root, not the repo root
3. **Rewrite rules not matching** - The rewrites might not be working as expected

## Solution: Check Vercel Project Settings

### Step 1: Verify Vercel Project Root

1. Go to Vercel Dashboard → Your Project → Settings → General
2. Check the **Root Directory** setting:
   - ❌ If it's set to `apps/docs` → This is the problem!
   - ✅ It should be empty (root of repo) or `.`

### Step 2: Update Root Directory (if needed)

1. In Vercel Dashboard → Settings → General
2. Set **Root Directory** to: `.` (or leave empty)
3. This ensures Vercel uses the root `vercel.json` file

### Step 3: Verify Build Command

In Vercel Dashboard → Settings → General, the build command should be:
```
pnpm install && bash scripts/build-unified.sh
```

And **Output Directory** should be:
```
.vercel-output
```

### Step 4: Check Build Logs

After updating settings, trigger a new deployment and check:
1. Does the build script run?
2. Does `.vercel-output` directory get created?
3. Are all files copied correctly?

## Alternative: Use Vercel's Monorepo Feature

If the above doesn't work, we can configure Vercel to detect the root `vercel.json` automatically.

## Quick Test

To test if the build works locally:

```bash
# Run the build script
bash scripts/build-unified.sh

# Check if output exists
ls -la .vercel-output/

# You should see:
# - index.html (docs)
# - storybook-static/ (Storybook)
# - sandbox/ (sandbox app)
```

If the local build works but Vercel doesn't, it's a Vercel configuration issue.

