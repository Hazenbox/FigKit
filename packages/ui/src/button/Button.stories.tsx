import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from './Button';

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
      options: ['input', 'button'],
    },
    size: {
      control: 'select',
      options: ['default', 'large', 'wide'],
    },
    disabled: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Input: Story = {
  args: {
    children: 'Input Button',
    variant: 'input',
  },
};

export const Button: Story = {
  args: {
    children: 'Button Button',
    variant: 'button',
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
      <Button size="default">DEFAULT</Button>
      <Button size="large">LARGE</Button>
      <Button size="wide">WIDE</Button>
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px' }}>
      <Button variant="input" disabled>Input Disabled</Button>
      <Button variant="button" disabled>Button Disabled</Button>
    </div>
  ),
};
