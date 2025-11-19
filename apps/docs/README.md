# FigKit Documentation

Documentation site for the FigKit Design System, built with Next.js and MDX.

## Development

```bash
# Install dependencies (from root)
pnpm install

# Run dev server
pnpm --filter @figkit/docs-app dev
# or
cd apps/docs && pnpm dev
```

The docs will be available at http://localhost:3001

## Adding Content

1. Create MDX files in `content/` directory
2. Add frontmatter with `title`, `description`, and `order` fields
3. Run `pnpm generate-nav` to regenerate the sidebar
4. Run `pnpm build-search` to rebuild the search index

## Frontmatter Schema

```mdx
---
title: Page Title
description: Page description for SEO and search
order: 1
---
```

## Build

```bash
pnpm build
```

## Search

Search uses Lunr.js for static search. Rebuild the index after adding content:

```bash
pnpm build-search
```

