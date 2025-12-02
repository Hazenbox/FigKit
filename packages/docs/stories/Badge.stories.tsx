import type { Meta, StoryObj } from '@storybook/react-vite';
import { Badge } from '@figkit/ui';
import { createIconArgType, renderIcon, iconNames, IconPickerControl } from './utils/iconSelector';

// Ensure iconNames is properly loaded
// iconNames should be an array of 471+ icon names
console.log('[Badge Stories] iconNames type:', Array.isArray(iconNames) ? 'array' : typeof iconNames);
console.log('[Badge Stories] iconNames length:', iconNames?.length || 0, 'icons');

// Create icon options array directly - ensure it's a plain array for Storybook
const iconOptions = Array.isArray(iconNames) && iconNames.length > 0 
  ? ['', ...iconNames] 
  : ['', 'CheckIcon', 'PlusIcon', 'MinusIcon', 'CloseIcon', 'ArrowRightIcon'];

console.log('[Badge Stories] iconOptions length:', iconOptions.length);
console.log('[Badge Stories] iconOptions is array:', Array.isArray(iconOptions));
console.log('[Badge Stories] iconOptions first 3:', iconOptions.slice(0, 3));

const meta = {
  title: 'Components/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'brand', 'component', 'danger', 'feedback', 'figjam', 'invert', 'selected', 'success', 'variable', 'variable-selected', 'warn', 'merged', 'archived', 'menu'],
    },
    strong: {
      control: 'boolean',
    },
    iconLead: {
      control: 'boolean',
      description: 'Enable to show icon selector dropdown',
    },
    icon: {
      control: {
        type: 'select',
        options: iconOptions,
      },
      description: `Select an icon from the icon repository (${iconNames?.length || iconOptions.length - 1} icons available). Enable "iconLead" toggle above to display the selected icon in the badge.`,
      table: {
        type: {
          summary: 'Icon from repository',
          detail: `Select from ${iconNames?.length || iconOptions.length - 1} available icons. Icon will only render when iconLead is enabled.`,
        },
        disable: false,
      },
    },
    disabled: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Default',
    variant: 'default',
    iconLead: false,
    icon: '',
  },
  render: (args) => (
    <Badge {...args} icon={args.iconLead && args.icon ? renderIcon(args.icon) : undefined}>
      {args.children}
    </Badge>
  ),
};

export const Brand: Story = {
  args: {
    children: 'Brand',
    variant: 'brand',
    iconLead: false,
    icon: '',
  },
  render: (args) => (
    <Badge {...args} icon={args.iconLead && args.icon ? renderIcon(args.icon) : undefined}>
      {args.children}
    </Badge>
  ),
};

export const Component: Story = {
  args: {
    children: 'Component',
    variant: 'component',
  },
};

export const Danger: Story = {
  args: {
    children: 'Danger',
    variant: 'danger',
  },
};

export const Feedback: Story = {
  args: {
    children: 'Feedback',
    variant: 'feedback',
  },
};

export const Figjam: Story = {
  args: {
    children: 'Figjam',
    variant: 'figjam',
  },
};

export const Invert: Story = {
  args: {
    children: 'Invert',
    variant: 'invert',
  },
};

export const Selected: Story = {
  args: {
    children: 'Selected',
    variant: 'selected',
  },
};

export const Success: Story = {
  args: {
    children: 'Success',
    variant: 'success',
  },
};

export const Variable: Story = {
  args: {
    children: 'Variable',
    variant: 'variable',
  },
};

export const VariableSelected: Story = {
  args: {
    children: 'Variable Selected',
    variant: 'variable-selected',
  },
};

export const Warn: Story = {
  args: {
    children: 'Warn',
    variant: 'warn',
  },
};

export const Merged: Story = {
  args: {
    children: 'Merged',
    variant: 'merged',
  },
};

export const Archived: Story = {
  args: {
    children: 'Archived',
    variant: 'archived',
  },
};

export const Menu: Story = {
  args: {
    children: 'Menu',
    variant: 'menu',
  },
};

export const Strong: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
      <Badge variant="default" strong>Default</Badge>
      <Badge variant="brand" strong>Brand</Badge>
      <Badge variant="component" strong>Component</Badge>
      <Badge variant="danger" strong>Danger</Badge>
      <Badge variant="success" strong>Success</Badge>
      <Badge variant="warn" strong>Warn</Badge>
      <Badge variant="figjam" strong>Figjam</Badge>
    </div>
  ),
};


