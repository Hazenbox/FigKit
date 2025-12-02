import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '@figkit/ui';
import React from 'react';
import { createIconArgType, renderIcon, getIconOptions } from './utils/iconSelector';

const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'primary',
        'secondary',
        'figjam',
        'destructive',
        'secondary-destruct',
        'inverse',
        'success',
        'link',
        'link-danger',
        'ghost',
      ],
    },
    size: {
      control: 'select',
      options: ['default', 'large', 'wide'],
    },
    disabled: {
      control: 'boolean',
    },
    showIcon: {
      control: 'boolean',
      description: 'Enable icon display',
      table: {
        category: 'Icon',
      },
    },
    icon: {
      control: 'select',
      options: getIconOptions(),
      description: 'Select an icon from the icon repository (enable "showIcon" first)',
      table: {
        type: {
          summary: 'Icon from repository',
        },
        category: 'Icon',
      },
    },
    iconPosition: {
      control: 'select',
      options: ['left', 'center'],
      if: { arg: 'showIcon', eq: true },
      table: {
        category: 'Icon',
      },
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

/* ===== VARIANTS ===== */
export const Primary: Story = {
  args: {
    children: 'Button',
    variant: 'primary',
    size: 'default',
    showIcon: false,
    icon: '',
    iconPosition: 'left',
  },
  render: (args) => {
    const { showIcon, ...buttonProps } = args;
    return (
      <Button
        {...buttonProps}
        icon={showIcon && args.icon ? renderIcon(args.icon) : undefined}
      >
        {args.children}
      </Button>
    );
  },
};

export const Secondary: Story = {
  args: {
    children: 'Button',
    variant: 'secondary',
    size: 'default',
    showIcon: false,
    icon: '',
    iconPosition: 'left',
  },
  render: (args) => {
    const { showIcon, ...buttonProps } = args;
    return (
      <Button
        {...buttonProps}
        icon={showIcon && args.icon ? renderIcon(args.icon) : undefined}
      >
        {args.children}
      </Button>
    );
  },
};

export const FigJam: Story = {
  args: {
    children: 'Button',
    variant: 'figjam',
    size: 'default',
    showIcon: false,
    icon: '',
    iconPosition: 'left',
  },
  render: (args) => {
    const { showIcon, ...buttonProps } = args;
    return (
      <Button
        {...buttonProps}
        icon={showIcon && args.icon ? renderIcon(args.icon) : undefined}
      >
        {args.children}
      </Button>
    );
  },
};

export const Destructive: Story = {
  args: {
    children: 'Button',
    variant: 'destructive',
    size: 'default',
    showIcon: false,
    icon: '',
    iconPosition: 'left',
  },
  render: (args) => {
    const { showIcon, ...buttonProps } = args;
    return (
      <Button
        {...buttonProps}
        icon={showIcon && args.icon ? renderIcon(args.icon) : undefined}
      >
        {args.children}
      </Button>
    );
  },
};

export const SecondaryDestruct: Story = {
  args: {
    children: 'Button',
    variant: 'secondary-destruct',
    size: 'default',
    showIcon: false,
    icon: '',
    iconPosition: 'left',
  },
  render: (args) => {
    const { showIcon, ...buttonProps } = args;
    return (
      <Button
        {...buttonProps}
        icon={showIcon && args.icon ? renderIcon(args.icon) : undefined}
      >
        {args.children}
      </Button>
    );
  },
};

export const Inverse: Story = {
  args: {
    children: 'Button',
    variant: 'inverse',
    size: 'default',
    showIcon: false,
    icon: '',
    iconPosition: 'left',
  },
  render: (args) => {
    const { showIcon, ...buttonProps } = args;
    return (
      <Button
        {...buttonProps}
        icon={showIcon && args.icon ? renderIcon(args.icon) : undefined}
      >
        {args.children}
      </Button>
    );
  },
};

export const Success: Story = {
  args: {
    children: 'Button',
    variant: 'success',
    size: 'default',
    showIcon: false,
    icon: '',
    iconPosition: 'left',
  },
  render: (args) => {
    const { showIcon, ...buttonProps } = args;
    return (
      <Button
        {...buttonProps}
        icon={showIcon && args.icon ? renderIcon(args.icon) : undefined}
      >
        {args.children}
      </Button>
    );
  },
};

export const Link: Story = {
  args: {
    children: 'Button',
    variant: 'link',
    size: 'default',
    showIcon: false,
    icon: '',
    iconPosition: 'left',
  },
  render: (args) => {
    const { showIcon, ...buttonProps } = args;
    return (
      <Button
        {...buttonProps}
        icon={showIcon && args.icon ? renderIcon(args.icon) : undefined}
      >
        {args.children}
      </Button>
    );
  },
};

export const LinkDanger: Story = {
  args: {
    children: 'Button',
    variant: 'link-danger',
    size: 'default',
    showIcon: false,
    icon: '',
    iconPosition: 'left',
  },
  render: (args) => {
    const { showIcon, ...buttonProps } = args;
    return (
      <Button
        {...buttonProps}
        icon={showIcon && args.icon ? renderIcon(args.icon) : undefined}
      >
        {args.children}
      </Button>
    );
  },
};

export const Ghost: Story = {
  args: {
    children: 'Button',
    variant: 'ghost',
    size: 'default',
    showIcon: false,
    icon: '',
    iconPosition: 'left',
  },
  render: (args) => {
    const { showIcon, ...buttonProps } = args;
    return (
      <Button
        {...buttonProps}
        icon={showIcon && args.icon ? renderIcon(args.icon) : undefined}
      >
        {args.children}
      </Button>
    );
  },
};

/* ===== SIZES ===== */
export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'flex-start' }}>
      <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
        <Button variant="primary" size="default">
          Default (24px)
        </Button>
        <Button variant="primary" size="large">
          Large (32px)
        </Button>
      </div>
      <div style={{ width: '256px' }}>
        <Button variant="primary" size="wide">
          Wide (Full Width)
        </Button>
      </div>
    </div>
  ),
};

