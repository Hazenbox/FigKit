# Setup Guide

## Initial GitHub Setup

### 1. Push to GitHub

```bash
git push -u origin main
```

### 2. Configure GitHub Secrets

Go to **Settings → Secrets and variables → Actions** and add:

- `FIGMA_PAT` - Your Figma Personal Access Token
- `FIGMA_FILE_KEY` - Your Figma file key (from the file URL)
- `NPM_TOKEN` - Your npm token for publishing packages

### 3. Set Up Branch Protection

Go to **Settings → Branches** and add a rule for `main`:

- ✅ Require a pull request before merging
- ✅ Require status checks to pass before merging
  - Select: `CI` (the workflow check)
- ✅ Require branches to be up to date before merging
- ✅ Include administrators

### 4. Verify CI Works

1. Create a test branch: `git checkout -b test/ci`
2. Make a small change (e.g., update README)
3. Push: `git push -u origin test/ci`
4. Open a PR on GitHub
5. Verify the CI workflow runs and posts a token diff comment

## Local Development

### First Time Setup

```bash
# Install dependencies
pnpm install

# Pull tokens (using mock data for now)
USE_MOCK=true pnpm mcp:pull:tokens

# Build tokens
pnpm build:tokens

# Build all packages
pnpm build

# Start Storybook
pnpm -F @org/docs storybook
```

### Daily Workflow

```bash
# Pull latest tokens from Figma
pnpm mcp:pull:tokens

# Build tokens
pnpm build:tokens

# Run tests
pnpm test
pnpm test:a11y

# Check for token changes
pnpm mcp:diff
```

## Making Changes

### Adding a Component

1. Create component in `packages/ui/src/components/`
2. Export from `packages/ui/src/components.ts`
3. Add Storybook story in `packages/docs/stories/`
4. Add tests in `packages/ui/src/components/__tests__/`

### Updating Tokens

1. Pull from Figma: `pnpm mcp:pull:tokens`
2. Build: `pnpm build:tokens`
3. Check diff: `pnpm mcp:diff`
4. Create changeset if breaking: `pnpm changeset`

### Creating a Release

1. Create changesets: `pnpm changeset`
2. Commit and push changesets
3. For canary: Merge to `main` (auto-publishes)
4. For stable: Run the "Release Stable" workflow manually

## Troubleshooting

### Storybook Blank Screen

```bash
# Clear cache and restart
cd packages/docs
rm -rf node_modules/.cache
pnpm storybook
```

### Token Build Issues

```bash
# Verify token files exist
ls packages/tokens/dist/*.json

# Rebuild
pnpm build:tokens
```

### Test Failures

```bash
# Run specific test
pnpm -F @org/ui test Button.a11y

# Run with verbose output
pnpm test -- --reporter=verbose
```

