import type { Meta, StoryObj } from '@storybook/react-vite';
import { Tab } from '@figkit/ui';

const meta = {
  title: 'Components/Tab',
  component: Tab,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    selected: {
      control: 'boolean',
    },
    badge: {
      control: 'text',
    },
    state: {
      control: 'select',
      options: ['Default', 'Focused', 'Hover'],
    },
    children: {
      control: 'text',
    },
  },
} satisfies Meta<typeof Tab>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Tab Title',
    selected: false,
  },
};

export const Selected: Story = {
  args: {
    children: 'Active Tab',
    selected: true,
  },
};

export const WithBadge: Story = {
  args: {
    children: 'Tab Title',
    selected: true,
    badge: '21',
  },
};

export const Hover: Story = {
  args: {
    children: 'Tab Title',
    selected: false,
    state: 'Hover',
  },
};

export const Focused: Story = {
  args: {
    children: 'Tab Title',
    selected: true,
    state: 'Focused',
  },
};

export const AllStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ display: 'flex', gap: '0' }}>
        <Tab selected={false}>Unselected</Tab>
        <Tab selected={true}>Selected</Tab>
      </div>
      <div style={{ display: 'flex', gap: '0' }}>
        <Tab selected={false} state="Hover">Hover</Tab>
        <Tab selected={true} state="Focused">Focused</Tab>
      </div>
      <div style={{ display: 'flex', gap: '0' }}>
        <Tab selected={true} badge="21">With Badge</Tab>
        <Tab selected={false}>No Badge</Tab>
      </div>
    </div>
  ),
};
