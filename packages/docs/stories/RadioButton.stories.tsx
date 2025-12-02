import type { Meta, StoryObj } from '@storybook/react-vite';
import { RadioButton } from '@figkit/ui';
import React from 'react';

const meta = {
  title: 'Components/RadioButton',
  component: RadioButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['input', 'button'],
    },
    state: {
      control: 'select',
      options: ['default', 'active', 'focused', 'disabled'],
    },
    checked: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
    label: {
      control: 'text',
    },
  },
} satisfies Meta<typeof RadioButton>;

export default meta;
type Story = StoryObj<typeof meta>;

/* ===== INPUT VARIANT ===== */
export const InputDefault: Story = {
  args: {
    variant: 'input',
    state: 'default',
    checked: false,
    disabled: false,
  },
};

export const InputChecked: Story = {
  args: {
    variant: 'input',
    state: 'default',
    checked: true,
    disabled: false,
  },
};

export const InputFocusedUnchecked: Story = {
  args: {
    variant: 'input',
    state: 'focused',
    checked: false,
    disabled: false,
  },
};

export const InputFocusedChecked: Story = {
  args: {
    variant: 'input',
    state: 'focused',
    checked: true,
    disabled: false,
  },
};

export const InputDisabled: Story = {
  args: {
    variant: 'input',
    state: 'disabled',
    checked: false,
    disabled: true,
  },
};

/* ===== INPUT VARIANT WITH LABEL ===== */
export const InputWithLabelUnchecked: Story = {
  args: {
    variant: 'input',
    state: 'default',
    checked: false,
    label: 'Off, Normal',
    disabled: false,
  },
};

export const InputWithLabelChecked: Story = {
  args: {
    variant: 'input',
    state: 'default',
    checked: true,
    label: 'On, Normal',
    disabled: false,
  },
};

export const InputWithLabelFocusedUnchecked: Story = {
  args: {
    variant: 'input',
    state: 'focused',
    checked: false,
    label: 'Off, Focused',
    disabled: false,
  },
};

export const InputWithLabelFocusedChecked: Story = {
  args: {
    variant: 'input',
    state: 'focused',
    checked: true,
    label: 'On, Focused',
    disabled: false,
  },
};

/* ===== BUTTON VARIANT ===== */
export const ButtonDefault: Story = {
  args: {
    variant: 'button',
    state: 'default',
    checked: false,
    label: 'Label',
    disabled: false,
  },
};

export const ButtonActive: Story = {
  args: {
    variant: 'button',
    state: 'active',
    checked: true,
    label: 'Label',
    disabled: false,
  },
};

export const ButtonFocused: Story = {
  args: {
    variant: 'button',
    state: 'focused',
    checked: false,
    label: 'Label',
    disabled: false,
  },
};

export const ButtonDisabled: Story = {
  args: {
    variant: 'button',
    state: 'disabled',
    checked: false,
    label: 'Label',
    disabled: true,
  },
};

/* ===== ALL STATES SHOWCASE ===== */
export const AllInputStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '200px' }}>
      <div>
        <label style={{ display: 'block', marginBottom: '4px', fontSize: '11px' }}>Default Unchecked</label>
        <RadioButton variant="input" state="default" checked={false} />
      </div>
      <div>
        <label style={{ display: 'block', marginBottom: '4px', fontSize: '11px' }}>Default Checked</label>
        <RadioButton variant="input" state="default" checked={true} />
      </div>
      <div>
        <label style={{ display: 'block', marginBottom: '4px', fontSize: '11px' }}>Focused Unchecked</label>
        <RadioButton variant="input" state="focused" checked={false} />
      </div>
      <div>
        <label style={{ display: 'block', marginBottom: '4px', fontSize: '11px' }}>Focused Checked</label>
        <RadioButton variant="input" state="focused" checked={true} />
      </div>
      <div>
        <label style={{ display: 'block', marginBottom: '4px', fontSize: '11px' }}>Disabled</label>
        <RadioButton variant="input" state="disabled" checked={false} disabled />
      </div>
    </div>
  ),
};

export const AllButtonStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '200px' }}>
      <div>
        <label style={{ display: 'block', marginBottom: '4px', fontSize: '11px' }}>Default</label>
        <RadioButton variant="button" state="default" checked={false} label="Label" />
      </div>
      <div>
        <label style={{ display: 'block', marginBottom: '4px', fontSize: '11px' }}>Active</label>
        <RadioButton variant="button" state="active" checked={true} label="Label" />
      </div>
      <div>
        <label style={{ display: 'block', marginBottom: '4px', fontSize: '11px' }}>Focused</label>
        <RadioButton variant="button" state="focused" checked={false} label="Label" />
      </div>
      <div>
        <label style={{ display: 'block', marginBottom: '4px', fontSize: '11px' }}>Disabled</label>
        <RadioButton variant="button" state="disabled" checked={false} label="Label" disabled />
      </div>
    </div>
  ),
};

/* ===== RADIO GROUP EXAMPLE ===== */
export const RadioGroup: Story = {
  render: () => {
    const [selected, setSelected] = React.useState('option1');
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '200px' }}>
        <RadioButton
          variant="input"
          name="group1"
          value="option1"
          checked={selected === 'option1'}
          onChange={(e) => setSelected(e.target.value)}
          label="Option 1"
        />
        <RadioButton
          variant="input"
          name="group1"
          value="option2"
          checked={selected === 'option2'}
          onChange={(e) => setSelected(e.target.value)}
          label="Option 2"
        />
        <RadioButton
          variant="input"
          name="group1"
          value="option3"
          checked={selected === 'option3'}
          onChange={(e) => setSelected(e.target.value)}
          label="Option 3"
        />
      </div>
    );
  },
};

