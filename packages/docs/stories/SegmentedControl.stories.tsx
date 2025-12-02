import type { Meta, StoryObj } from '@storybook/react-vite';
import { SegmentedControl } from '@figkit/ui';
import React from 'react';
import { renderIcon, createIconArgType, getIconOptions } from './utils/iconSelector';

const meta = {
  title: 'Components/SegmentedControl',
  component: SegmentedControl,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['icon', 'label'],
    },
    state: {
      control: 'select',
      options: ['default', 'disabled'],
    },
    value: {
      control: 'text',
    },
    disabled: {
      control: 'boolean',
    },
    // Dynamic icon controls for each segment
    segment1Icon: {
      ...createIconArgType(),
      description: 'Icon for segment 1 (icon variant only)',
    },
    segment2Icon: {
      ...createIconArgType(),
      description: 'Icon for segment 2 (icon variant only)',
    },
    segment3Icon: {
      ...createIconArgType(),
      description: 'Icon for segment 3 (icon variant only)',
    },
    segment4Icon: {
      ...createIconArgType(),
      description: 'Icon for segment 4 (icon variant only)',
    },
    segment5Icon: {
      ...createIconArgType(),
      description: 'Icon for segment 5 (icon variant only)',
    },
    segment6Icon: {
      ...createIconArgType(),
      description: 'Icon for segment 6 (icon variant only)',
    },
    // Dynamic label controls for each segment
    segment1Label: {
      control: 'text',
      description: 'Label for segment 1 (label variant only)',
    },
    segment2Label: {
      control: 'text',
      description: 'Label for segment 2 (label variant only)',
    },
    segment3Label: {
      control: 'text',
      description: 'Label for segment 3 (label variant only)',
    },
    segment4Label: {
      control: 'text',
      description: 'Label for segment 4 (label variant only)',
    },
    segment5Label: {
      control: 'text',
      description: 'Label for segment 5 (label variant only)',
    },
    segment6Label: {
      control: 'text',
      description: 'Label for segment 6 (label variant only)',
    },
    segmentCount: {
      control: { type: 'number', min: 2, max: 6, step: 1 },
      description: 'Number of segments',
      defaultValue: 2,
    },
  },
} satisfies Meta<typeof SegmentedControl>;

export default meta;
type Story = StoryObj<typeof meta>;

export const IconVariant: Story = {
  args: {
    variant: 'icon',
    segments: [
      { id: '1', icon: renderIcon('MinusIcon') },
      { id: '2', icon: renderIcon('PlusIcon') },
    ],
    defaultValue: '1',
  },
};

export const IconVariantThreeSegments: Story = {
  args: {
    variant: 'icon',
    segments: [
      { id: '1', icon: renderIcon('MinusIcon') },
      { id: '2', icon: renderIcon('CheckIcon') },
      { id: '3', icon: renderIcon('CloseIcon') },
    ],
    defaultValue: '1',
  },
};

export const IconVariantFourSegments: Story = {
  args: {
    variant: 'icon',
    segments: [
      { id: '1', icon: renderIcon('SearchSmallIcon') },
      { id: '2', icon: renderIcon('CheckIcon') },
      { id: '3', icon: renderIcon('ChevronDownIcon') },
      { id: '4', icon: renderIcon('CloseIcon') },
    ],
    defaultValue: '1',
  },
};

export const LabelVariant: Story = {
  args: {
    variant: 'label',
    segments: [
      { id: '1', label: 'Label' },
      { id: '2', label: 'Label' },
    ],
    defaultValue: '1',
  },
};

export const LabelVariantThreeSegments: Story = {
  args: {
    variant: 'label',
    segments: [
      { id: '1', label: 'Left' },
      { id: '2', label: 'Center' },
      { id: '3', label: 'Right' },
    ],
    defaultValue: '1',
  },
};

export const LabelVariantFourSegments: Story = {
  args: {
    variant: 'label',
    segments: [
      { id: '1', label: 'Left' },
      { id: '2', label: 'Center' },
      { id: '3', label: 'Right' },
      { id: '4', label: 'Justify' },
    ],
    defaultValue: '1',
  },
};

export const Disabled: Story = {
  args: {
    variant: 'icon',
    state: 'disabled',
    segments: [
      { id: '1', icon: renderIcon('MinusIcon') },
      { id: '2', icon: renderIcon('PlusIcon') },
      { id: '3', icon: renderIcon('CheckIcon') },
    ],
    defaultValue: '1',
  },
};

export const WithIndividualDisabledSegments: Story = {
  args: {
    variant: 'icon',
    segments: [
      { id: '1', icon: renderIcon('MinusIcon') },
      { id: '2', icon: renderIcon('PlusIcon'), disabled: true },
      { id: '3', icon: renderIcon('CheckIcon') },
    ],
    defaultValue: '1',
  },
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = React.useState('1');
    return (
      <SegmentedControl
        variant="icon"
        segments={[
          { id: '1', icon: renderIcon('MinusIcon') },
          { id: '2', icon: renderIcon('PlusIcon') },
          { id: '3', icon: renderIcon('CheckIcon') },
        ]}
        value={value}
        onChange={setValue}
      />
    );
  },
};

// Interactive story with dynamic icon/label selection
export const Interactive: Story = {
  render: (args: any) => {
    const segmentCount = args.segmentCount || 2;
    const segments: any[] = [];
    
    for (let i = 1; i <= segmentCount; i++) {
      if (args.variant === 'icon') {
        const iconName = args[`segment${i}Icon`] as string | undefined;
        if (iconName) {
          segments.push({
            id: String(i),
            icon: renderIcon(iconName),
          });
        } else {
          // Fallback icons
          const fallbackIcons = ['MinusIcon', 'PlusIcon', 'CheckIcon', 'CloseIcon', 'SearchIcon', 'SettingsIcon'];
          segments.push({
            id: String(i),
            icon: renderIcon(fallbackIcons[i - 1] || 'MinusIcon'),
          });
        }
      } else {
        const label = args[`segment${i}Label`] as string | undefined;
        segments.push({
          id: String(i),
          label: label || `Label ${i}`,
        });
      }
    }
    
    return (
      <SegmentedControl
        variant={args.variant || 'icon'}
        state={args.state || 'default'}
        segments={segments}
        defaultValue="1"
        disabled={args.disabled || false}
      />
    );
  },
  args: {
    variant: 'icon',
    state: 'default',
    disabled: false,
    segmentCount: 2,
    segment1Icon: 'MinusIcon',
    segment2Icon: 'PlusIcon',
    segment3Icon: 'CheckIcon',
    segment4Icon: 'CloseIcon',
    segment5Icon: 'SearchIcon',
    segment6Icon: 'SettingsIcon',
    segment1Label: 'Left',
    segment2Label: 'Center',
    segment3Label: 'Right',
    segment4Label: 'Justify',
    segment5Label: 'Label 5',
    segment6Label: 'Label 6',
  },
};

