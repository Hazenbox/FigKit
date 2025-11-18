import type { Meta, StoryObj } from '@storybook/react-vite';
import { Checkbox } from '@figkit/ui';

const meta = {
  title: 'Components/Checkbox',
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
    focused: {
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
    label: 'On, Normal',
    checked: false,
  },
};

export const Checked: Story = {
  args: {
    label: 'On, Normal',
    checked: true,
  },
};

export const Indeterminate: Story = {
  args: {
    label: 'Mixed, Normal',
    indeterminate: true,
  },
};

export const WithDescription: Story = {
  args: {
    label: 'Checkbox with description',
    description: 'Helpful description of the setting which may briefly highlight side effects or conditions of the setting.',
    checked: true,
  },
};

export const Disabled: Story = {
  args: {
    label: 'On, Disabled + Muted',
    checked: true,
    disabled: true,
  },
};

export const DisabledUnchecked: Story = {
  args: {
    label: 'Off, Disabled + Muted',
    checked: false,
    disabled: true,
  },
};

export const Muted: Story = {
  args: {
    label: 'On, Normal, Muted',
    muted: true,
    checked: true,
  },
};

export const MutedUnchecked: Story = {
  args: {
    label: 'Off, Normal + Muted',
    muted: true,
    checked: false,
  },
};

export const Ghost: Story = {
  args: {
    label: 'On, Normal, Ghost',
    ghost: true,
    checked: true,
  },
};

export const GhostUnchecked: Story = {
  args: {
    label: 'Off, Normal, Ghost',
    ghost: true,
    checked: false,
  },
};

export const Focused: Story = {
  args: {
    label: 'On, Focused',
    checked: true,
    focused: true,
  },
};

export const FocusedUnchecked: Story = {
  args: {
    label: 'Off, Focused + Muted',
    checked: false,
    focused: true,
  },
};

export const AllStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Checkbox label="On, Normal" checked />
      <Checkbox label="Off, Normal" checked={false} />
      <Checkbox label="Mixed, Normal" indeterminate />
      <Checkbox label="On, Normal, Muted" checked muted />
      <Checkbox label="Off, Normal + Muted" muted />
      <Checkbox label="On, Normal, Ghost" checked ghost />
      <Checkbox label="Off, Normal, Ghost" ghost />
      <Checkbox label="On, Focused" checked focused />
      <Checkbox label="Off, Focused + Muted" focused />
      <Checkbox label="On, Disabled + Muted" checked disabled />
      <Checkbox label="Off, Disabled + Muted" disabled />
      <Checkbox 
        label="With description" 
        description="Helpful description of the setting which may briefly highlight side effects or conditions of the setting."
        checked 
      />
    </div>
  ),
};
