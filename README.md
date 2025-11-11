# @org/design-system

A comprehensive design system monorepo with React components, design tokens, and Figma integration. Ready for npm publishing and consumption by other teams.

## 📦 Packages

This monorepo contains the following npm packages:

- **[@figkit/ui](./packages/ui/)** - React component library with Button, Checkbox, Tabs, and more
- **[@figkit/themes](./packages/themes/)** - CSS theme variables with multi-brand/theme support
- **[@figkit/tokens](./packages/tokens/)** - Design tokens in JSON format
- **[@figkit/patterns](./packages/patterns/)** - Composed UI patterns (optional)

## 🚀 Quick Start

### Installation

Install the packages you need:

```bash
# UI Components
npm install @figkit/ui

# Themes (required for components)
npm install @figkit/themes

# Design Tokens (optional)
npm install @figkit/tokens
```

### Basic Usage

1. **Import the theme CSS** in your app entry point:

```tsx
import '@figkit/themes/tokens.css';
```

2. **Set brand and theme** on your root element:

```tsx
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    document.documentElement.setAttribute('data-brand', 'default');
    document.documentElement.setAttribute('data-theme', 'light');
  }, []);

  return <YourApp />;
}
```

3. **Use components**:

```tsx
import { Button, Checkbox, Tabs } from '@figkit/ui';
import '@figkit/ui/index.css';

function MyComponent() {
  return (
    <div>
      <Button variant="primary">Click me</Button>
      <Checkbox label="Accept terms" />
      <Tabs
        items={[{ label: 'Tab 1' }, { label: 'Tab 2' }]}
        defaultValue={0}
      />
    </div>
  );
}
```

## 📚 Documentation

- **[UI Components](./packages/ui/README.md)** - Component API and usage
- **[Themes](./packages/themes/README.md)** - Theming and CSS variables
- **[Tokens](./packages/tokens/README.md)** - Design token structure
- **[Publishing Guide](./PUBLISHING.md)** - How to publish packages to npm

## 🎨 Features

- ✅ **Multi-brand support**: Default, FigJam, DevMode, Slides
- ✅ **Multi-theme support**: Light and Dark modes
- ✅ **TypeScript**: Full type definitions included
- ✅ **Design tokens**: CSS variables for consistent styling
- ✅ **Figma integration**: Automated token sync from Figma
- ✅ **Storybook**: Interactive component documentation
- ✅ **Testing**: Unit, accessibility, and visual regression tests

## 🏗️ Development

### Prerequisites

- Node.js v18.12+
- pnpm v9+

### Setup

```bash
# Install dependencies
pnpm install

# Pull tokens from Figma (or use mock data)
USE_MOCK=true pnpm mcp:pull:tokens

# Build tokens to CSS
pnpm build:tokens

# Build all packages
pnpm build

# Run Storybook
pnpm -F @org/docs storybook
```

### Available Scripts

```bash
# Build
pnpm build              # Build all packages
pnpm build:tokens       # Build theme CSS from tokens

# Development
pnpm -F @figkit/docs storybook  # Run Storybook
pnpm -F @figkit/ui dev     # Watch mode for UI package

# Testing
pnpm test               # Run all tests
pnpm test:a11y          # Run accessibility tests
pnpm visual:test        # Visual regression tests

# Type checking
pnpm typecheck          # Type check all packages

# Token management
pnpm mcp:pull:tokens    # Pull tokens from Figma
pnpm mcp:diff           # Compare token changes
```

## 📦 Package Structure

```
packages/
  ├── ui/          # React component library
  ├── patterns/    # Composed UI patterns
  ├── tokens/     # Design tokens (source)
  ├── themes/     # Compiled CSS themes
  ├── docs/       # Storybook documentation
  └── figma-mcp/  # Figma token sync tooling
```

## 🔄 Token Workflow

1. **Pull tokens from Figma**:
   ```bash
   pnpm mcp:pull:tokens
   ```

2. **Build themes**:
   ```bash
   pnpm build:tokens
   ```

3. **Check for changes**:
   ```bash
   pnpm mcp:diff
   ```

## 🚢 Publishing

See [PUBLISHING.md](./PUBLISHING.md) for detailed publishing instructions.

### Quick Publish

```bash
# Create changeset
pnpm changeset

# Version bump
pnpm release:version

# Publish
pnpm release:publish
```

## 🧪 Testing

- **Unit tests**: Vitest with React Testing Library
- **Accessibility**: jest-axe for a11y testing
- **Visual regression**: Playwright visual tests

## 📄 License

ISC

## 🤝 Contributing

1. Create a changeset for your changes: `pnpm changeset`
2. Make your changes
3. Run tests: `pnpm test`
4. Build: `pnpm build`
5. Submit a PR

## 📖 Additional Resources

- [Quick Start Guide](./QUICKSTART.md)
- [Setup Instructions](./SETUP.md)
- [Token System Documentation](./TOKEN_SYSTEM.md)
- [Figma Component Pull Guide](./FIGMA_COMPONENT_PULL.md)
