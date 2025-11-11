# @figkit/tokens

Design tokens in JSON format with multi-brand and multi-theme support.

## Installation

```bash
npm install @figkit/tokens
# or
pnpm add @figkit/tokens
# or
yarn add @figkit/tokens
```

## Usage

Import token files directly:

```tsx
import tokens from '@figkit/tokens/default.light.json';

console.log(tokens['color.bg.brand.default']); // "#0D99FF"
```

Or use the main tokens file:

```tsx
import tokens from '@figkit/tokens';

// Access tokens
const brandColor = tokens.color.bg.brand.default;
```

## Available Token Files

- `default.light.json` - Default brand, light theme
- `default.dark.json` - Default brand, dark theme
- `figjam.light.json` - FigJam brand, light theme
- `figjam.dark.json` - FigJam brand, dark theme
- `devmode.light.json` - DevMode brand, light theme
- `devmode.dark.json` - DevMode brand, dark theme
- `slides.light.json` - Slides brand, light theme
- `slides.dark.json` - Slides brand, dark theme

## Token Structure

Tokens are organized by category:

- `color.*` - Color tokens (text, background, border, icon)
- `space.*` - Spacing tokens
- `radius.*` - Border radius tokens
- Typography tokens (font families, sizes, weights, etc.)

## License

ISC

