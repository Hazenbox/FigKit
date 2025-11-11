# @figkit/themes

Design system themes with multi-brand and multi-theme CSS variables.

## Installation

```bash
npm install @figkit/themes
# or
pnpm add @figkit/themes
# or
yarn add @figkit/themes
```

## Usage

Import the CSS file in your application entry point:

```tsx
import '@figkit/themes/tokens.css';
```

Then set the brand and theme attributes on your root element:

```tsx
document.documentElement.setAttribute('data-brand', 'default');
document.documentElement.setAttribute('data-theme', 'light');
```

## Available Brands

- `default` - Default brand
- `figjam` - FigJam brand
- `devmode` - DevMode brand
- `slides` - Slides brand

## Available Themes

- `light` - Light color mode
- `dark` - Dark color mode

## CSS Variables

The package provides CSS variables for:

- **Colors**: `--color-text-*`, `--color-bg-*`, `--color-border-*`, `--color-icon-*`
- **Spacing**: `--space-0` through `--space-6`
- **Radius**: `--radius-sm`, `--radius-md`, `--radius-lg`, `--radius-none`, `--radius-full`
- **Typography**: `--body-*-fontFamily`, `--body-*-fontSize`, `--body-*-fontWeight`, etc.

## Example

```css
.my-component {
  background: var(--color-bg-default);
  color: var(--color-text-default);
  padding: var(--space-3);
  border-radius: var(--radius-sm);
  font-family: var(--body-medium-fontFamily);
  font-size: var(--body-medium-fontSize);
}
```

## License

ISC