/* ===== STATES ===== */
export const States: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <h3 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600 }}>Primary Variant</h3>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <Button variant="primary">Default</Button>
          <Button variant="primary" style={{ background: 'var(--color-bg-brand-pressed, #007be5)' }}>
            Active
          </Button>
          <Button variant="primary" style={{ border: '1px solid var(--color-border-selected)', boxShadow: 'inset 0 0 0 2px #ffffff' }}>
            Focused
          </Button>
          <Button variant="primary" disabled>
            Disabled
          </Button>
        </div>
      </div>
      <div>
        <h3 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600 }}>Secondary Variant</h3>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <Button variant="secondary">Default</Button>
          <Button variant="secondary" style={{ background: 'var(--color-bg-component-pressed)' }}>
            Active
          </Button>
          <Button variant="secondary" style={{ border: '1px solid var(--color-border-selected)', boxShadow: 'inset 0 0 0 2px #ffffff' }}>
            Focused
          </Button>
          <Button variant="secondary" disabled>
            Disabled
          </Button>
        </div>
      </div>
      <div>
        <h3 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600 }}>Ghost Variant</h3>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <Button variant="ghost">Default</Button>
          <Button variant="ghost" style={{ background: 'var(--color-bg-component-hover)' }}>
            Hover
          </Button>
          <Button variant="ghost" style={{ background: 'var(--color-bg-component-pressed)' }}>
            Active
          </Button>
          <Button variant="ghost" style={{ border: '1px solid var(--color-border-selected)', boxShadow: 'inset 0 0 0 2px #ffffff' }}>
            Focused
          </Button>
          <Button variant="ghost" disabled>
            Disabled
          </Button>
        </div>
      </div>
    </div>
  ),
};

