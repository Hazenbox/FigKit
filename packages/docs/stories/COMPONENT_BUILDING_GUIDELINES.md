# Component Building Guidelines

## Icon Usage in Storybook Stories

### ✅ CORRECT: Use `renderIcon()` helper

```typescript
import { renderIcon } from './utils/iconSelector';

export const MyStory: Story = {
  args: {
    segments: [
      { id: '1', icon: renderIcon('CheckIcon') },
      { id: '2', icon: renderIcon('PlusIcon') },
    ],
  },
};
```

### ❌ INCORRECT: Direct icon imports

```typescript
// DON'T DO THIS - icons may not be exported from @figkit/ui
import { CheckIcon, PlusIcon } from '@figkit/ui';

export const MyStory: Story = {
  args: {
    segments: [
      { id: '1', icon: <CheckIcon /> },
      { id: '2', icon: <PlusIcon /> },
    ],
  },
};
```

## Why Use `renderIcon()`?

1. **Consistent Pattern**: All Storybook stories use the same icon loading mechanism
2. **Icon Repository**: Icons are loaded from the centralized icon repository
3. **No Export Issues**: Avoids "does not provide an export" errors
4. **Future-Proof**: Works even if icon exports change

## Component Export Checklist

When building a new component:

1. ✅ Create component files (`Component.tsx`, `component.css`, `index.ts`)
2. ✅ Add component export to `packages/ui/src/components.ts`
3. ✅ Add CSS import to `packages/ui/src/index.css`
4. ✅ **Rebuild UI package**: `pnpm -F @figkit/ui build`
5. ✅ Create Storybook stories using `renderIcon()` for icons
6. ✅ Add component to storySort in `packages/docs/.storybook/preview.tsx`
7. ✅ **Clear ALL caches** before testing:
   ```bash
   rm -rf packages/docs/node_modules/.cache
   rm -rf packages/docs/node_modules/.vite
   rm -rf packages/docs/.storybook-static
   ```
8. ✅ Restart Storybook: `pnpm -F @figkit/docs storybook`

## Icon Export Status

Icons are exported from `packages/ui/src/index.ts` via:
```typescript
export * from './icons';
```

This ensures all icons are available when importing from `@figkit/ui` in Storybook.

## Common Errors and Fixes

### Error: "does not provide an export named 'XIcon'"

**Cause**: Direct icon import instead of using `renderIcon()`

**Fix**: 
1. Replace direct imports with `renderIcon('IconName')`
2. Import `renderIcon` from `'./utils/iconSelector'`
3. Rebuild UI package
4. Clear Storybook cache

### Error: "does not provide an export named 'ComponentName'"

**Cause**: Storybook cache is stale after adding new component

**Fix**:
1. **Rebuild UI package**: `pnpm -F @figkit/ui build`
2. **Stop Storybook**: `pkill -f storybook`
3. **Clear ALL caches**:
   ```bash
   rm -rf packages/docs/node_modules/.cache
   rm -rf packages/docs/node_modules/.vite
   rm -rf packages/docs/.storybook-static
   ```
4. **Verify export exists**: `grep "ComponentName" packages/ui/dist/index.d.ts`
5. **Restart Storybook**: `pnpm -F @figkit/docs storybook`

### Error: Storybook shows blank page

**Fix**:
1. Check browser console for errors
2. Rebuild UI package: `pnpm -F @figkit/ui build`
3. Clear Storybook cache: `rm -rf packages/docs/node_modules/.cache packages/docs/node_modules/.vite`
4. Restart Storybook

## Example: Complete Story File

```typescript
import type { Meta, StoryObj } from '@storybook/react-vite';
import { MyComponent } from '@figkit/ui';
import { renderIcon } from './utils/iconSelector';

const meta = {
  title: 'Components/MyComponent',
  component: MyComponent,
  tags: ['autodocs'],
} satisfies Meta<typeof MyComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    icon: renderIcon('CheckIcon'),
    label: 'Example',
  },
};
```

## Cache Clearing Script

For convenience, you can create a script to clear all caches:

```bash
#!/bin/bash
# clear-storybook-cache.sh
echo "Clearing Storybook caches..."
rm -rf packages/docs/node_modules/.cache
rm -rf packages/docs/node_modules/.vite
rm -rf packages/docs/.storybook-static
echo "✅ Caches cleared!"
```
