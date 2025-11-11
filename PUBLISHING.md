# Publishing Guide

This guide explains how to publish the design system packages to npm.

## Prerequisites

1. **npm account** with access to the `@org` scope
2. **Authentication** configured:
   ```bash
   npm login --scope=@org
   ```

3. **Repository** set up on GitHub (update repository URLs in package.json files)

## Package Structure

The monorepo contains the following publishable packages:

- `@org/ui` - React component library
- `@org/themes` - CSS theme variables
- `@org/tokens` - Design tokens in JSON format
- `@org/patterns` - Composed UI patterns (optional)

## Publishing Workflow

### 1. Version Management with Changesets

We use [Changesets](https://github.com/changesets/changesets) for version management:

```bash
# Create a changeset for your changes
pnpm changeset

# This will prompt you to:
# - Select which packages changed
# - Choose version bump type (major, minor, patch)
# - Write a summary of changes
```

### 2. Version Bump

After creating changesets, bump versions:

```bash
# For stable release
pnpm release:version

# For canary release (automatic on CI)
pnpm release:canary
```

### 3. Build Packages

Ensure all packages are built:

```bash
pnpm build
```

### 4. Publish to npm

#### Manual Publishing

```bash
# Publish all packages
pnpm release:publish

# Or publish individual packages
cd packages/ui
pnpm publish --access public
```

#### Automated Publishing (Recommended)

The repository includes GitHub Actions workflows for:
- **Canary releases**: Automatically published on merge to `main`
- **Stable releases**: Triggered manually via workflow dispatch

### 5. Verify Publication

Check npm to verify packages are published:

```bash
npm view @org/ui
npm view @org/themes
npm view @org/tokens
```

## Package Configuration

Each package includes:

- ✅ Proper `package.json` with metadata
- ✅ `.npmignore` to exclude source files
- ✅ `files` field to include only dist files
- ✅ `prepublishOnly` script to build before publishing
- ✅ TypeScript definitions
- ✅ README.md with usage instructions

## Version Strategy

- **Major (1.0.0)**: Breaking changes
- **Minor (0.1.0)**: New features, backward compatible
- **Patch (0.0.1)**: Bug fixes, backward compatible

## Canary Releases

Canary releases are automatically published with version format:
- `0.1.0-canary-<commit-hash>`

These are useful for:
- Testing changes before stable release
- Continuous integration
- Early access to features

## Stable Releases

Stable releases follow semantic versioning:
- Create changesets for changes
- Run `pnpm release:version`
- Review generated CHANGELOG.md
- Publish with `pnpm release:publish`

## Troubleshooting

### Authentication Issues

```bash
# Re-authenticate
npm login --scope=@org

# Check authentication
npm whoami --scope=@org
```

### Build Errors

Ensure all dependencies are installed:

```bash
pnpm install
pnpm build
```

### Publishing Errors

Check npm registry:

```bash
npm config get registry
npm config set @org:registry https://registry.npmjs.org/
```

## Best Practices

1. **Always use Changesets** for version management
2. **Test locally** before publishing
3. **Review CHANGELOG.md** before stable releases
4. **Tag releases** in Git after publishing
5. **Update documentation** with breaking changes

## CI/CD Integration

The repository includes GitHub Actions workflows that:
- Automatically publish canary releases
- Run tests before publishing
- Generate changelogs
- Tag releases

See `.github/workflows/` for details.

