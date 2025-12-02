// packages/docs/stories/utils/iconSelector.tsx
import React from 'react';
import * as Icons from '@figkit/ui';
import type { ComponentType } from 'react';

// Get all icon components
const iconEntries = Object.entries(Icons).filter(([name]) => name.endsWith('Icon')) as [
  string,
  ComponentType<any>
][];

// Create a map of icon names to components for easy lookup
export const iconMap = new Map<string, ComponentType<any>>();
iconEntries.forEach(([name, Icon]) => {
  iconMap.set(name, Icon);
});

// Get all icon names - ensure it's always an array
export const iconNames: string[] = iconEntries.map(([name]) => name).sort();

// Get icon options array for Storybook controls
export function getIconOptions(): string[] {
  const validIconNames = Array.isArray(iconNames) && iconNames.length > 0 ? iconNames : [];
  const fallbackIcons = ['CheckIcon', 'PlusIcon', 'MinusIcon', 'CloseIcon', 'ArrowIcon', 'SearchIcon', 'SettingsIcon', 'TrashIcon'];
  const allOptions = validIconNames.length > 0 ? validIconNames : fallbackIcons;
  return ['', ...allOptions];
}

// Debug: Log icon names count
console.log('[iconSelector] Total icons found:', iconNames.length);
console.log('[iconSelector] Sample icons:', iconNames.slice(0, 10));
if (typeof window !== 'undefined') {
  console.log('[iconSelector] Browser: iconNames loaded:', iconNames.length, 'icons');
}

// Get icon component by name
export function getIconByName(name: string): ComponentType<any> | null {
  return iconMap.get(name) || null;
}

