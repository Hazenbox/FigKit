# @figkit/ui

React component library with design tokens and multi-brand/theme support.

## Installation

```bash
npm install @figkit/ui
# or
pnpm add @figkit/ui
# or
yarn add @figkit/ui
```

## Peer Dependencies

This package requires React 18+ or React 19+:

```bash
npm install react react-dom
```

## Usage

### Basic Setup

1. Import the theme CSS:

```tsx
import '@figkit/themes/tokens.css';
```

2. Set the brand and theme attributes on your root element:

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

3. Import and use components:

```tsx
import { Button, Checkbox, Tabs } from '@figkit/ui';
import '@figkit/ui/index.css';

function MyComponent() {
  return (
    <div>
      <Button variant="primary" size="default">
        Click me
      </Button>
      <Checkbox label="Accept terms" />
      <Tabs
        items={[
          { label: 'Tab 1' },
          { label: 'Tab 2' },
        ]}
        defaultValue={0}
      />
    </div>
  );
}
```

## Components

### Button

```tsx
import { Button } from '@figkit/ui';

<Button variant="primary" size="default">
  Button
</Button>
```

**Variants:** `primary`, `secondary`, `figjam`, `destructive`, `secondary-destruct`, `inverse`, `success`, `link`, `link-danger`, `ghost`

**Sizes:** `default` (24px), `large` (32px), `wide` (full width)

**Props:**
- `variant?: ButtonVariant`
- `size?: ButtonSize`
- `icon?: ReactNode`
- `iconPosition?: 'left' | 'center'`
- `disabled?: boolean`
- All standard button HTML attributes

### Checkbox

```tsx
import { Checkbox } from '@figkit/ui';

<Checkbox
  label="Accept terms"
  description="Please read and accept the terms"
  checked={checked}
  onChange={(e) => setChecked(e.target.checked)}
/>
```

**Props:**
- `label?: ReactNode`
- `description?: ReactNode`
- `checked?: boolean`
- `indeterminate?: boolean`
- `disabled?: boolean`
- `muted?: boolean`
- `ghost?: boolean`
- All standard checkbox HTML attributes

### Tabs

```tsx
import { Tabs } from '@figkit/ui';

<Tabs
  items={[
    { label: 'Tab 1', badge: '5' },
    { label: 'Tab 2' },
    { label: 'Tab 3', disabled: true },
  ]}
  value={selectedIndex}
  onChange={(index) => setSelectedIndex(index)}
/>
```

**Props:**
- `items: TabsItem[]` - Array of tab items
- `value?: number` - Controlled selected index
- `defaultValue?: number` - Uncontrolled initial index
- `onChange?: (index: number) => void`

## Theming

The components support multiple brands and themes:

**Brands:** `default`, `figjam`, `devmode`, `slides`

**Themes:** `light`, `dark`

Switch themes dynamically:

```tsx
document.documentElement.setAttribute('data-brand', 'figjam');
document.documentElement.setAttribute('data-theme', 'dark');
```

## TypeScript

This package is written in TypeScript and includes type definitions:

```tsx
import type { ButtonProps, ButtonVariant, ButtonSize } from '@figkit/ui';
```

## License

ISC

