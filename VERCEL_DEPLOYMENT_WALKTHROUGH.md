# 🚀 Vercel Deployment - Complete Walkthrough
**Follow along step-by-step - I'll guide you through everything!**

---

## ✅ Step 1: Code is on GitHub (DONE!)
Your code has been pushed to GitHub successfully!

---

## 📝 Step 2: Create Vercel Account

### 2.1 Go to Vercel
1. **Open your web browser** (Chrome, Firefox, Safari, etc.)
2. **Type in the address bar:** `https://vercel.com`
3. **Press Enter**

### 2.2 Sign Up
You'll see a page with a **"Sign Up"** button.

**Option A: Sign up with GitHub (RECOMMENDED)**
1. Click **"Continue with GitHub"** button
2. You'll be asked to authorize Vercel
3. Click **"Authorize"** or **"Install"**
4. This connects your GitHub account to Vercel

**Option B: Sign up with Email**
1. Click **"Sign Up"**
2. Enter your email
3. Create a password
4. Verify your email

**✅ What you should see:** Vercel dashboard (empty if first time)

---

## 🎯 Step 3: Create New Project

### 3.1 Start New Project
1. Look for a big button that says:
   - **"Add New..."** (top right)
   - OR **"New Project"**
   - OR **"Import Project"**
2. **Click it**

### 3.2 Import Your Repository
You'll see a list of your GitHub repositories.

1. **Find "FigKit"** in the list
   - It might be under "Hazenbox" organization
   - Use the search box if you have many repos
2. **Click "Import"** next to "FigKit"

**❓ Can't see your repository?**
- Click **"Adjust GitHub App Permissions"**
- Make sure all repositories are selected
- Click **"Save"** and refresh

---

## ⚙️ Step 4: Configure Project Settings

After clicking "Import", you'll see a configuration screen. Here's what to fill in:

### 4.1 Project Name
- **Field:** "Project Name"
- **Type:** `figkit-docs`
- (This will be your URL: `figkit-docs.vercel.app`)

### 4.2 Root Directory (IMPORTANT!)
1. Find **"Root Directory"** field
2. Click **"Edit"** or the pencil icon
3. **Type:** `apps/docs`
4. Click **"Continue"** or **"Save"**

**⚠️ This is critical!** Without this, Vercel won't find your docs app.

### 4.3 Framework Preset
- **Leave as:** "Other" or "Docusaurus" (if detected)
- Don't change this

### 4.4 Build Settings
Look for these fields:

**Build Command:**
- **Leave EMPTY** (we're using vercel.json)
- OR if it's required, type: `cd ../.. && pnpm install && pnpm --filter @figkit/tokens build && pnpm --filter @figkit/themes prepublishOnly && pnpm --filter @figkit/ui build && cd apps/docs && pnpm build`

**Output Directory:**
- **Type:** `build`

**Install Command:**
- **Type:** `cd ../.. && pnpm install`

**Node.js Version:**
- Select **"20.x"** from dropdown
- (If no dropdown, it will auto-detect)

### 4.5 Environment Variables (Skip for Now)
- We'll add these after the first deployment
- **Don't add anything yet**
- Just click **"Deploy"** button

---

## 🏗️ Step 5: Watch the Build

After clicking "Deploy", you'll see:

### 5.1 Build Logs
A screen showing build progress:
```
Installing dependencies...
Building...
```

### 5.2 What's Happening
- Vercel is installing all your packages
- Building your tokens, themes, UI, and docs
- This takes 5-10 minutes the first time

### 5.3 Success Indicators
You'll see messages like:
- ✅ "Installing dependencies..."
- ✅ "Building..."
- ✅ "Build completed"
- ✅ "Deployment successful"

### 5.4 If Build Fails
**Don't panic!** Common issues:
- **"pnpm not found"** → Check Install Command
- **"Module not found"** → Check Root Directory is `apps/docs`
- **"Build timeout"** → Contact me, we'll optimize

**Take a screenshot** of any errors and I'll help fix them!

---

## 🎉 Step 6: Your Site is Live!

### 6.1 Get Your URL
After build completes, you'll see:
- **"Ready"** or **"Deployment successful"**
- A URL like: `https://figkit-docs.vercel.app`
- **Click the URL** to see your site!

### 6.2 Test Your Site
Open the URL and check:
- [ ] Homepage loads
- [ ] Navigation works
- [ ] Pages are accessible
- [ ] No errors in console (F12 → Console tab)

---

## 🔧 Step 7: Add Environment Variables

### 7.1 Go to Settings
1. In your project dashboard, click **"Settings"** (top menu)
2. Click **"Environment Variables"** (left sidebar)

### 7.2 Add First Variable
1. Click **"Add New"** button
2. Fill in:
   - **Key:** `STORYBOOK_URL`
   - **Value:** `https://storybook.figkit.dev`
   - **Environment:** Check all boxes (Production, Preview, Development)
3. Click **"Save"**

### 7.3 Add Second Variable
1. Click **"Add New"** again
2. Fill in:
   - **Key:** `SANDBOX_URL`
   - **Value:** `https://figkit.dev`
   - **Environment:** Check all boxes
3. Click **"Save"**

### 7.4 Add Third Variable
1. Click **"Add New"** again
2. Fill in:
   - **Key:** `PERFORMANCE_URL`
   - **Value:** `https://figkit.dev/performance`
   - **Environment:** Check all boxes
3. Click **"Save"**

### 7.5 Redeploy
1. Go to **"Deployments"** tab (top menu)
2. Find the latest deployment
3. Click the **"..."** (three dots) menu
4. Click **"Redeploy"**
5. Click **"Redeploy"** button (confirm)

**Wait 2-3 minutes** for rebuild, then check your site again!

---

## ✅ Final Checklist

After deployment, verify everything works:

- [ ] Site is accessible at your Vercel URL
- [ ] Homepage loads correctly
- [ ] All navigation links work
- [ ] Component pages load
- [ ] External links work (Storybook, Sandbox, etc.)
- [ ] No errors in browser console (F12)
- [ ] Dark mode works
- [ ] Mobile view works (resize browser)

---

## 🆘 Need Help?

**If you get stuck at any step:**
1. **Tell me which step** you're on
2. **Describe what you see** (or take a screenshot)
3. **I'll help you** fix it immediately!

**Common Questions:**
- **"Where do I find...?"** → Tell me, I'll guide you
- **"I see an error..."** → Share the error, I'll fix it
- **"It's not working..."** → Describe the issue, I'll help

---

## 🎯 Quick Reference

**Your Project Settings Should Be:**
- **Root Directory:** `apps/docs`
- **Build Command:** (empty or from vercel.json)
- **Output Directory:** `build`
- **Install Command:** `cd ../.. && pnpm install`
- **Node Version:** 20.x

**Your Environment Variables:**
- `STORYBOOK_URL` = `https://storybook.figkit.dev`
- `SANDBOX_URL` = `https://figkit.dev`
- `PERFORMANCE_URL` = `https://figkit.dev/performance`

---

**Ready to start? Let's go! 🚀**

Tell me when you're at the Vercel website and I'll guide you through each click!

