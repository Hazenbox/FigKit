# FigKit Design System

A monorepo for managing design tokens, UI components, and patterns with Figma integration.

## Features

- 🎨 **Design Tokens**: Centralized design system tokens with multi-brand and multi-theme support
- 🔄 **Figma Integration**: Automated token sync from Figma via MCP
- 📦 **Component Library**: React components built with CSS variables for theming
- 📚 **Storybook**: Interactive component documentation with brand/theme switching
- ✅ **Testing**: Unit tests, accessibility tests, and visual regression testing
- 🚀 **CI/CD**: Automated testing, token diff reporting, and canary releases

## Structure

```
packages/
  ├── ui/          # React component library
  ├── patterns/    # Composed UI patterns
  ├── tokens/      # Design tokens (source)
  ├── themes/      # Compiled CSS themes
  ├── docs/        # Storybook documentation
  └── figma-mcp/   # Figma token sync tooling
```

## Getting Started

### Prerequisites

- Node.js v20+
- pnpm v9+

### Installation

```bash
pnpm install
```

### Development

```bash
# Pull tokens from Figma (or use mock data)
USE_MOCK=true pnpm mcp:pull:tokens

# Build tokens to CSS
pnpm build:tokens

# Build all packages
pnpm build

# Run Storybook
pnpm -F @org/docs storybook

# Run tests
pnpm test
pnpm test:a11y
```

## Token Workflow

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

## Releases

- **Canary**: Automatically published on merge to `main`
- **Stable**: Manual release via `pnpm changeset` and workflow dispatch

## CI/CD

The repository includes GitHub Actions workflows for:
- Type checking
- Unit and accessibility testing
- Visual regression testing
- Token diff reporting on PRs
- Automated canary releases

## License

ISC