/* ===== WITH ICONS ===== */
export const WithIcons: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <h3 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600 }}>Icon Left (Default)</h3>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <Button variant="primary" icon={renderIcon('PlusIcon')} iconPosition="left">
            Button
          </Button>
          <Button variant="secondary" icon={renderIcon('CheckIcon')} iconPosition="left">
            Button
          </Button>
          <Button variant="ghost" icon={renderIcon('ArrowIcon')} iconPosition="left">
            Button
          </Button>
        </div>
      </div>
      <div>
        <h3 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600 }}>Icon Center</h3>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <Button variant="primary" icon={renderIcon('PlusIcon')} iconPosition="center">
            Button
          </Button>
          <Button variant="secondary" icon={renderIcon('CheckIcon')} iconPosition="center">
            Button
          </Button>
          <Button variant="ghost" icon={renderIcon('ArrowIcon')} iconPosition="center">
            Button
          </Button>
        </div>
      </div>
      <div>
        <h3 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600 }}>Large Size with Icons</h3>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <Button variant="primary" size="large" icon={renderIcon('PlusIcon')} iconPosition="left">
            Button
          </Button>
          <Button variant="primary" size="large" icon={renderIcon('CheckIcon')} iconPosition="center">
            Button
          </Button>
        </div>
      </div>
      <div>
        <h3 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600 }}>Various Icons</h3>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
          <Button variant="primary" icon={renderIcon('PlusIcon')} iconPosition="left">
            Add
          </Button>
          <Button variant="primary" icon={renderIcon('CheckIcon')} iconPosition="left">
            Confirm
          </Button>
          <Button variant="primary" icon={renderIcon('CloseIcon')} iconPosition="left">
            Close
          </Button>
          <Button variant="primary" icon={renderIcon('SearchIcon')} iconPosition="left">
            Search
          </Button>
          <Button variant="primary" icon={renderIcon('SettingsIcon')} iconPosition="left">
            Settings
          </Button>
          <Button variant="primary" icon={renderIcon('TrashIcon')} iconPosition="left">
            Delete
          </Button>
        </div>
      </div>
    </div>
  ),
};

/* ===== ALL VARIANTS SHOWCASE ===== */
export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="figjam">FigJam</Button>
        <Button variant="destructive">Destructive</Button>
        <Button variant="secondary-destruct">Secondary Destruct</Button>
        <Button variant="inverse">Inverse</Button>
        <Button variant="success">Success</Button>
        <Button variant="link">Link</Button>
        <Button variant="link-danger">Link Danger</Button>
        <Button variant="ghost">Ghost</Button>
      </div>
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
        <Button variant="primary" disabled>
          Primary Disabled
        </Button>
        <Button variant="secondary" disabled>
          Secondary Disabled
        </Button>
        <Button variant="figjam" disabled>
          FigJam Disabled
        </Button>
        <Button variant="destructive" disabled>
          Destructive Disabled
        </Button>
        <Button variant="inverse" disabled>
          Inverse Disabled
        </Button>
        <Button variant="success" disabled>
          Success Disabled
        </Button>
        <Button variant="link" disabled>
          Link Disabled
        </Button>
        <Button variant="link-danger" disabled>
          Link Danger Disabled
        </Button>
        <Button variant="ghost" disabled>
          Ghost Disabled
        </Button>
      </div>
    </div>
  ),
};

/* ===== INTERACTIVE ===== */
export const Interactive: Story = {
  render: () => {
    const [count, setCount] = React.useState(0);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'flex-start' }}>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <Button variant="primary" onClick={() => setCount((c) => c + 1)}>
            Click me ({count})
          </Button>
          <Button variant="secondary" onClick={() => setCount((c) => c - 1)}>
            Decrement
          </Button>
          <Button variant="ghost" onClick={() => setCount(0)}>
            Reset
          </Button>
        </div>
        <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)' }}>
          Count: {count}
        </p>
      </div>
    );
  },
};
