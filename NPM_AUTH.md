# npm Authentication Guide

## Issue

The classic `npm login` command is deprecated. npm now requires web-based authentication or access tokens.

## Solution Options

### Option 1: Web-Based Login (Recommended)

Simply run:
```bash
npm login
```

This will:
1. Open your default web browser
2. Prompt you to log in via npmjs.com
3. Complete authentication automatically

### Option 2: Access Token Authentication

1. **Create an access token**:
   - Visit: https://www.npmjs.com/settings/upen1899/tokens
   - Click "Generate New Token"
   - Choose token type:
     - **Classic Token**: Full access (expires Nov 19, 2024)
     - **Granular Token**: More secure, limited permissions (90 days, 2FA required)
   - Copy the token

2. **Configure npm to use the token**:
   ```bash
   npm config set //registry.npmjs.org/:_authToken YOUR_TOKEN_HERE
   ```

3. **Verify authentication**:
   ```bash
   npm whoami
   ```

### Option 3: For Scoped Packages (@org/*)

If you're publishing scoped packages like `@org/ui`, you have two options:

#### A. Publish as your personal scope
Change package names from `@org/ui` to `@upen1899/ui` in package.json files.

#### B. Create an npm organization
1. Visit: https://www.npmjs.com/org/create
2. Create an organization (e.g., `@hazenbox` or `@figkit`)
3. Update package.json files to use the organization scope
4. Authenticate with the organization

### Recommended Approach

For this project, we recommend:

1. **Use web-based login**:
   ```bash
   npm login
   ```

2. **If publishing scoped packages**, either:
   - Use your personal scope: `@upen1899/ui` (free)
   - Create an organization: `@hazenbox/ui` or `@figkit/ui` (may require paid plan for private packages)

3. **Update package names** if needed:
   ```bash
   # Example: Change @org/ui to @upen1899/ui
   # Update in all package.json files
   ```

## Verify Authentication

After authenticating, verify it works:

```bash
npm whoami
```

Should output your npm username.

## Publishing

Once authenticated, you can publish:

```bash
# Create changeset
pnpm changeset

# Version bump
pnpm release:version

# Publish
pnpm release:publish
```

## Troubleshooting

### "This route is no longer supported"
- Use `npm login` (web-based) instead of `npm adduser`
- Or use access token authentication

### "You do not have permission to publish"
- Check if the package name is available
- For scoped packages, ensure you have access to the scope
- For organizations, ensure you're a member with publish permissions

### "Package name already exists"
- Choose a different package name
- Or use a scoped package name (e.g., `@upen1899/ui`)

## Security Notes

- **Classic tokens expire Nov 19, 2024** - Migrate to granular tokens
- **Granular tokens** require 2FA and expire in 90 days
- **Update CI/CD workflows** to use new token format

## Resources

- npm Authentication: https://docs.npmjs.com/cli/v10/commands/npm-login
- Access Tokens: https://docs.npmjs.com/creating-and-viewing-access-tokens
- Organizations: https://docs.npmjs.com/organizations