// Icon selector component for Storybook controls
export function IconSelector({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState<string>('All');

  // Filter icons by search term
  const filteredIcons = iconNames.filter(name => 
    name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Group icons by category
  const categorizedIcons: Record<string, string[]> = {
    'All': filteredIcons,
    'Navigation': filteredIcons.filter(name => 
      name.toLowerCase().includes('navigate') || 
      name.toLowerCase().includes('chevron') || 
      name.toLowerCase().includes('arrow')
    ),
    'Actions': filteredIcons.filter(name => 
      name.toLowerCase().includes('plus') || 
      name.toLowerCase().includes('minus') || 
      name.toLowerCase().includes('close') || 
      name.toLowerCase().includes('delete') || 
      name.toLowerCase().includes('edit') ||
      name.toLowerCase().includes('check')
    ),
    'Media': filteredIcons.filter(name => 
      name.toLowerCase().includes('play') || 
      name.toLowerCase().includes('pause') || 
      name.toLowerCase().includes('volume') || 
      name.toLowerCase().includes('image') || 
      name.toLowerCase().includes('video')
    ),
    'Communication': filteredIcons.filter(name => 
      name.toLowerCase().includes('message') || 
      name.toLowerCase().includes('comment') || 
      name.toLowerCase().includes('share') || 
      name.toLowerCase().includes('mail')
    ),
    'Files': filteredIcons.filter(name => 
      name.toLowerCase().includes('file') || 
      name.toLowerCase().includes('folder') || 
      name.toLowerCase().includes('download') || 
      name.toLowerCase().includes('upload')
    ),
    'Interface': filteredIcons.filter(name => 
      name.toLowerCase().includes('search') || 
      name.toLowerCase().includes('filter') || 
      name.toLowerCase().includes('settings') || 
      name.toLowerCase().includes('menu') || 
      name.toLowerCase().includes('more')
    ),
  };

  const displayIcons = categorizedIcons[selectedCategory] || categorizedIcons['All'];

  return (
    <div style={{ 
      border: '1px solid var(--color-border-default, #e6e6e6)',
      borderRadius: '8px',
      padding: '16px',
      backgroundColor: 'var(--color-bg-default, #ffffff)',
      maxHeight: '400px',
      overflow: 'auto'
    }}>
      {/* Search input */}
      <input
        type="text"
        placeholder="Search icons..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          width: '100%',
          padding: '8px 12px',
          border: '1px solid var(--color-border-default, #e6e6e6)',
          borderRadius: '4px',
          marginBottom: '12px',
          fontSize: '14px',
          fontFamily: 'var(--body-medium-fontFamily, Inter)',
        }}
      />

      {/* Category tabs */}
      <div style={{ 
        display: 'flex', 
        gap: '8px', 
        marginBottom: '16px',
        flexWrap: 'wrap'
      }}>
        {Object.keys(categorizedIcons).map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            style={{
              padding: '6px 12px',
              border: '1px solid var(--color-border-default, #e6e6e6)',
              borderRadius: '4px',
              backgroundColor: selectedCategory === category 
                ? 'var(--color-bg-brand-default, #0d99ff)' 
                : 'transparent',
              color: selectedCategory === category 
                ? 'var(--color-text-onbrand, #ffffff)' 
                : 'var(--color-text-default, rgba(0, 0, 0, 0.9))',
              cursor: 'pointer',
              fontSize: '12px',
              fontFamily: 'var(--body-medium-fontFamily, Inter)',
            }}
          >
            {category} ({categorizedIcons[category].length})
          </button>
        ))}
      </div>

      {/* Icon grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))',
        gap: '8px',
      }}>
        {displayIcons.map(iconName => {
          const Icon = getIconByName(iconName);
          if (!Icon) return null;

          const isSelected = value === iconName;

          return (
            <button
              key={iconName}
              onClick={() => onChange(iconName)}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '4px',
                padding: '12px 8px',
                border: `1px solid ${isSelected ? 'var(--color-bg-brand-default, #0d99ff)' : 'var(--color-border-default, #e6e6e6)'}`,
                borderRadius: '4px',
                backgroundColor: isSelected 
                  ? 'var(--color-bg-brand-tertiary, #e5f4ff)' 
                  : 'transparent',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
              title={iconName}
            >
              <Icon size={20} color="var(--color-icon-default, rgba(0, 0, 0, 0.9))" />
              <span style={{
                fontSize: '10px',
                color: 'var(--color-text-secondary, rgba(0, 0, 0, 0.5))',
                textAlign: 'center',
                wordBreak: 'break-word',
                maxWidth: '100%',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}>
                {iconName.replace('Icon', '')}
              </span>
            </button>
          );
        })}
      </div>

      {displayIcons.length === 0 && (
        <div style={{
          textAlign: 'center',
          padding: '32px',
          color: 'var(--color-text-secondary, rgba(0, 0, 0, 0.5))',
        }}>
          No icons found matching "{searchTerm}"
        </div>
      )}
    </div>
  );
}

// Helper to create icon argType for Storybook with visual icon picker
export function createIconArgType() {
  const controlOptions = getIconOptions();
  const validIconNames = Array.isArray(iconNames) && iconNames.length > 0 ? iconNames : [];
  const fallbackIcons = ['CheckIcon', 'PlusIcon', 'MinusIcon', 'CloseIcon', 'ArrowIcon', 'SearchIcon', 'SettingsIcon', 'TrashIcon'];
  
  console.log('[createIconArgType] options length:', controlOptions.length);
  console.log('[createIconArgType] validIconNames length:', validIconNames.length);
  console.log('[createIconArgType] First 10 options:', controlOptions.slice(0, 10));
  
  // Match the exact format used in Button.stories.tsx for other selects
  // Storybook expects options at the top level when using control: 'select'
  return {
    control: 'select',
    options: controlOptions,
    table: {
      type: {
        summary: 'Icon from repository',
        detail: `Select from ${validIconNames.length || fallbackIcons.length} available icons.`,
      },
    },
  };
}

// Export IconPickerControl for use in custom controls
export { IconPickerControl } from './IconPickerControl';

// Enhanced icon argType with visual preview
export function createVisualIconArgType() {
  return {
    control: {
      type: 'select',
      options: ['', ...iconNames],
    },
    table: {
      type: {
        summary: 'Icon from repository',
        detail: `Select from ${iconNames.length} available icons`,
      },
    },
    // Custom render function for visual icon preview
    if: { arg: 'iconLead', eq: true },
  };
}

// Helper to render icon from name
export function renderIcon(iconName: string | null | undefined, props?: any) {
  if (!iconName) return null;
  const Icon = getIconByName(iconName);
  if (!Icon) return null;
  // Icons will inherit color from button via CSS currentColor
  return React.createElement(Icon, { size: 24, color: 'currentColor', ...props });
}

