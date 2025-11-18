// packages/docs/stories/utils/IconPickerControl.tsx
// Custom Storybook control component for visual icon selection
import React, { useState, useMemo } from 'react';
import { getIconByName, iconNames } from './iconSelector';

interface IconPickerControlProps {
  value: string;
  onChange: (value: string) => void;
  argType?: any;
}

export function IconPickerControl({ value, onChange }: IconPickerControlProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Filter icons by search term
  const filteredIcons = useMemo(() => {
    return iconNames.filter(name => 
      name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  // Group icons by category
  const categorizedIcons = useMemo(() => {
    const categories: Record<string, string[]> = {
      'All': filteredIcons,
      'Common': filteredIcons.filter(name => 
        ['CheckIcon', 'PlusIcon', 'MinusIcon', 'CloseIcon', 'ArrowRightIcon', 
         'ArrowLeftIcon', 'SearchIcon', 'FilterIcon', 'SettingsIcon'].includes(name)
      ),
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

    // Remove empty categories
    Object.keys(categories).forEach(key => {
      if (categories[key].length === 0) {
        delete categories[key];
      }
    });

    return categories;
  }, [filteredIcons]);

  const displayIcons = categorizedIcons[selectedCategory] || categorizedIcons['All'] || [];
  const selectedIcon = value ? getIconByName(value) : null;

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      {/* Dropdown trigger button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '8px 12px',
          border: '1px solid var(--color-border-default, #e6e6e6)',
          borderRadius: '4px',
          backgroundColor: 'var(--color-bg-default, #ffffff)',
          cursor: 'pointer',
          fontSize: '14px',
          fontFamily: 'var(--body-medium-fontFamily, Inter)',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {selectedIcon ? (
            <>
              <selectedIcon size={16} color="var(--color-icon-default, rgba(0, 0, 0, 0.9))" />
              <span>{value.replace('Icon', '')}</span>
            </>
          ) : (
            <span style={{ color: 'var(--color-text-secondary, rgba(0, 0, 0, 0.5))' }}>
              Select an icon...
            </span>
          )}
        </div>
        <span style={{ fontSize: '12px', color: 'var(--color-text-secondary, rgba(0, 0, 0, 0.5))' }}>
          {isOpen ? '▲' : '▼'}
        </span>
      </button>

      {/* Dropdown panel */}
      {isOpen && (
        <>
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 9998,
            }}
            onClick={() => setIsOpen(false)}
          />
          <div
            style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              right: 0,
              marginTop: '4px',
              border: '1px solid var(--color-border-default, #e6e6e6)',
              borderRadius: '8px',
              padding: '16px',
              backgroundColor: 'var(--color-bg-default, #ffffff)',
              maxHeight: '400px',
              overflow: 'auto',
              zIndex: 9999,
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            }}
          >
            {/* Search input */}
            <input
              type="text"
              placeholder="Search icons..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onClick={(e) => e.stopPropagation()}
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
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedCategory(category);
                  }}
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
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onChange(iconName);
                      setIsOpen(false);
                    }}
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
        </>
      )}
    </div>
  );
}

