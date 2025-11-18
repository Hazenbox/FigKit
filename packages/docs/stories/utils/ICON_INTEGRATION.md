# Icon Integration Guide

This guide explains how to integrate icon selection from the icon repository into Storybook component stories.

## Overview

All components that support icons can use the icon repository integration, which provides:
- **Icon selector dropdown** in Storybook controls
- **Search and filter** capabilities
- **All 600+ icons** from the Figma icon repository
- **Reusable pattern** for any component with icon support

## Usage

### 1. Import the icon utilities

```typescript
import { createIconArgType, renderIcon, iconNames } from './utils/iconSelector';
```

### 2. Add icon argType to your component meta

```typescript
const meta = {
  title: 'Components/YourComponent',
  component: YourComponent,
  argTypes: {
    // ... other argTypes
    iconLead: {
      control: 'boolean',
    },
    icon: {
      ...createIconArgType(),
      description: 'Select an icon from the icon repository',
      if: { arg: 'iconLead', eq: true }, // Only show when iconLead is true
    },
  },
} satisfies Meta<typeof YourComponent>;
```

### 3. Update stories to use render function

```typescript
export const Default: Story = {
  args: {
    children: 'Default',
    variant: 'default',
    iconLead: false,
    icon: '',
  },
  render: (args) => (
    <YourComponent 
      {...args} 
      icon={args.iconLead && args.icon ? renderIcon(args.icon) : undefined}
    >
      {args.children}
    </YourComponent>
  ),
};
```

### 4. Use icons in static stories

```typescript
export const WithIcons: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px' }}>
      <YourComponent icon={renderIcon('CheckIcon')} iconLead>Check</YourComponent>
      <YourComponent icon={renderIcon('PlusIcon')} iconLead>Add</YourComponent>
      <YourComponent icon={renderIcon('CloseIcon')} iconLead>Close</YourComponent>
    </div>
  ),
};
```

## Available Functions

### `createIconArgType()`
Returns an argType configuration for Storybook controls that provides a dropdown of all available icons.

**Features:**
- Dropdown with all 942+ icons from the repository
- Icon names are shown in the dropdown (e.g., "Check", "Plus", "ArrowRight")
- Only appears when `iconLead` (or similar prop) is `true`
- Searchable dropdown with clear labels

### `renderIcon(iconName: string, props?: any)`
Renders an icon component by name. Returns `null` if icon not found.

**Parameters:**
- `iconName`: The name of the icon (e.g., 'CheckIcon', 'PlusIcon')
- `props`: Optional props to pass to the icon component (e.g., `{ size: 20, color: '#000' }`)

**Returns:** React element or `null`

### `iconNames`
Array of all available icon names, sorted alphabetically.

### `getIconByName(iconName: string)`
Gets the icon component by name. Returns `null` if not found.

## Icon Naming Convention

Icons are named using PascalCase with "Icon" suffix:
- `CheckIcon`
- `PlusIcon`
- `ArrowRightIcon`
- `CloseIcon`

## Example: Badge Component

See `packages/docs/stories/Badge.stories.tsx` for a complete example of icon integration.

## When to Use

Use icon integration for any component that:
- Has an `icon` prop
- Has an `iconLead` or similar boolean prop
- Supports icon instances from Figma

## Best Practices

1. **Always use `renderIcon()`** instead of importing icons directly in stories
2. **Use conditional rendering** - only show icon when the icon prop is enabled
3. **Provide default empty string** for icon arg in stories
4. **Use `if` condition** in argTypes to show icon selector only when icon is enabled
5. **Document icon usage** in story descriptions

## How the Icon Dropdown Works

When `iconLead` is enabled:
1. **Icon dropdown appears** in Storybook controls panel
2. **Dropdown shows all icons** from the icon repository (942+ icons)
3. **Icon names are displayed** in a searchable select dropdown
4. **Select an icon** to see it rendered in the component
5. **Selected icon appears** in the component preview

The dropdown uses Storybook's native `select` control type, which provides:
- Search/filter functionality (type to search)
- Scrollable list of all icons
- Clear icon names (e.g., "Check", "Plus", "ArrowRight")
- Easy selection with keyboard navigation

## Troubleshooting

**Icon not showing?**
- Check that `iconLead` (or similar prop) is `true`
- Verify icon name exists in `iconNames` array
- Ensure `renderIcon()` is being called correctly

**Icon selector not appearing?**
- Verify `createIconArgType()` is used in argTypes
- Check that the `if` condition matches your icon enable prop name
- Ensure `iconLead` is set to `true` in the controls

**Icon dropdown is empty?**
- Verify icons are exported from `@figkit/ui`
- Check that `iconNames` array is populated
- Ensure icon repository was built correctly

**Icon component not found?**
- Verify icon is exported from `@figkit/ui`
- Check icon name spelling (case-sensitive)
- Ensure icon ends with "Icon" suffix
- Try searching for the icon name in the dropdown

