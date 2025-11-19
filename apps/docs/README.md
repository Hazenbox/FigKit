# FigKit Documentation

Documentation site for the FigKit Design System, built with [Docusaurus](https://docusaurus.io/).

## Development

```bash
# Install dependencies (from root)
pnpm install

# Run dev server
pnpm --filter @figkit/docs-app dev
# or
cd apps/docs && pnpm dev
```

The docs will be available at http://localhost:3001 (for local development)

## Adding Content

1. Create MDX files in the `docs/` directory
2. Update `sidebars.ts` to add new pages to the sidebar
3. Docusaurus will automatically generate navigation

## Features

- ✅ **MDX Support**: Write docs with MDX and embed React components
- ✅ **Built-in Search**: Algolia search integration ready
- ✅ **Dark Mode**: Automatic dark mode support
- ✅ **Responsive**: Mobile-friendly design
- ✅ **Fast**: Optimized static site generation

## Build

```bash
pnpm build
```

## Deployment

Docusaurus builds static HTML files that can be deployed to:
- Vercel
- Netlify
- GitHub Pages
- Any static hosting service

See [Docusaurus Deployment Guide](https://docusaurus.io/docs/deployment) for more details.
