import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '@figkit/ui';
import React from 'react';

// Simple icon component for demonstration
const PlusIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 2V10M2 6H10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const meta = {
  title: 'UI/Button',
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
    icon: {
      control: false,
    },
    iconPosition: {
      control: 'select',
      options: ['left', 'center'],
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
  },
};

export const Secondary: Story = {
  args: {
    children: 'Button',
    variant: 'secondary',
    size: 'default',
  },
};

export const FigJam: Story = {
  args: {
    children: 'Button',
    variant: 'figjam',
    size: 'default',
  },
};

export const Destructive: Story = {
  args: {
    children: 'Button',
    variant: 'destructive',
    size: 'default',
  },
};

export const SecondaryDestruct: Story = {
  args: {
    children: 'Button',
    variant: 'secondary-destruct',
    size: 'default',
  },
};

export const Inverse: Story = {
  args: {
    children: 'Button',
    variant: 'inverse',
    size: 'default',
  },
};

export const Success: Story = {
  args: {
    children: 'Button',
    variant: 'success',
    size: 'default',
  },
};

export const Link: Story = {
  args: {
    children: 'Button',
    variant: 'link',
    size: 'default',
  },
};

export const LinkDanger: Story = {
  args: {
    children: 'Button',
    variant: 'link-danger',
    size: 'default',
  },
};

export const Ghost: Story = {
  args: {
    children: 'Button',
    variant: 'ghost',
    size: 'default',
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
          <Button variant="primary" icon={<PlusIcon />} iconPosition="left">
            Button
          </Button>
          <Button variant="secondary" icon={<PlusIcon />} iconPosition="left">
            Button
          </Button>
          <Button variant="ghost" icon={<PlusIcon />} iconPosition="left">
            Button
          </Button>
        </div>
      </div>
      <div>
        <h3 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600 }}>Icon Center</h3>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <Button variant="primary" icon={<PlusIcon />} iconPosition="center">
            Button
          </Button>
          <Button variant="secondary" icon={<PlusIcon />} iconPosition="center">
            Button
          </Button>
          <Button variant="ghost" icon={<PlusIcon />} iconPosition="center">
            Button
          </Button>
        </div>
      </div>
      <div>
        <h3 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600 }}>Large Size with Icons</h3>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <Button variant="primary" size="large" icon={<PlusIcon />} iconPosition="left">
            Button
          </Button>
          <Button variant="primary" size="large" icon={<PlusIcon />} iconPosition="center">
            Button
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
