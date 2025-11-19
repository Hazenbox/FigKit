# Quick Vercel Fix - 3 Steps

## ⚡ Fast Fix (2 minutes)

### Step 1: Go to Vercel Dashboard
👉 https://vercel.com/dashboard → Your Project → **Settings** → **General**

### Step 2: Change Root Directory
Find **"Root Directory"** setting:
- **Current**: `apps/docs` ❌
- **Change to**: Leave it **EMPTY/BLANK** ✅ (don't enter anything)
- Click **Save**

### Step 3: Redeploy
- Go to **Deployments** tab
- Click **Redeploy** on latest deployment

## ✅ Done!

That's it! The build should now work.

## Why This Works

When Root Directory = `apps/docs`:
- Vercel looks for files in wrong place
- Can't find `scripts/build-unified.js`
- Build fails ❌

When Root Directory = **EMPTY** (blank):
- Vercel uses repo root
- Finds all files correctly
- Build succeeds ✅

## Need More Help?

See `VERCEL_SETUP_COMPLETE_GUIDE.md` for detailed instructions.

