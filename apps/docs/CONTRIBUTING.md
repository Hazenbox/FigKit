# Contributing to FigKit Documentation

This guide explains how to contribute to the FigKit Design System documentation.

## Overview

The documentation is built with Next.js and MDX. All content is stored in the `content/` directory as `.mdx` files.

## Adding a New Page

1. **Create an MDX file** in the `content/` directory:
   ```bash
   # For a top-level page
   content/my-page.mdx
   
   # For a nested page
   content/section/my-page.mdx
   ```

2. **Add frontmatter** to your MDX file:
   ```mdx
   ---
   title: Page Title
   description: Page description for SEO and search
   order: 1
   ---
   
   # Your content here
   ```

3. **Regenerate navigation**:
   ```bash
   pnpm generate-nav
   ```

4. **Rebuild search index** (optional, but recommended):
   ```bash
   pnpm build-search
   ```

## Frontmatter Schema

### Required Fields

- `title` (string): The page title displayed in the sidebar and page header
- `description` (string): Page description for SEO and search results

### Optional Fields

- `order` (number): Controls sidebar ordering. Lower numbers appear first. Default: 999

### Example

```mdx
---
title: Getting Started
description: Learn how to get started with FigKit
order: 1
---

# Getting Started

Your content here...
```

## Sidebar Ordering

The sidebar is automatically generated from the `content/` directory structure. Pages are ordered by:

1. The `order` field in frontmatter (lower numbers first)
2. Alphabetically by title if `order` is not specified

## Using Components in MDX

You can use FigKit components directly in MDX:

```mdx
import { Button, Badge } from '@figkit/ui';

<Button variant="primary">Click me</Button>
<Badge variant="brand">New</Badge>
```

## Code Examples

Use code fences for syntax highlighting:

````mdx
```tsx
import { Button } from '@figkit/ui';

<Button variant="primary">Hello</Button>
```
````

Supported languages: `tsx`, `ts`, `jsx`, `js`, `css`, `bash`, `json`, etc.

## Search

Search uses Lunr.js for static search. After adding or modifying content:

```bash
pnpm build-search
```

The search index is automatically rebuilt during the build process.

## Development

```bash
# Start dev server
pnpm dev

# Build for production
pnpm build

# Generate navigation
pnpm generate-nav

# Build search index
pnpm build-search
```

## File Structure

```
apps/docs/
├── content/           # MDX documentation files
│   ├── getting-started.mdx
│   ├── components.mdx
│   └── guides/
│       └── installation.mdx
├── components/        # React components
├── scripts/          # Build scripts
│   ├── generate-nav.ts
│   └── build-lunr-index.ts
├── data/             # Generated data (nav.json)
└── public/           # Static assets (search-index.json)
```

## Best Practices

1. **Use semantic headings**: Start with h1 for the page title, use h2-h6 for sections
2. **Keep pages focused**: One topic per page
3. **Use descriptive titles**: Make it clear what the page covers
4. **Add descriptions**: Help users find your content via search
5. **Test locally**: Always test your changes locally before submitting

## Questions?

If you have questions about contributing, please open an issue or reach out to the maintainers.

