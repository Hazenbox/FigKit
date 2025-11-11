# Figma Component Pull System

This system allows you to pull Figma components and automatically generate tokenized React components with Storybook stories.

## Quick Start

### Pull a Component from Figma

```bash
# Using a full Figma URL
pnpm mcp:pull:component "https://www.figma.com/design/zp6BWumXLgpNF4suKk9xTS/UI3--Figma-s-UI-Kit--Community-?node-id=2012-48557&m=dev"

# Or using just the node ID (requires FIGMA_FILE_KEY in .env)
pnpm mcp:pull:component "2012-48557"
```

### Complete Workflow

```bash
# 1. Pull component from Figma
pnpm mcp:pull:component <figma-url-or-node-id>

# 2. Build UI package
pnpm -F @org/ui build

# 3. Start Storybook
pnpm -F @org/docs storybook
```

## What Gets Generated

When you run `pnpm mcp:pull:component`, the system:

1. **Fetches the Figma node** via Figma API
2. **Extracts design tokens** (colors, spacing, radius) from the component
3. **Maps Figma variables** to your semantic token paths using `mapping.json`
4. **Generates files** in `packages/ui/src/{component-name}/`:
   - `{Component}.tsx` - React component with TypeScript
   - `{component-name}.css` - Tokenized CSS styles
   - `{Component}.stories.tsx` - Storybook stories
   - `index.ts` - Component exports

5. **Auto-updates** `packages/ui/src/components.ts` to export the new component

## Component Structure

### Generated Component Example

```tsx
// packages/ui/src/button/Button.tsx
import './button.css';
import type { ReactNode, ButtonHTMLAttributes } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
}

export const Button = ({ children, variant = 'primary', size = 'md', ...rest }: ButtonProps) => {
  // ...
};
```

### Tokenized CSS

All styles use CSS variables from your design tokens:

```css
.button--primary {
  background: var(--color-bg-brand-default, var(--color-bg-brand, #2563eb));
  color: var(--color-text-onbrand, var(--color-text-component-oncomponent, #ffffff));
}
```

## Features

### ✅ Automatic Token Mapping

- Maps Figma variable names to semantic token paths
- Falls back to sensible defaults if mapping not found
- Uses your existing `mapping.json` configuration

### ✅ Variant Detection

The system automatically detects variants from:
- Component name (e.g., "Button Primary" → `primary` variant)
- Figma variant properties (if component is part of a Component Set)
- Common patterns (primary, secondary, danger, tertiary)

### ✅ Multi-Brand/Theme Support

Generated components automatically work with your brand/theme system:
- Uses CSS variables that change based on `data-brand` and `data-theme` attributes
- Storybook toolbar controls work out of the box

### ✅ Storybook Integration

Each component gets:
- Basic stories for each variant
- Size variations
- Disabled states
- Auto-documentation via Storybook's autodocs

## Token Mapping

The system uses `packages/figma-mcp/config/mapping.json` to map Figma variable names to semantic paths:

```json
{
  "mappings": {
    "✦.bg.brand.default": "color.bg.brand.default",
    "✦._text.text-onbrand": "color.text.onbrand",
    "space.4": "space.4"
  }
}
```

If a mapping isn't found, it uses fallback tokens:
- Background: `color.bg.brand` or `color.bg.component.default`
- Text: `color.text.component.oncomponent` or `color.text.onbrand`
- Border: `color.border.component.default`

## Utilities

### Update Storybook TokenStatus

```bash
pnpm mcp:update:story
```

This ensures the TokenStatus utility story exists in Storybook, which helps visualize current token values.

## Environment Variables

Required in `.env`:

```bash
FIGMA_PAT=your_figma_personal_access_token
FIGMA_FILE_KEY=zp6BWumXLgpNF4suKk9xTS  # Optional if provided in URL
```

## Limitations (v1)

This is a **minimal v1 implementation**:

- ✅ Basic component structure (button-like components)
- ✅ Token mapping for colors, spacing, radius
- ✅ Variant detection from names
- ⚠️ Auto-layout padding extraction (TODO)
- ⚠️ Complex component properties (TODO)
- ⚠️ Variable ID resolution (currently uses name-based mapping)

## Future Enhancements

Planned improvements:

1. **Auto-layout Support**: Extract padding from Figma auto-layout
2. **Variable ID Resolution**: Use Figma variable IDs for more robust mapping
3. **Component Diff**: Compare Figma vs. code and generate PR comments
4. **Complex Components**: Support for components with nested structures
5. **Icon Extraction**: Pull SVG icons from Figma components

## Troubleshooting

### "Node not found" Error

- Verify the node ID is correct
- Check that your `FIGMA_PAT` has access to the file
- Ensure the file key matches your `.env` or URL

### "Missing fileKey or nodeId" Error

- Provide either a full Figma URL or set `FIGMA_FILE_KEY` in `.env`
- Node ID format: `"123:456"` or `"123-456"` (both work)

### Component Not Appearing in Storybook

1. Check that `packages/ui/src/components.ts` was updated
2. Rebuild: `pnpm -F @org/ui build`
3. Restart Storybook

### Tokens Not Matching

- Verify your `mapping.json` has entries for the Figma variables
- Check that tokens were built: `pnpm build:tokens`
- Use the TokenStatus story to see current token values

## Example Usage in Cursor

You can ask Cursor:

> "Generate a Button component from this Figma link: https://www.figma.com/design/...?node-id=2012-48557"

Cursor will:
1. Run `pnpm mcp:pull:component <url>`
2. Build the UI package
3. Update Storybook
4. Show you the result

---

**See also**: [TECHNICAL_AUDIT.md](./TECHNICAL_AUDIT.md) for full system architecture.

