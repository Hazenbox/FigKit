import type { Meta, StoryObj } from '@storybook/react-vite';
import { TextInput } from './TextInput';

const meta = {
  title: 'UI/TextInput',
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
    disabled: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof TextInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Singleline: Story = {
  args: {
    children: 'Single-line TextInput',
    variant: 'single-line',
  },
};

export const Multiline: Story = {
  args: {
    children: 'Multi-line TextInput',
    variant: 'multi-line',
  },
};

export const Quickaction: Story = {
  args: {
    children: 'Quick-action TextInput',
    variant: 'quick-action',
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
      <TextInput size="default">DEFAULT</TextInput>
      <TextInput size="large">LARGE</TextInput>
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px' }}>
      <TextInput variant="single-line" disabled>Single-line Disabled</TextInput>
      <TextInput variant="multi-line" disabled>Multi-line Disabled</TextInput>
      <TextInput variant="quick-action" disabled>Quick-action Disabled</TextInput>
    </div>
  ),
};
