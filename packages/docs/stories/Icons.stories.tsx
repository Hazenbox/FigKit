import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';
import * as Icons from '@figkit/ui';

const meta = {
  title: 'Foundations/Icons',
  component: () => null,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Icon repository - All 24x24 icons extracted from Figma. Icons are reusable React components that accept size and color props.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

// Get all icon components dynamically
const iconEntries = Object.entries(Icons).filter(([name]) => name.endsWith('Icon'));

// Group icons by category (based on name patterns)
function categorizeIcons(icons: [string, React.ComponentType<any>][]) {
  const categories: Record<string, [string, React.ComponentType<any>][]> = {
    'Navigation': [],
    'Actions': [],
    'Media': [],
    'Communication': [],
    'Files': [],
    'Interface': [],
    'Other': [],
  };

  icons.forEach(([name, Icon]) => {
    const lowerName = name.toLowerCase();
    if (lowerName.includes('navigate') || lowerName.includes('chevron') || lowerName.includes('arrow')) {
      categories['Navigation'].push([name, Icon]);
    } else if (lowerName.includes('plus') || lowerName.includes('minus') || lowerName.includes('close') || lowerName.includes('delete') || lowerName.includes('edit')) {
      categories['Actions'].push([name, Icon]);
    } else if (lowerName.includes('play') || lowerName.includes('pause') || lowerName.includes('volume') || lowerName.includes('image') || lowerName.includes('video')) {
      categories['Media'].push([name, Icon]);
    } else if (lowerName.includes('message') || lowerName.includes('comment') || lowerName.includes('share') || lowerName.includes('mail')) {
      categories['Communication'].push([name, Icon]);
    } else if (lowerName.includes('file') || lowerName.includes('folder') || lowerName.includes('download') || lowerName.includes('upload')) {
      categories['Files'].push([name, Icon]);
    } else if (lowerName.includes('search') || lowerName.includes('filter') || lowerName.includes('settings') || lowerName.includes('menu') || lowerName.includes('more')) {
      categories['Interface'].push([name, Icon]);
    } else {
      categories['Other'].push([name, Icon]);
    }
  });

  // Remove empty categories
  Object.keys(categories).forEach(key => {
    if (categories[key].length === 0) {
      delete categories[key];
    }
  });

  return categories;
}

const iconCategories = categorizeIcons(iconEntries);

export const AllIcons: Story = {
  render: () => {
    const style: React.CSSProperties = {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
      gap: '24px',
      padding: '24px',
    };

    const iconItemStyle: React.CSSProperties = {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '8px',
      padding: '16px',
      border: '1px solid var(--color-border-default, #e6e6e6)',
      borderRadius: '8px',
      backgroundColor: 'var(--color-bg-default, #ffffff)',
      transition: 'all 0.2s ease',
    };

    const iconNameStyle: React.CSSProperties = {
      fontSize: '11px',
      color: 'var(--color-text-secondary, rgba(0, 0, 0, 0.5))',
      textAlign: 'center',
      wordBreak: 'break-word',
      fontFamily: 'var(--body-medium-fontFamily, Inter)',
    };

    return (
      <div>
        <div style={{ marginBottom: '32px' }}>
          <h2 style={{ marginBottom: '8px', fontSize: '24px', fontWeight: 600 }}>Icon Repository</h2>
          <p style={{ color: 'var(--color-text-secondary, rgba(0, 0, 0, 0.5))', fontSize: '14px' }}>
            {iconEntries.length} icons available. All icons are 24x24 by default and accept size and color props.
          </p>
        </div>

        {Object.entries(iconCategories).map(([category, icons]) => (
          <div key={category} style={{ marginBottom: '48px' }}>
            <h3 style={{ 
              marginBottom: '16px', 
              fontSize: '18px', 
              fontWeight: 600,
              color: 'var(--color-text-default, rgba(0, 0, 0, 0.9))',
            }}>
              {category} ({icons.length})
            </h3>
            <div style={style}>
              {icons.map(([name, Icon]) => (
                <div key={name} style={iconItemStyle}>
                  <Icon size={24} color="var(--color-icon-default, rgba(0, 0, 0, 0.9))" />
                  <div style={iconNameStyle}>{name.replace('Icon', '')}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  },
};

export const IconSizes: Story = {
  render: () => {
    const sizes = [16, 20, 24, 32, 48];
    const exampleIcon = iconEntries[0]?.[1] || (() => null);

    return (
      <div style={{ padding: '24px' }}>
        <h3 style={{ marginBottom: '24px', fontSize: '18px', fontWeight: 600 }}>Icon Sizes</h3>
        <div style={{ display: 'flex', gap: '32px', alignItems: 'center', flexWrap: 'wrap' }}>
          {sizes.map(size => (
            <div key={size} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                width: '64px',
                height: '64px',
                border: '1px solid var(--color-border-default, #e6e6e6)',
                borderRadius: '8px',
                backgroundColor: 'var(--color-bg-secondary, #f5f5f5)',
              }}>
                {React.createElement(exampleIcon, { size, color: 'var(--color-icon-default, rgba(0, 0, 0, 0.9))' })}
              </div>
              <div style={{ fontSize: '12px', color: 'var(--color-text-secondary, rgba(0, 0, 0, 0.5))' }}>
                {size}px
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  },
};

export const IconColors: Story = {
  render: () => {
    const colors = [
      { name: 'Default', value: 'var(--color-icon-default, rgba(0, 0, 0, 0.9))' },
      { name: 'Secondary', value: 'var(--color-icon-secondary, rgba(0, 0, 0, 0.5))' },
      { name: 'Brand', value: 'var(--color-icon-brand, #007BE5)' },
      { name: 'Danger', value: 'var(--color-icon-danger, #F24822)' },
      { name: 'Success', value: 'var(--color-icon-success, #14AE5C)' },
      { name: 'Warning', value: 'var(--color-icon-warning, #FFCD29)' },
    ];
    const exampleIcon = iconEntries[0]?.[1] || (() => null);

    return (
      <div style={{ padding: '24px' }}>
        <h3 style={{ marginBottom: '24px', fontSize: '18px', fontWeight: 600 }}>Icon Colors</h3>
        <div style={{ display: 'flex', gap: '32px', alignItems: 'center', flexWrap: 'wrap' }}>
          {colors.map(({ name, value }) => (
            <div key={name} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                width: '64px',
                height: '64px',
                border: '1px solid var(--color-border-default, #e6e6e6)',
                borderRadius: '8px',
                backgroundColor: 'var(--color-bg-default, #ffffff)',
              }}>
                {React.createElement(exampleIcon, { size: 24, color: value })}
              </div>
              <div style={{ fontSize: '12px', color: 'var(--color-text-secondary, rgba(0, 0, 0, 0.5))' }}>
                {name}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  },
};

