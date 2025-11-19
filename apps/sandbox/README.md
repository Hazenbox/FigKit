# FigKit Design System - Sandbox

This is the sandbox application for the FigKit Design System, serving as the landing page and demo site.

## Features

- **Landing Page**: Minimalistic, professional landing page with CTAs
- **Test NPM Package**: Interactive component showcase
- **Performance Benchmarks**: Compare FigKit against industry standards
- **Storybook Integration**: Link to component documentation

## Development

```bash
# Install dependencies (from root)
pnpm install

# Run dev server
cd apps/sandbox
pnpm dev
```

## Deployment

This app is configured for Vercel deployment.

### Deploy to Vercel

1. **Via Vercel CLI:**
   ```bash
   npm i -g vercel
   vercel
   ```

2. **Via GitHub Integration:**
   - Connect your GitHub repository to Vercel
   - Vercel will automatically detect the `vercel.json` configuration
   - Deployments will trigger on push to main branch

### Vercel Configuration

- **Build Command**: `cd apps/sandbox && pnpm build`
- **Output Directory**: `apps/sandbox/dist`
- **Install Command**: `pnpm install`
- **Framework**: Vite

## Routes

- `/` - Landing page
- `/test-npm` - NPM package test page
- `/performance` - Performance benchmarks
- `/storybook` - Storybook redirect (runs on separate port locally)

## Environment

- Node.js: >=18.12.0
- pnpm: >=9.0.0
