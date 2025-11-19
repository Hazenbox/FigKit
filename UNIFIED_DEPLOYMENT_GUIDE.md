# Unified Deployment Guide

## Overview

All apps are now deployed together on a single domain (`https://fig-kit.vercel.app`) with different paths:

- **`/`** → Docs app (Docusaurus)
- **`/storybook`** → Storybook component documentation
- **`/test-npm`** → Sandbox test page
- **`/performance`** → Performance benchmarks

## How It Works

### 1. Build Process

The `scripts/build-unified.sh` script:
1. Builds tokens and themes
2. Builds Storybook to `packages/docs/storybook-static`
3. Builds sandbox app to `apps/sandbox/dist`
4. Builds docs app to `apps/docs/build`
5. Copies everything into `.vercel-output/` with this structure:
   ```
   .vercel-output/
   ├── (docs files)          # Served at /
   ├── storybook-static/     # Served at /storybook/*
   └── sandbox/              # Served at /test-npm and /performance
   ```

### 2. Vercel Routing

The `vercel.json` uses rewrites to route URLs:
- `/storybook/*` → `/storybook-static/*`
- `/test-npm` → `/sandbox/test-npm`
- `/performance` → `/sandbox/performance`

### 3. Configuration

All apps use the same domain, so `apps/docs/src/config.ts` automatically detects the current domain and creates URLs like:
- `https://fig-kit.vercel.app/storybook`
- `https://fig-kit.vercel.app/test-npm`
- `https://fig-kit.vercel.app/performance`

## Deployment Steps

### Automatic (Recommended)

1. **Push to GitHub** - Vercel will automatically deploy
2. **Wait for build** - The unified build script runs automatically
3. **Verify** - Check all routes work:
   - https://fig-kit.vercel.app/
   - https://fig-kit.vercel.app/storybook
   - https://fig-kit.vercel.app/test-npm
   - https://fig-kit.vercel.app/performance

### Manual Build (Local Testing)

```bash
# Run the unified build script
bash scripts/build-unified.sh

# The output will be in .vercel-output/
# You can test locally with:
cd .vercel-output
npx serve .
```

## Troubleshooting

### Storybook Not Loading

- Check that `packages/docs/storybook-static` exists after build
- Verify the rewrite rule in `vercel.json` is correct
- Check browser console for 404 errors

### Sandbox Routes Not Working

- Ensure `apps/sandbox/dist` was built correctly
- Check that React Router is configured with `basename` if needed
- Verify rewrites in `vercel.json` match the routes

### Docs Not Loading

- Check that `apps/docs/build` exists
- Verify Docusaurus build completed successfully
- Check for any build errors in Vercel logs

## File Structure

```
.
├── vercel.json              # Main Vercel config with rewrites
├── scripts/
│   └── build-unified.sh     # Build script that combines all apps
├── apps/
│   ├── docs/                # Docusaurus docs app
│   │   └── build/           # Docs build output
│   └── sandbox/             # Vite sandbox app
│       └── dist/            # Sandbox build output
├── packages/
│   └── docs/                # Storybook
│       └── storybook-static/ # Storybook build output
└── .vercel-output/          # Final unified output (created during build)
```

## Next Steps

1. **Push to GitHub** - Your changes are ready
2. **Vercel will auto-deploy** - Monitor the build logs
3. **Test all routes** - Verify everything works
4. **Update any hardcoded URLs** - They should now all use the same domain

## Questions?

If something doesn't work:
1. Check Vercel build logs
2. Verify all build outputs exist
3. Check browser console for errors
4. Test routes individually

