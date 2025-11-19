# Local Development Setup

## Unified Development Server

Run all apps locally with the same URL structure as production!

## Quick Start

```bash
# From repo root
pnpm dev
```

This will start:
- **Sandbox** (main server) on `http://localhost:5173`
- **Storybook** on `http://localhost:6006` (proxied via `/storybook`)
- **Docs** on `http://localhost:3001` (proxied via `/docs`)

## Available URLs

All URLs work the same as production:

- `http://localhost:5173/` → Landing Page
- `http://localhost:5173/storybook` → Storybook (proxied)
- `http://localhost:5173/test-npm` → Test NPM Page
- `http://localhost:5173/performance` → Performance Benchmarks
- `http://localhost:5173/docs` → Documentation (proxied)

## How It Works

1. **Sandbox** runs on port 5173 and serves as the main entry point
2. **Vite Proxy** forwards requests:
   - `/storybook/*` → `http://localhost:6006/*`
   - `/docs/*` → `http://localhost:3001/*`
   - `/sb-manager/*` → `http://localhost:6006/sb-manager/*`
   - `/sb-addons/*` → `http://localhost:6006/sb-addons/*`
3. **Storybook** runs on port 6006 in the background
4. **Docs** runs on port 3001 in the background

## Individual Services

You can also run services individually:

```bash
# Just sandbox
pnpm dev:sandbox

# Just Storybook
pnpm dev:storybook

# Just Docs
pnpm dev:docs
```

## Stopping Services

Press `Ctrl+C` in the terminal where you ran `pnpm dev`. This will:
- Stop the sandbox server
- Stop Storybook (background process)
- Stop Docs (background process)

## Troubleshooting

### Storybook not loading
- Check that Storybook started: `lsof -i :6006`
- Check browser console for errors
- Try accessing Storybook directly: `http://localhost:6006`

### Docs not loading
- Check that Docs started: `lsof -i :3001`
- Check browser console for errors
- Try accessing Docs directly: `http://localhost:3001`

### Port already in use
If ports are already in use:
- Kill existing processes: `lsof -ti:5173 | xargs kill -9`
- Or change ports in respective config files

## Development Workflow

1. **Start unified dev server**: `pnpm dev`
2. **Make changes** to any app
3. **Hot reload** will work for:
   - Sandbox (Vite HMR)
   - Storybook (Webpack HMR)
   - Docs (Docusaurus HMR)
4. **Test all routes** at `http://localhost:5173`

## Notes

- All services run in the same terminal
- Background services (Storybook, Docs) output is suppressed
- Main output is from sandbox server
- Use `Ctrl+C` to stop all services

