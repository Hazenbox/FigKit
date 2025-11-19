# Step-by-Step Vercel Deployment Guide
**For Beginners - Complete Walkthrough**

This guide will walk you through deploying the FigKit docs site to Vercel, step by step.

---

## Prerequisites Checklist

Before we start, make sure you have:
- [ ] A GitHub account
- [ ] Your code pushed to GitHub (we'll verify this)
- [ ] A Vercel account (we'll create one if needed)
- [ ] About 15-20 minutes

---

## Step 1: Verify Code is on GitHub

### 1.1 Check if code is pushed
```bash
# From your project root
git status
```

**What to look for:**
- Should say "nothing to commit, working tree clean"
- If there are uncommitted changes, we'll commit them first

### 1.2 Push to GitHub (if needed)
```bash
# If you have uncommitted changes
git add .
git commit -m "Prepare for Vercel deployment"
git push origin master
```

**✅ Success:** You should see "Everything up-to-date" or your changes pushed.

---

## Step 2: Create/Login to Vercel Account

### 2.1 Go to Vercel
1. Open your browser
2. Go to: https://vercel.com
3. Click **"Sign Up"** (or **"Log In"** if you have an account)

### 2.2 Sign Up Options
- **Recommended:** Click **"Continue with GitHub"**
  - This connects your GitHub account
  - Makes deployment easier
  - Allows automatic deployments

### 2.3 Complete Sign Up
- Follow the prompts
- Authorize Vercel to access your GitHub (if using GitHub login)
- You'll be taken to the Vercel dashboard

**✅ Success:** You should see the Vercel dashboard

---

## Step 3: Create New Project for Docs

### 3.1 Start New Project
1. In Vercel dashboard, click **"Add New..."** button (top right)
2. Click **"Project"**

### 3.2 Import Repository
1. You'll see a list of your GitHub repositories
2. Find **"FigKit"** (or your repo name)
3. Click **"Import"** next to it

**Can't find your repo?**
- Click **"Adjust GitHub App Permissions"**
- Make sure Vercel has access to your repositories
- Refresh the page

### 3.3 Configure Project
You'll see a configuration screen. Here's what to set:

**Project Name:**
- Type: `figkit-docs` (or any name you like)
- This will be your URL: `figkit-docs.vercel.app`

**Root Directory:**
- Click **"Edit"** next to Root Directory
- Type: `apps/docs`
- Click **"Continue"**

**Framework Preset:**
- Leave as **"Other"** or select **"Docusaurus"** if available
- Don't worry if it's not detected

**Build and Output Settings:**
- **Build Command:** (Leave empty - we'll use vercel.json)
- **Output Directory:** `build`
- **Install Command:** `cd ../.. && pnpm install`

**Environment Variables:**
- We'll add these after the first deployment
- Click **"Deploy"** for now

**✅ Success:** You should see "Building..." or deployment starting

---

## Step 4: Monitor First Build

### 4.1 Watch the Build
- You'll see build logs in real-time
- This may take 5-10 minutes the first time
- Don't close the browser tab!

### 4.2 What to Look For
**Good signs:**
- ✅ "Installing dependencies..."
- ✅ "Building..."
- ✅ "Build completed"

**If you see errors:**
- Don't panic! We'll fix them
- Take a screenshot of the error
- Common issues are in the troubleshooting section

### 4.3 Build Completion
- You'll see "Ready" or "Deployment successful"
- Click the deployment URL to see your site!

**✅ Success:** Your site should be live!

---

## Step 5: Add Environment Variables

### 5.1 Go to Project Settings
1. In your project dashboard, click **"Settings"** (top menu)
2. Click **"Environment Variables"** (left sidebar)

### 5.2 Add Variables
Click **"Add New"** for each variable:

**Variable 1:**
- **Key:** `STORYBOOK_URL`
- **Value:** `https://storybook.figkit.dev` (or your Storybook URL)
- **Environment:** Select all (Production, Preview, Development)
- Click **"Save"**

**Variable 2:**
- **Key:** `SANDBOX_URL`
- **Value:** `https://figkit.dev` (or your sandbox URL)
- **Environment:** Select all
- Click **"Save"**

**Variable 3:**
- **Key:** `PERFORMANCE_URL`
- **Value:** `https://figkit.dev/performance` (or your performance URL)
- **Environment:** Select all
- Click **"Save"**

### 5.3 Redeploy
1. Go to **"Deployments"** tab
2. Click the **"..."** menu on the latest deployment
3. Click **"Redeploy"**
4. Check **"Use existing Build Cache"** (optional)
5. Click **"Redeploy"**

**✅ Success:** Site will rebuild with new environment variables

---

## Step 6: Verify Deployment

### 6.1 Test Your Site
Visit your deployment URL (e.g., `https://figkit-docs.vercel.app`)

**Checklist:**
- [ ] Homepage loads
- [ ] Navigation works
- [ ] All pages accessible
- [ ] No console errors (F12 → Console)
- [ ] External links work (Storybook, Sandbox, etc.)
- [ ] Dark mode works
- [ ] Mobile responsive

### 6.2 Common Issues

**"404 Not Found" on pages:**
- Check that `vercel.json` has rewrite rules
- Verify output directory is `build`

**Links show localhost:**
- Environment variables not set correctly
- Redeploy after setting variables

**Build fails:**
- Check build logs for specific error
- Verify Node.js version is 20.x
- Check that workspace dependencies are built

---

## Step 7: Set Up Custom Domain (Optional)

### 7.1 Add Domain
1. Go to **Settings** → **Domains**
2. Click **"Add"**
3. Enter your domain (e.g., `docs.figkit.dev`)
4. Click **"Add"**

### 7.2 Configure DNS
Vercel will show you DNS records to add:
1. Copy the DNS records
2. Go to your domain registrar (GoDaddy, Namecheap, etc.)
3. Add the DNS records
4. Wait for DNS propagation (5-60 minutes)

**✅ Success:** Your domain will point to Vercel

---

## Step 8: Enable Automatic Deployments

### 8.1 Automatic Deployments
By default, Vercel automatically deploys:
- **Production:** When you push to `main` or `master` branch
- **Preview:** When you create a pull request

### 8.2 Verify Auto-Deploy
1. Make a small change to your docs
2. Commit and push:
   ```bash
   git add .
   git commit -m "Test auto-deploy"
   git push origin master
   ```
3. Go to Vercel dashboard
4. You should see a new deployment starting automatically!

**✅ Success:** Automatic deployments are working!

---

## Troubleshooting

### Build Fails: "Cannot find module"

**Problem:** Workspace dependencies not found

**Solution:**
1. Check that `vercel.json` build command includes dependency builds
2. Verify Root Directory is set to `apps/docs`
3. Check Install Command is: `cd ../.. && pnpm install`

### Build Fails: "Command not found: pnpm"

**Problem:** pnpm not available

**Solution:**
1. In Vercel Settings → General
2. Find "Package Manager"
3. Select "pnpm"
4. Redeploy

### Build Takes Too Long

**Problem:** Build exceeds timeout

**Solution:**
1. Check build logs for slow steps
2. Consider optimizing build process
3. Contact Vercel support if consistently slow

### Environment Variables Not Working

**Problem:** URLs still show defaults

**Solution:**
1. Verify variables are set for correct environment
2. Redeploy after setting variables
3. Check variable names match exactly (case-sensitive)

---

## Quick Reference

### Your Deployment URLs
- **Production:** `https://figkit-docs.vercel.app` (or your custom domain)
- **Preview:** `https://figkit-docs-git-<branch>-yourteam.vercel.app`

### Important Settings
- **Root Directory:** `apps/docs`
- **Build Command:** (from vercel.json)
- **Output Directory:** `build`
- **Install Command:** `cd ../.. && pnpm install`
- **Node Version:** 20.x

### Environment Variables
- `STORYBOOK_URL`
- `SANDBOX_URL`
- `PERFORMANCE_URL`

---

## Success Checklist

After deployment, verify:
- [ ] Site is accessible
- [ ] All pages load
- [ ] Navigation works
- [ ] External links work
- [ ] No console errors
- [ ] Environment variables set
- [ ] Automatic deployments enabled
- [ ] Custom domain configured (if applicable)

---

## Need Help?

If you get stuck:
1. Check the build logs in Vercel
2. Review `VERCEL_SETUP.md` for detailed info
3. Check Vercel documentation: https://vercel.com/docs
4. Contact Vercel support (they're very helpful!)

---

**You're ready to deploy! Let's start with Step 1.**

