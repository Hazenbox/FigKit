import type { Meta, StoryObj } from '@storybook/react-vite';
import { BadgeMall } from './BadgeMall';

const meta = {
  title: 'UI/BadgeMall',
  component: BadgeMall,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'brand', 'component', 'danger', 'feedback', 'figjam', 'invert', 'selected', 'success', 'variable', 'variable-selected', 'warn', 'merged', 'archived', 'menu'],
    },
    size: {
      control: 'select',
      options: ['default', 'large', 'wide'],
    },
    disabled: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof BadgeMall>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Default BadgeMall',
    variant: 'default',
  },
};

export const Brand: Story = {
  args: {
    children: 'Brand BadgeMall',
    variant: 'brand',
  },
};

export const Component: Story = {
  args: {
    children: 'Component BadgeMall',
    variant: 'component',
  },
};

export const Danger: Story = {
  args: {
    children: 'Danger BadgeMall',
    variant: 'danger',
  },
};

export const Feedback: Story = {
  args: {
    children: 'Feedback BadgeMall',
    variant: 'feedback',
  },
};

export const Figjam: Story = {
  args: {
    children: 'Figjam BadgeMall',
    variant: 'figjam',
  },
};

export const Invert: Story = {
  args: {
    children: 'Invert BadgeMall',
    variant: 'invert',
  },
};

export const Selected: Story = {
  args: {
    children: 'Selected BadgeMall',
    variant: 'selected',
  },
};

export const Success: Story = {
  args: {
    children: 'Success BadgeMall',
    variant: 'success',
  },
};

export const Variable: Story = {
  args: {
    children: 'Variable BadgeMall',
    variant: 'variable',
  },
};

export const Variableselected: Story = {
  args: {
    children: 'Variable-selected BadgeMall',
    variant: 'variable-selected',
  },
};

export const Warn: Story = {
  args: {
    children: 'Warn BadgeMall',
    variant: 'warn',
  },
};

export const Merged: Story = {
  args: {
    children: 'Merged BadgeMall',
    variant: 'merged',
  },
};

export const Archived: Story = {
  args: {
    children: 'Archived BadgeMall',
    variant: 'archived',
  },
};

export const Menu: Story = {
  args: {
    children: 'Menu BadgeMall',
    variant: 'menu',
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
      <BadgeMall size="default">DEFAULT</BadgeMall>
      <BadgeMall size="large">LARGE</BadgeMall>
      <BadgeMall size="wide">WIDE</BadgeMall>
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px' }}>
      <BadgeMall variant="default" disabled>Default Disabled</BadgeMall>
      <BadgeMall variant="brand" disabled>Brand Disabled</BadgeMall>
      <BadgeMall variant="component" disabled>Component Disabled</BadgeMall>
      <BadgeMall variant="danger" disabled>Danger Disabled</BadgeMall>
      <BadgeMall variant="feedback" disabled>Feedback Disabled</BadgeMall>
      <BadgeMall variant="figjam" disabled>Figjam Disabled</BadgeMall>
      <BadgeMall variant="invert" disabled>Invert Disabled</BadgeMall>
      <BadgeMall variant="selected" disabled>Selected Disabled</BadgeMall>
      <BadgeMall variant="success" disabled>Success Disabled</BadgeMall>
      <BadgeMall variant="variable" disabled>Variable Disabled</BadgeMall>
      <BadgeMall variant="variable-selected" disabled>Variable-selected Disabled</BadgeMall>
      <BadgeMall variant="warn" disabled>Warn Disabled</BadgeMall>
      <BadgeMall variant="merged" disabled>Merged Disabled</BadgeMall>
      <BadgeMall variant="archived" disabled>Archived Disabled</BadgeMall>
      <BadgeMall variant="menu" disabled>Menu Disabled</BadgeMall>
    </div>
  ),
};
