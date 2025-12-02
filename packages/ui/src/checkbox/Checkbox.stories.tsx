import type { Meta, StoryObj } from '@storybook/react-vite';
import { Checkbox } from './Checkbox';

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

/* ===== STATES ===== */
export const Default: Story = {
  args: {
    label: 'On, Normal',
    checked: true,
    indeterminate: false,
    disabled: false,
    muted: false,
    ghost: false,
    focused: false,
  },
};

export const Unchecked: Story = {
  args: {
    label: 'Off, Normal',
    checked: false,
    indeterminate: false,
    disabled: false,
    muted: false,
    ghost: false,
    focused: false,
  },
};

export const Mixed: Story = {
  args: {
    label: 'Mixed, Normal',
    checked: false,
    indeterminate: true,
    disabled: false,
    muted: false,
    ghost: false,
    focused: false,
  },
};

export const Focused: Story = {
  args: {
    label: 'On, Focused',
    checked: true,
    indeterminate: false,
    disabled: false,
    muted: false,
    ghost: false,
    focused: true,
  },
};

export const Muted: Story = {
  args: {
    label: 'On, Normal, Muted',
    checked: true,
    indeterminate: false,
    disabled: false,
    muted: true,
    ghost: false,
    focused: false,
  },
};

export const Ghost: Story = {
  args: {
    label: 'On, Normal, Ghost',
    checked: true,
    indeterminate: false,
    disabled: false,
    muted: false,
    ghost: true,
    focused: false,
  },
};

export const Disabled: Story = {
  args: {
    label: 'On, Disabled',
    checked: true,
    indeterminate: false,
    disabled: true,
    muted: false,
    ghost: false,
    focused: false,
  },
};

export const WithDescription: Story = {
  args: {
    label: 'On, Normal',
    description: 'Helpful description of the setting which may briefly highlight side effects or conditions of the setting.',
    checked: true,
    indeterminate: false,
    disabled: false,
    muted: false,
    ghost: false,
    focused: false,
  },
};

/* ===== ALL VARIANTS ===== */
export const AllStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <h3 style={{ fontSize: '13px', fontWeight: 550, margin: 0 }}>Checked</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', paddingLeft: '8px' }}>
          <Checkbox label="On, Normal" checked />
          <Checkbox label="On, Normal, Muted" checked muted />
          <Checkbox label="On, Normal, Ghost" checked ghost />
          <Checkbox label="On, Focused" checked focused />
          <Checkbox label="On, Focused, Muted" checked focused muted />
          <Checkbox label="On, Focused, Ghost" checked focused ghost />
          <Checkbox label="On, Disabled" checked disabled />
        </div>
      </div>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <h3 style={{ fontSize: '13px', fontWeight: 550, margin: 0 }}>Unchecked</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', paddingLeft: '8px' }}>
          <Checkbox label="Off, Normal + Muted" muted />
          <Checkbox label="Off, Normal, Ghost" ghost />
          <Checkbox label="Off, Focused, Ghost" focused ghost />
          <Checkbox label="Off, Focused + Muted" focused />
          <Checkbox label="Off, Disabled + Muted" disabled />
        </div>
    </div>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <h3 style={{ fontSize: '13px', fontWeight: 550, margin: 0 }}>Mixed (Indeterminate)</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', paddingLeft: '8px' }}>
          <Checkbox label="Mixed, Normal" indeterminate />
          <Checkbox label="Mixed, Normal, Muted" indeterminate muted />
          <Checkbox label="Mixed, Normal, Ghost" indeterminate ghost />
          <Checkbox label="Mixed, Focused" indeterminate focused />
          <Checkbox label="Mixed, Focused, Ghost" indeterminate focused ghost />
          <Checkbox label="Mixed, Focused, Muted" indeterminate focused muted />
          <Checkbox label="Mixed, Disabled" indeterminate disabled />
        </div>
      </div>
    </div>
  ),
};
