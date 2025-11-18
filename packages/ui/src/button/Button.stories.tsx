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
      options: ['primary', 'destructive', 'inverse', 'success', 'figjam', 'secondary', 'secondary-destruct', 'link', 'link-danger', 'ghost'],
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

export const Primary: Story = {
  args: {
    children: 'Primary Button',
    variant: 'primary',
  },
};

export const Destructive: Story = {
  args: {
    children: 'Destructive Button',
    variant: 'destructive',
  },
};

export const Inverse: Story = {
  args: {
    children: 'Inverse Button',
    variant: 'inverse',
  },
};

export const Success: Story = {
  args: {
    children: 'Success Button',
    variant: 'success',
  },
};

export const Figjam: Story = {
  args: {
    children: 'Figjam Button',
    variant: 'figjam',
  },
};

export const Secondary: Story = {
  args: {
    children: 'Secondary Button',
    variant: 'secondary',
  },
};

export const Secondarydestruct: Story = {
  args: {
    children: 'Secondary-destruct Button',
    variant: 'secondary-destruct',
  },
};

export const Link: Story = {
  args: {
    children: 'Link Button',
    variant: 'link',
  },
};

export const Linkdanger: Story = {
  args: {
    children: 'Link-danger Button',
    variant: 'link-danger',
  },
};

export const Ghost: Story = {
  args: {
    children: 'Ghost Button',
    variant: 'ghost',
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
      <Button variant="primary" disabled>Primary Disabled</Button>
      <Button variant="destructive" disabled>Destructive Disabled</Button>
      <Button variant="inverse" disabled>Inverse Disabled</Button>
      <Button variant="success" disabled>Success Disabled</Button>
      <Button variant="figjam" disabled>Figjam Disabled</Button>
      <Button variant="secondary" disabled>Secondary Disabled</Button>
      <Button variant="secondary-destruct" disabled>Secondary-destruct Disabled</Button>
      <Button variant="link" disabled>Link Disabled</Button>
      <Button variant="link-danger" disabled>Link-danger Disabled</Button>
      <Button variant="ghost" disabled>Ghost Disabled</Button>
    </div>
  ),
};