export const WithIcons: Story = {
  render: () => {
    const commonIcons = ['CheckIcon', 'PlusIcon', 'MinusIcon', 'CloseIcon', 'ArrowRightIcon'].filter(name => 
      iconNames.includes(name)
    );
    
    return (
      <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
        {commonIcons.map(iconName => (
          <Badge 
            key={iconName} 
            variant="brand" 
            icon={renderIcon(iconName)} 
            iconLead
          >
            {iconName.replace('Icon', '')}
          </Badge>
        ))}
        <Badge variant="success" icon={renderIcon('CheckIcon')} iconLead>Success</Badge>
        <Badge variant="danger" icon={renderIcon('CloseIcon')} iconLead>Danger</Badge>
        <Badge variant="variable" icon={renderIcon('ArrowRightIcon')} iconLead>Variable</Badge>
      </div>
    );
  },
};

export const InteractiveIconSelector: Story = {
  args: {
    children: 'Badge with Icon',
    variant: 'brand',
    iconLead: true,
    icon: 'CheckIcon',
  },
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', alignItems: 'center' }}>
      <Badge {...args} icon={args.iconLead && args.icon ? renderIcon(args.icon) : undefined}>
        {args.children}
      </Badge>
      <div style={{ 
        padding: '16px', 
        border: '1px solid var(--color-border-default, #e6e6e6)',
        borderRadius: '8px',
        backgroundColor: 'var(--color-bg-secondary, #f5f5f5)',
        maxWidth: '600px',
        width: '100%',
      }}>
        <p style={{ 
          margin: '0 0 12px 0', 
          fontSize: '14px', 
          color: 'var(--color-text-default, rgba(0, 0, 0, 0.9))',
          fontWeight: 500,
        }}>
          💡 Tip: Use the controls panel on the right to select icons from the dropdown. 
          When <code style={{ padding: '2px 6px', backgroundColor: 'var(--color-bg-default, #ffffff)', borderRadius: '4px' }}>iconLead</code> is enabled, 
          the icon dropdown will appear with all {iconNames.length} available icons.
        </p>
        <p style={{ 
          margin: 0, 
          fontSize: '12px', 
          color: 'var(--color-text-secondary, rgba(0, 0, 0, 0.5))',
        }}>
          The dropdown shows icon names. Selected icons appear in the badge above.
        </p>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: `**Visual Icon Picker**: When \`iconLead\` is enabled in the controls panel, you'll see an icon dropdown with all ${iconNames.length} available icons from the icon repository. Select any icon to see it in the badge.`,
      },
    },
  },
};

export const Disabled: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
      <Badge variant="default" disabled>Default</Badge>
      <Badge variant="brand" disabled>Brand</Badge>
      <Badge variant="component" disabled>Component</Badge>
      <Badge variant="danger" disabled>Danger</Badge>
      <Badge variant="success" disabled>Success</Badge>
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
        <Badge variant="default">Default</Badge>
        <Badge variant="brand">Brand</Badge>
        <Badge variant="component">Component</Badge>
        <Badge variant="danger">Danger</Badge>
        <Badge variant="feedback">Feedback</Badge>
        <Badge variant="figjam">Figjam</Badge>
        <Badge variant="invert">Invert</Badge>
        <Badge variant="selected">Selected</Badge>
        <Badge variant="success">Success</Badge>
        <Badge variant="variable">Variable</Badge>
        <Badge variant="variable-selected">Variable Selected</Badge>
        <Badge variant="warn">Warn</Badge>
        <Badge variant="merged">Merged</Badge>
        <Badge variant="archived">Archived</Badge>
        <Badge variant="menu">Menu</Badge>
      </div>
      <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
        <Badge variant="default" strong>Default</Badge>
        <Badge variant="brand" strong>Brand</Badge>
        <Badge variant="component" strong>Component</Badge>
        <Badge variant="danger" strong>Danger</Badge>
        <Badge variant="success" strong>Success</Badge>
        <Badge variant="warn" strong>Warn</Badge>
        <Badge variant="figjam" strong>Figjam</Badge>
      </div>
    </div>
  ),
};

