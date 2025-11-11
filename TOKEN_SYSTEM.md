# Design Token System

## Overview

This design system uses a comprehensive token architecture that supports **multiple brands** and **multiple color modes** (themes). All tokens are sourced from the `variables/` folder, which contains detailed token files for each brand/theme combination.

## Token Sources

### Color Tokens
Located in `variables/colors.{brand}.{theme}.json`:
- `colors.default.light.json` - Default brand, light theme
- `colors.default.dark.json` - Default brand, dark theme
- `colors.figjam.light.json` - FigJam brand, light theme
- `colors.figjam.dark.json` - FigJam brand, dark theme
- `colors.devmode.light.json` - DevMode brand, light theme
- `colors.devmode.dark.json` - DevMode brand, dark theme
- `colors.slides.light.json` - Slides brand, light theme
- `colors.slides.dark.json` - Slides brand, dark theme

### Typography Tokens
Located in `variables/typography.json`:
- Universal across all brands and themes
- Includes font families, weights, sizes, line heights, and letter spacing
- Body styles (large, medium, small) with regular and strong variants
- Heading styles (display, large, medium, small)

### Sizing Tokens
Located in `variables/sizing.json`:
- Universal across all brands and themes
- Spacing tokens (space.0 through space.6)
- Radius tokens (radius.none, radius.sm, radius.md, radius.lg, radius.full)

## Token Processing

### 1. Pull Tokens from Files
```bash
pnpm mcp:pull:tokens
```

This command:
- Reads all color files from `variables/` folder
- Reads typography and sizing tokens
- Maps Figma token names to semantic paths using `packages/figma-mcp/config/mapping.json`
- Generates Style Dictionary format files in `packages/tokens/dist/{brand}.{theme}.json`
- Merges typography and sizing tokens into each brand/theme combination

### 2. Build CSS
```bash
pnpm build:tokens
```

This command:
- Reads all `{brand}.{theme}.json` files from `packages/tokens/dist/`
- Generates a single CSS file with attribute selectors: `packages/themes/dist/tokens.css`
- Each brand/theme combination gets its own CSS rule:
  ```css
  :root[data-brand="default"][data-theme="light"] {
    --color-text-default: rgba(0, 0, 0, 0.9);
    /* ... all tokens ... */
  }
  ```

## Usage in Components

All components use CSS variables that are automatically scoped to the current brand/theme:

```css
.button {
  background: var(--color-bg-brand);
  color: var(--color-text-onbrand);
  border-radius: var(--radius-md);
  padding: var(--space-2) var(--space-4);
  font-family: var(--body-medium-fontFamily);
  font-size: var(--body-medium-fontSize);
}
```

## Brand/Theme Switching

The system supports dynamic brand/theme switching via HTML attributes:

```html
<html data-brand="default" data-theme="light">
  <!-- Light theme for default brand -->
</html>

<html data-brand="figjam" data-theme="dark">
  <!-- Dark theme for FigJam brand -->
</html>
```

### Storybook Integration

Storybook includes toolbar controls for switching brands and themes:
- **Brand**: default, figjam, devmode, slides
- **Theme**: light, dark

The decorator automatically sets `data-brand` and `data-theme` attributes on the document root when you change these controls.

## Token Mapping

Figma token names are mapped to semantic paths using `packages/figma-mcp/config/mapping.json`:

- `✦/_text/text-default` → `color.text.default`
- `✦/_bg/bg-brand` → `color.bg.brand`
- `Spacers/spacer-2` → `space.2`
- `Radius/radius-small` → `radius.sm`
- `body/medium/fontSize` → `body.medium.fontSize`

## File Structure

```
variables/
  ├── colors.default.light.json
  ├── colors.default.dark.json
  ├── colors.figjam.light.json
  ├── colors.figjam.dark.json
  ├── colors.devmode.light.json
  ├── colors.devmode.dark.json
  ├── colors.slides.light.json
  ├── colors.slides.dark.json
  ├── typography.json
  └── sizing.json

packages/tokens/dist/
  ├── default.light.json
  ├── default.dark.json
  ├── figjam.light.json
  ├── figjam.dark.json
  ├── devmode.light.json
  ├── devmode.dark.json
  ├── slides.light.json
  └── slides.dark.json

packages/themes/dist/
  └── tokens.css (generated)
```

## Adding New Brands or Themes

1. Add new color files to `variables/` folder:
   - `colors.{newbrand}.light.json`
   - `colors.{newbrand}.dark.json`

2. Run `pnpm mcp:pull:tokens` to process the new files

3. Run `pnpm build:tokens` to regenerate CSS

4. Update Storybook toolbar in `packages/docs/.storybook/preview.ts` to include the new brand

## Best Practices

1. **Always use CSS variables** - Never hardcode colors, spacing, or typography values
2. **Use semantic token names** - Prefer `--color-text-default` over `--color-text-primary`
3. **Test all brand/theme combinations** - Ensure components work correctly in all contexts
4. **Keep tokens in sync** - Update `variables/` files when design tokens change in Figma
5. **Run token processing** - Always run `pnpm mcp:pull:tokens && pnpm build:tokens` after updating token files

