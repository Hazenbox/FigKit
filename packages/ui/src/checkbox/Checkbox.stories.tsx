import type { Meta, StoryObj } from '@storybook/react-vite';
import { Checkbox } from '@org/ui';

const meta = {
  title: 'UI/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    checked: {
      control: 'boolean',
    },
    indeterminate: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
    muted: {
      control: 'boolean',
    },
    ghost: {
      control: 'boolean',
    },
    label: {
      control: 'text',
    },
    description: {
      control: 'text',
    },
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Checkbox label',
    checked: false,
  },
};

export const Checked: Story = {
  args: {
    label: 'Checked checkbox',
    checked: true,
  },
};

export const Indeterminate: Story = {
  args: {
    label: 'Indeterminate checkbox',
    indeterminate: true,
  },
};

export const WithDescription: Story = {
  args: {
    label: 'Checkbox with description',
    description: 'This is a helpful description for the checkbox',
    checked: true,
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled checkbox',
    checked: true,
    disabled: true,
  },
};

export const DisabledUnchecked: Story = {
  args: {
    label: 'Disabled unchecked',
    checked: false,
    disabled: true,
  },
};

export const Muted: Story = {
  args: {
    label: 'Muted checkbox',
    muted: true,
    checked: true,
  },
};

export const Ghost: Story = {
  args: {
    label: 'Ghost checkbox',
    ghost: true,
    checked: true,
  },
};

export const AllStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Checkbox label="Unchecked" />
      <Checkbox label="Checked" checked />
      <Checkbox label="Indeterminate" indeterminate />
      <Checkbox label="Disabled unchecked" disabled />
      <Checkbox label="Disabled checked" checked disabled />
      <Checkbox label="Muted" muted checked />
      <Checkbox label="Ghost" ghost checked />
      <Checkbox label="With description" description="This is a description" checked />
    </div>
  ),
};
