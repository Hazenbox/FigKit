import type { Meta, StoryObj } from '@storybook/react-vite';
import React, { useMemo } from 'react';
import { useTokens } from './useTokens';

const meta = {
  title: 'Foundations/Colors',
  component: () => null,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Color tokens organized by brand and theme. All values extracted from Figma design tokens.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;


function groupColorsByCategory(tokens: any) {
  const categories: Record<string, Array<{ name: string; value: string; token: string }>> = {
    'Text': [],
    'Icon': [],
    'Background': [],
    'Border': [],
    'Brand': [],
    'Semantic': [],
    'Other': [],
  };

  Object.entries(tokens).forEach(([key, token]: [string, any]) => {
    if (!key.startsWith('color.') || !token?.value) return;

    const value = typeof token.value === 'string' ? token.value : JSON.stringify(token.value);
    const parts = key.split('.');
    const category = parts[1]; // color.text, color.bg, etc.

    const entry = { name: key.replace('color.', ''), value, token: key };

    if (category === 'text') {
      categories['Text'].push(entry);
    } else if (category === 'icon') {
      categories['Icon'].push(entry);
    } else if (category === 'bg') {
      categories['Background'].push(entry);
    } else if (category === 'border') {
      categories['Border'].push(entry);
    } else if (category === 'brand' || category === 'figjam' || category === 'assistive') {
      categories['Brand'].push(entry);
    } else if (category === 'danger' || category === 'warning' || category === 'success') {
      categories['Semantic'].push(entry);
    } else {
      categories['Other'].push(entry);
    }
  });

  return categories;
}

function ColorSwatch({ name, value, token }: { name: string; value: string; token: string }) {
  const isRgba = value.startsWith('rgba');
  const isHex = value.startsWith('#');
  const bgColor = value;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        padding: '16px',
        border: '1px solid var(--color-border-default, #e6e6e6)',
        borderRadius: '8px',
        backgroundColor: 'var(--color-bg-default, #ffffff)',
      }}
    >
      <div
        style={{
          width: '100%',
          height: '80px',
          backgroundColor: bgColor,
          borderRadius: '4px',
          border: '1px solid var(--color-border-default, #e6e6e6)',
        }}
      />
      <div>
        <div
          style={{
            fontSize: '12px',
            fontWeight: 600,
            color: 'var(--color-text-default, rgba(0, 0, 0, 0.9))',
            marginBottom: '4px',
          }}
        >
          {name}
        </div>
        <div
          style={{
            fontSize: '11px',
            fontFamily: 'monospace',
            color: 'var(--color-text-secondary, rgba(0, 0, 0, 0.5))',
            marginBottom: '2px',
          }}
        >
          {value}
        </div>
        <div
          style={{
            fontSize: '10px',
            color: 'var(--color-text-tertiary, rgba(0, 0, 0, 0.3))',
          }}
        >
          {token}
        </div>
      </div>
    </div>
  );
}

export const AllColors: Story = {
  render: () => {
    const { brand, theme, tokens, loading } = useTokens();
    const categories = useMemo(() => groupColorsByCategory(tokens), [tokens]);

    if (loading) {
      return (
        <div style={{ padding: '24px', textAlign: 'center' }}>
          Loading tokens...
        </div>
      );
    }

    return (
      <div style={{ padding: '24px' }}>
        <div style={{ marginBottom: '32px' }}>
          <h2 style={{ marginBottom: '8px', fontSize: '24px', fontWeight: 600 }}>
            Colors - {brand.charAt(0).toUpperCase() + brand.slice(1)} ({theme})
          </h2>
          <p style={{ color: 'var(--color-text-secondary, rgba(0, 0, 0, 0.5))', fontSize: '14px' }}>
            All color tokens from Figma design system. Switch brand and theme using the toolbar controls.
          </p>
        </div>

        {Object.entries(categories).map(([category, colors]) => {
          if (colors.length === 0) return null;

          return (
            <div key={category} style={{ marginBottom: '48px' }}>
              <h3
                style={{
                  marginBottom: '16px',
                  fontSize: '18px',
                  fontWeight: 600,
                  color: 'var(--color-text-default, rgba(0, 0, 0, 0.9))',
                }}
              >
                {category} ({colors.length})
              </h3>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                  gap: '16px',
                }}
              >
                {colors.map((color) => (
                  <ColorSwatch key={color.token} {...color} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    );
  },
};

