# Deployment Guide - FigKit Design System

## Vercel Deployment

This project is configured for deployment on Vercel.

### Prerequisites

- GitHub repository connected to Vercel
- Vercel account (free tier works)

### Automatic Deployment (Recommended)

1. **Connect Repository to Vercel:**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "Add New Project"
   - Import your GitHub repository
   - Vercel will auto-detect the configuration from `vercel.json`

2. **Configure Build Settings:**
   - **Framework Preset**: Vite
   - **Root Directory**: (leave empty - uses root)
   - **Build Command**: `pnpm install && cd apps/sandbox && pnpm build`
   - **Output Directory**: `apps/sandbox/dist`
   - **Install Command**: `pnpm install`

3. **Environment Variables:**
   - No environment variables required for basic deployment
   - Add `FIGMA_PAT` and `FIGMA_FILE_KEY` if you need Figma integration

4. **Deploy:**
   - Click "Deploy"
   - Vercel will build and deploy automatically
   - Your site will be live at `https://your-project.vercel.app`

### Manual Deployment via CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy (from project root)
vercel

# Deploy to production
vercel --prod
```

### Deployment Configuration

The `vercel.json` file contains:
- **Build settings**: Automatically builds the sandbox app
- **Routing**: SPA routing configured for React Router
- **Security headers**: XSS protection, frame options, etc.

### Post-Deployment

After deployment, your site will have:
- **Landing Page**: `https://your-project.vercel.app/`
- **Test NPM**: `https://your-project.vercel.app/test-npm`
- **Performance**: `https://your-project.vercel.app/performance`
- **Storybook**: Link to separate Storybook deployment (if configured)

### Custom Domain

1. Go to Vercel Dashboard → Your Project → Settings → Domains
2. Add your custom domain
3. Follow DNS configuration instructions

### Environment-Specific Builds

For different environments (staging, production), you can:
- Use Vercel's branch deployments
- Configure different build commands per branch
- Set environment variables per environment

### Troubleshooting

**Build fails:**
- Ensure `pnpm` is available in Vercel (it should auto-detect)
- Check that all dependencies are in `package.json`
- Verify Node.js version (>=18.12.0)

**Routing issues:**
- Ensure `vercel.json` has the rewrite rule for SPA routing
- Check that `base` in `vite.config.ts` is set to `/`

**Performance page not loading:**
- Check browser console for errors
- Verify all imports are correct
- Ensure benchmark utilities are included in build

