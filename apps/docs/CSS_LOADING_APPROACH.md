# CSS Loading Approach - Industry Standard

## Current Solution: CSS @import (Standard Practice)

We're using **CSS `@import`** in `custom.css` - this is the industry standard approach used by:
- Material-UI
- Ant Design  
- Chakra UI
- Mantine

### Why This Approach?

1. **Simple**: CSS `@import` is native and works everywhere
2. **Standard**: Used by all major design systems
3. **Workspace Compatible**: Works with `workspace:*` packages (same as npm)
4. **No Complexity**: No webpack config, no client-modules complexity

### Implementation

```css
/* apps/docs/src/css/custom.css */
@import '../../../packages/themes/dist/tokens.css';
@import '../../../packages/ui/dist/index.css';
```

Docusaurus processes this automatically via `customCss` in `docusaurus.config.ts`.

## Alternative Approaches (Not Recommended)

### 1. Embed Storybook Stories (Iframe)
**Pros:**
- Shows exact Storybook UI
- Interactive controls

**Cons:**
- ❌ Not industry standard
- ❌ Complex setup (CORS, iframe sizing)
- ❌ Performance overhead
- ❌ Styling conflicts
- ❌ SEO issues

**Used by:** Storybook's own docs (but they own both tools)

### 2. Publish to npm
**Pros:**
- Standard npm workflow
- Version control

**Cons:**
- ❌ Unnecessary for monorepo (workspace packages work the same)
- ❌ Extra publish step
- ❌ Slower iteration (need to publish to test)

**Used by:** Public design systems (Material-UI, Ant Design) - but they're public packages

## Our Setup (Monorepo)

Since we're in a **monorepo with workspace packages**:
- ✅ Components: Import from `@figkit/ui` (workspace package)
- ✅ CSS: Import via `@import` in `custom.css`
- ✅ Same as npm, but faster iteration

## Verification

1. CSS files exist: `packages/themes/dist/tokens.css`, `packages/ui/dist/index.css`
2. CSS imported: `@import '../../../packages/themes/dist/tokens.css';`
3. Components imported: `import { Badge } from '@figkit/ui';`
4. Design tokens applied: `data-brand` and `data-theme` attributes set

This is the **simplest and most standard** approach.

