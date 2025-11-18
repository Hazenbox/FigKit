import type { Meta, StoryObj } from '@storybook/react-vite';
import { TextInput } from '@figkit/ui';
import React from 'react';

const meta = {
  title: 'Components/TextInput',
  component: TextInput,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['single-line', 'multi-line', 'quick-action'],
    },
    size: {
      control: 'select',
      options: ['default', 'large'],
    },
    state: {
      control: 'select',
      options: ['default', 'focus', 'disabled', 'active', 'variable', 'empty', 'active-empty', 'active-filled'],
    },
    disabled: {
      control: 'boolean',
    },
    error: {
      control: 'boolean',
    },
    iconPosition: {
      control: 'select',
      options: ['left', 'right'],
    },
    dropdown: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof TextInput>;

export default meta;
type Story = StoryObj<typeof meta>;

/* ===== VARIANTS ===== */
export const SingleLine: Story = {
  args: {
    variant: 'single-line',
    size: 'default',
    placeholder: 'Enter text...',
  },
};

export const MultiLine: Story = {
  args: {
    variant: 'multi-line',
    size: 'default',
    placeholder: 'Enter multiple lines...',
  },
};

export const QuickAction: Story = {
  args: {
    variant: 'quick-action',
    size: 'large',
    placeholder: 'Quick action...',
  },
};

/* ===== SIZES ===== */
export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '300px' }}>
      <div>
        <TextInput variant="single-line" size="default" placeholder="Default size (24px)" />
      </div>
      <div>
        <TextInput variant="single-line" size="large" placeholder="Large size (32px)" />
      </div>
    </div>
  ),
};

/* ===== STATES ===== */
export const States: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '300px' }}>
      <div>
        <label style={{ display: 'block', marginBottom: '4px', fontSize: '11px' }}>Default</label>
        <TextInput variant="single-line" state="default" placeholder="Default state" />
      </div>
      <div>
        <label style={{ display: 'block', marginBottom: '4px', fontSize: '11px' }}>Focus</label>
        <TextInput variant="single-line" state="focus" placeholder="Focus state" />
      </div>
      <div>
        <label style={{ display: 'block', marginBottom: '4px', fontSize: '11px' }}>Active</label>
        <TextInput variant="single-line" state="active" value="Active state" />
      </div>
      <div>
        <label style={{ display: 'block', marginBottom: '4px', fontSize: '11px' }}>Empty</label>
        <TextInput variant="single-line" state="empty" placeholder="Empty state" />
      </div>
      <div>
        <label style={{ display: 'block', marginBottom: '4px', fontSize: '11px' }}>Disabled</label>
        <TextInput variant="single-line" state="disabled" placeholder="Disabled state" />
      </div>
      <div>
        <label style={{ display: 'block', marginBottom: '4px', fontSize: '11px' }}>Error</label>
        <TextInput variant="single-line" error placeholder="Error state" />
      </div>
    </div>
  ),
};

/* ===== WITH ICONS ===== */
export const WithIcons: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '300px' }}>
      <div>
        <label style={{ display: 'block', marginBottom: '4px', fontSize: '11px' }}>Icon Left</label>
        <TextInput
          variant="single-line"
          icon={
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M21 21L16.65 16.65" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          }
          iconPosition="left"
          placeholder="Search..."
        />
      </div>
      <div>
        <label style={{ display: 'block', marginBottom: '4px', fontSize: '11px' }}>Icon Right</label>
        <TextInput
          variant="single-line"
          icon={
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L6 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M6 6L18 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          }
          iconPosition="right"
          placeholder="Clear..."
        />
      </div>
    </div>
  ),
};

/* ===== WITH DROPDOWN ===== */
export const WithDropdown: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '300px' }}>
      <div>
        <TextInput
          variant="single-line"
          size="large"
          dropdown
          placeholder="Select option..."
        />
      </div>
    </div>
  ),
};

/* ===== WITH LABEL AND HELPER TEXT ===== */
export const WithLabelAndHelper: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '300px' }}>
      <div>
        <TextInput
          variant="single-line"
          label="Email"
          placeholder="Enter your email"
          helperText="We'll never share your email"
        />
      </div>
      <div>
        <TextInput
          variant="single-line"
          label="Password"
          type="password"
          placeholder="Enter your password"
          helperText="Must be at least 8 characters"
        />
      </div>
      <div>
        <TextInput
          variant="single-line"
          label="Username"
          placeholder="Enter username"
          error
          helperText="This username is already taken"
        />
      </div>
    </div>
  ),
};

/* ===== ALL VARIANTS SHOWCASE ===== */
export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '300px' }}>
      <div>
        <h3 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600 }}>Single Line</h3>
        <TextInput variant="single-line" placeholder="Single line input" />
      </div>
      <div>
        <h3 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600 }}>Multi Line</h3>
        <TextInput variant="multi-line" placeholder="Multi line textarea" />
      </div>
      <div>
        <h3 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600 }}>Quick Action</h3>
        <TextInput variant="quick-action" placeholder="Quick action input" />
      </div>
    </div>
  ),
};

