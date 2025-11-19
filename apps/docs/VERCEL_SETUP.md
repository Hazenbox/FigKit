# Vercel Setup for Docs

This guide explains how to deploy the FigKit documentation site to Vercel.

## Prerequisites

- GitHub repository connected to Vercel
- Vercel account (free tier works)
- Node.js 20.x (configured in Vercel)

## Environment Variables

In Vercel Dashboard → Settings → Environment Variables, add:

### Production Environment

1. **STORYBOOK_URL**
   - Value: `https://storybook.figkit.dev`
   - Description: Storybook deployment URL

2. **SANDBOX_URL**
   - Value: `https://figkit.dev`
   - Description: Sandbox deployment URL

3. **PERFORMANCE_URL**
   - Value: `https://figkit.dev/performance`
   - Description: Performance benchmarks page URL

### Preview Environment (Optional)

You can set different values for preview deployments:

- `STORYBOOK_URL`: `https://storybook-preview.figkit.dev`
- `SANDBOX_URL`: `https://figkit-preview.vercel.app`
- `PERFORMANCE_URL`: `https://figkit-preview.vercel.app/performance`

## Deployment Settings

When creating a new Vercel project:

1. **Import Repository**
   - Go to https://vercel.com/dashboard
   - Click "Add New Project"
   - Import your GitHub repository

2. **Configure Project**
   - **Project Name:** `figkit-docs` (or your preferred name)
   - **Root Directory:** `apps/docs`
   - **Framework Preset:** Other (or leave empty)
   - **Build Command:** (leave empty - uses `vercel.json`)
   - **Output Directory:** `build`
   - **Install Command:** `cd ../.. && pnpm install`
   - **Node Version:** 20.x

3. **Deploy**
   - Click "Deploy"
   - Monitor build logs
   - Wait for deployment to complete

## Build Process

The build process follows this order:

1. Install dependencies: `pnpm install` (from root)
2. Pull tokens: `pnpm mcp:pull:tokens`
3. Build tokens: `pnpm --filter @figkit/tokens build`
4. Build themes: `pnpm --filter @figkit/themes prepublishOnly`
5. Build UI: `pnpm --filter @figkit/ui build`
6. Build docs: `cd apps/docs && pnpm build`

This ensures all workspace dependencies are built before the docs app.

## Troubleshooting

### Build Fails: "Module not found"

**Issue:** Workspace dependencies not found

**Solution:**
- Ensure build command includes dependency builds
- Check that `vercel.json` has correct build command
- Verify root directory is set to `apps/docs`

### Build Fails: "Cannot find module '@figkit/ui'"

**Issue:** Workspace dependencies not resolved

**Solution:**
- Ensure install command runs from root: `cd ../.. && pnpm install`
- Verify pnpm workspace is configured correctly
- Check that packages are built in correct order

### Build Takes Too Long

**Issue:** Build exceeds Vercel timeout

**Solution:**
- Optimize build process
- Consider caching node_modules
- Check for unnecessary dependencies

### Environment Variables Not Working

**Issue:** URLs still show localhost or defaults

**Solution:**
- Verify environment variables are set in Vercel dashboard
- Check that variables are set for correct environment (Production/Preview)
- Rebuild after setting variables

## Post-Deployment

After successful deployment:

1. **Verify Site**
   - Visit deployed URL
   - Check all pages load
   - Verify external links work

2. **Test Links**
   - Storybook link should work
   - Sandbox link should work
   - Performance link should work

3. **Check Console**
   - Open browser console
   - Verify no errors
   - Check network requests

## Custom Domain

To add a custom domain:

1. Go to Vercel Dashboard → Your Project → Settings → Domains
2. Add your custom domain (e.g., `docs.figkit.dev`)
3. Follow DNS configuration instructions
4. Wait for DNS propagation

## Continuous Deployment

Vercel automatically deploys:
- **Production:** On push to `main` branch
- **Preview:** On pull requests

You can disable auto-deployment in project settings if needed.

