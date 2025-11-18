import type { Meta, StoryObj } from '@storybook/react-vite';
import { Tab } from './Tab';

const meta = {
  title: 'UI/Tab',
  component: Tab,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'figjam', 'destructive', 'secondary-destruct', 'inverse', 'success', 'link', 'link-danger', 'ghost'],
    },
    size: {
      control: 'select',
      options: ['default', 'large', 'wide'],
    },
    disabled: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Tab>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: 'Primary Tab',
    variant: 'primary',
  },
};

export const Secondary: Story = {
  args: {
    children: 'Secondary Tab',
    variant: 'secondary',
  },
};

export const Figjam: Story = {
  args: {
    children: 'Figjam Tab',
    variant: 'figjam',
  },
};

export const Destructive: Story = {
  args: {
    children: 'Destructive Tab',
    variant: 'destructive',
  },
};

export const Secondarydestruct: Story = {
  args: {
    children: 'Secondary-destruct Tab',
    variant: 'secondary-destruct',
  },
};

export const Inverse: Story = {
  args: {
    children: 'Inverse Tab',
    variant: 'inverse',
  },
};

export const Success: Story = {
  args: {
    children: 'Success Tab',
    variant: 'success',
  },
};

export const Link: Story = {
  args: {
    children: 'Link Tab',
    variant: 'link',
  },
};

export const Linkdanger: Story = {
  args: {
    children: 'Link-danger Tab',
    variant: 'link-danger',
  },
};

export const Ghost: Story = {
  args: {
    children: 'Ghost Tab',
    variant: 'ghost',
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
      <Tab size="default">DEFAULT</Tab>
      <Tab size="large">LARGE</Tab>
      <Tab size="wide">WIDE</Tab>
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px' }}>
      <Tab variant="primary" disabled>Primary Disabled</Tab>
      <Tab variant="secondary" disabled>Secondary Disabled</Tab>
      <Tab variant="figjam" disabled>Figjam Disabled</Tab>
      <Tab variant="destructive" disabled>Destructive Disabled</Tab>
      <Tab variant="secondary-destruct" disabled>Secondary-destruct Disabled</Tab>
      <Tab variant="inverse" disabled>Inverse Disabled</Tab>
      <Tab variant="success" disabled>Success Disabled</Tab>
      <Tab variant="link" disabled>Link Disabled</Tab>
      <Tab variant="link-danger" disabled>Link-danger Disabled</Tab>
      <Tab variant="ghost" disabled>Ghost Disabled</Tab>
    </div>
  ),
};
