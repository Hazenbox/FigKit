# Setting Up GitHub Secrets

## Required Secrets

### 1. NPM_TOKEN

**For npmjs.com (public npm registry):**

1. Go to https://www.npmjs.com/login and sign in
2. Click your profile → **Access Tokens**: https://www.npmjs.com/settings/{username}/tokens
3. Click **Generate New Token**
4. Select **Automation** (for CI/CD) or **Publish** (for publishing packages)
5. Copy the token (you won't see it again!)
6. Add to GitHub Secrets as `NPM_TOKEN`

**For GitHub Packages (alternative):**

1. Go to https://github.com/settings/tokens
2. Click **Generate new token (classic)**
3. Select scopes:
   - ✅ `write:packages`
   - ✅ `read:packages`
   - ✅ `delete:packages` (optional)
4. Generate and copy the token
5. Add to GitHub Secrets as `NPM_TOKEN`

**Note:** If using GitHub Packages, you'll also need to update `.npmrc` in your workflows to use `@hazenbox:registry=https://npm.pkg.github.com`

### 2. FIGMA_PAT

1. Go to https://www.figma.com/
2. Click your profile → **Settings**
3. Scroll to **Personal access tokens**
4. Click **Create a new personal access token**
5. Give it a name (e.g., "FigKit CI")
6. Copy the token
7. Add to GitHub Secrets as `FIGMA_PAT`

### 3. FIGMA_FILE_KEY

1. Open your Figma file
2. Look at the URL: `https://www.figma.com/file/{FILE_KEY}/...`
3. Copy the `FILE_KEY` (the long string between `/file/` and `/`)
4. Add to GitHub Secrets as `FIGMA_FILE_KEY`

## Adding Secrets to GitHub

### Via Web UI

1. Go to: https://github.com/Hazenbox/FigKit/settings/secrets/actions
2. Click **New repository secret**
3. Enter the name and value
4. Click **Add secret**

### Via GitHub CLI

```bash
# Install GitHub CLI if needed
brew install gh

# Authenticate
gh auth login

# Add secrets
gh secret set NPM_TOKEN --repo Hazenbox/FigKit
gh secret set FIGMA_PAT --repo Hazenbox/FigKit
gh secret set FIGMA_FILE_KEY --repo Hazenbox/FigKit
```

### Via GitHub API

```bash
# Requires GITHUB_TOKEN with repo scope
curl -X POST \
  -H "Authorization: token YOUR_GITHUB_TOKEN" \
  -H "Accept: application/vnd.github.v3+json" \
  https://api.github.com/repos/Hazenbox/FigKit/actions/secrets/NPM_TOKEN \
  -d '{"encrypted_value":"YOUR_ENCRYPTED_VALUE","key_id":"YOUR_KEY_ID"}'
```

## Verifying Secrets

After adding secrets, you can verify they're set:

```bash
gh secret list --repo Hazenbox/FigKit
```

Or check in the GitHub UI: https://github.com/Hazenbox/FigKit/settings/secrets/actions

## Testing Secrets

1. Create a test PR
2. Check the CI workflow logs
3. Look for:
   - ✅ Token pull succeeds (if `FIGMA_PAT` is set)
   - ✅ Package publish succeeds (if `NPM_TOKEN` is set)

## Troubleshooting

### "NPM_TOKEN not found"
- Verify the secret name is exactly `NPM_TOKEN` (case-sensitive)
- Check that the workflow has access to secrets

### "Authentication failed"
- Verify the token is valid and not expired
- For npmjs.com, ensure the token has the correct permissions
- For GitHub Packages, ensure the token has `write:packages` scope

### "Figma API error"
- Verify `FIGMA_PAT` is valid
- Check that the token hasn't expired
- Verify `FIGMA_FILE_KEY` matches your file URL

