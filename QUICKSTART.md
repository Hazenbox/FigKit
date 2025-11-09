# Quick Start Guide

## 🚀 First Time Setup (5 minutes)

```bash
# 1. Clone the repository
git clone https://github.com/Hazenbox/FigKit.git
cd FigKit

# 2. Install dependencies
pnpm install

# 3. Pull tokens (using mock data)
USE_MOCK=true pnpm mcp:pull:tokens

# 4. Build tokens
pnpm build:tokens

# 5. Start Storybook
pnpm -F @org/docs storybook
```

Open http://localhost:6006 and use the toolbar to switch brands/themes!

## 📦 Daily Workflow

### Pull Latest Tokens from Figma
```bash
pnpm mcp:pull:tokens    # Requires FIGMA_PAT in .env
pnpm build:tokens       # Generate CSS
```

### Develop Components
```bash
# Watch mode for UI package
pnpm -F @org/ui dev

# Run Storybook
pnpm -F @org/docs storybook
```

### Test Changes
```bash
pnpm test              # Unit tests
pnpm test:a11y         # Accessibility tests
pnpm visual:test       # Visual regression (requires Storybook running)
```

## 🎨 Adding a New Component

1. **Create component** in `packages/ui/src/components/MyComponent.tsx`
2. **Add styles** in `packages/ui/src/components/MyComponent.css` (use CSS variables!)
3. **Export** from `packages/ui/src/components.ts`
4. **Add story** in `packages/docs/stories/MyComponent.stories.tsx`
5. **Add tests** in `packages/ui/src/components/__tests__/MyComponent.spec.tsx`

Example:
```tsx
// packages/ui/src/components/MyComponent.tsx
import './MyComponent.css';

export const MyComponent = () => {
  return (
    <div className="my-component">
      Content
    </div>
  );
};
```

```css
/* packages/ui/src/components/MyComponent.css */
.my-component {
  background: var(--color-bg-default);
  color: var(--color-text-default);
  padding: var(--space-4);
  border-radius: var(--radius-md);
}
```

## 🔄 Token Workflow

### Pull from Figma
```bash
# With real Figma API (requires .env with FIGMA_PAT and FIGMA_FILE_KEY)
pnpm mcp:pull:tokens

# With mock data (for testing)
USE_MOCK=true pnpm mcp:pull:tokens
```

### Check What Changed
```bash
pnpm mcp:diff
```

This generates a markdown report showing:
- Added tokens
- Removed tokens
- Changed tokens
- WCAG contrast violations

### Build Themes
```bash
pnpm build:tokens
```

Generates `packages/themes/dist/tokens.css` with all brand/theme combinations.

## 📝 Creating a Release

### 1. Create Changeset
```bash
pnpm changeset
```

Select packages and change type (patch/minor/major).

### 2. Commit Changeset
```bash
git add .changeset/
git commit -m "chore: add changeset"
git push
```

### 3. Release

**Canary** (automatic on merge to master):
- Just merge your PR to `master`
- GitHub Actions will publish with `canary` tag

**Stable** (manual):
- Go to GitHub Actions → "Release Stable" workflow
- Click "Run workflow"
- Or push a tag: `git tag release-v1.0.0 && git push --tags`

## 🧪 Testing

### Unit Tests
```bash
pnpm test                    # All packages
pnpm -F @org/ui test         # Specific package
```

### Accessibility Tests
```bash
pnpm test:a11y              # All a11y tests
pnpm -F @org/ui test --project a11y
```

### Visual Regression
```bash
# 1. Build Storybook
pnpm storybook:build

# 2. Serve it
pnpm storybook:serve

# 3. In another terminal, run tests
pnpm visual:test
```

## 🔧 Troubleshooting

### Storybook Blank Screen
```bash
cd packages/docs
rm -rf node_modules/.cache
pnpm storybook
```

### Token Build Fails
```bash
# Check if token files exist
ls packages/tokens/dist/*.json

# Rebuild
pnpm build:tokens
```

### Tests Fail
```bash
# Run with verbose output
pnpm test -- --reporter=verbose

# Run specific test
pnpm -F @org/ui test Button.a11y
```

## 📚 Key Files

- `packages/tokens/src/tokens.json` - Source of truth for tokens
- `packages/themes/dist/tokens.css` - Generated CSS (don't edit directly!)
- `packages/figma-mcp/config/mapping.json` - Maps Figma variables to tokens
- `.changeset/` - Version bump files
- `.github/workflows/` - CI/CD automation

## 🔗 Useful Links

- Storybook: http://localhost:6006 (when running)
- GitHub: https://github.com/Hazenbox/FigKit
- CI/CD: https://github.com/Hazenbox/FigKit/actions

