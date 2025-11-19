# Build Fix - Vercel Root Directory Issue

## Problem

Vercel is looking for the build script at `/vercel/path0/apps/docs/scripts/build-unified.js`, which means **Vercel's Root Directory is still set to `apps/docs`**.

## Solution

You MUST update Vercel project settings:

### Step 1: Go to Vercel Dashboard
1. Visit https://vercel.com/dashboard
2. Select your project (the one at `fig-kit.vercel.app`)

### Step 2: Change Root Directory
1. Go to **Settings** → **General**
2. Scroll to **Root Directory**
3. **CHANGE IT** from `apps/docs` to **EMPTY/BLANK** (clear the field completely)
4. Click **Save**

**Important**: Vercel doesn't accept `.` as a value. Leave the field empty to use the repo root.

### Step 3: Verify Build Settings
Make sure these are set correctly:

- **Build Command**: `pnpm install && node scripts/build-unified.js`
- **Output Directory**: `.vercel-output`
- **Install Command**: `pnpm install`
- **Root Directory**: **EMPTY/BLANK** (leave field empty)

### Step 4: Redeploy
1. Go to **Deployments** tab
2. Click **Redeploy** on the latest deployment
3. Or push a new commit to trigger auto-deploy

## Why This Happens

When Root Directory is set to `apps/docs`:
- Vercel treats `apps/docs` as the project root
- It looks for `vercel.json` in `apps/docs/` (which we deleted)
- It runs commands relative to `apps/docs/`
- So `node scripts/build-unified.js` becomes `node apps/docs/scripts/build-unified.js` (which doesn't exist)

When Root Directory is `.` (repo root):
- Vercel treats the repo root as the project root
- It finds `vercel.json` at the repo root
- It runs commands relative to repo root
- So `node scripts/build-unified.js` correctly finds `scripts/build-unified.js`

## Temporary Workaround

I've updated the build script to detect the repo root automatically, but **you still need to change the Root Directory setting** for everything to work correctly.

