import type { Meta, StoryObj } from '@storybook/react-vite';
import React, { useMemo } from 'react';
import { useTokens } from './useTokens';

const meta = {
  title: 'Foundations/Spacing',
  component: () => null,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Spacing tokens for consistent spacing throughout the design system. All values extracted from Figma.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;


function extractSpacingTokens(tokens: any) {
  const spacing: Array<{ name: string; value: string; token: string; pixels: number }> = [];

  // Handle nested space object (space.0, space.1, etc.)
  if (tokens.space && typeof tokens.space === 'object') {
    Object.entries(tokens.space).forEach(([key, token]: [string, any]) => {
      const value = token?.value;
      if (!value) return;

      const numValue = typeof value === 'string' ? parseFloat(value.replace('px', '')) : value;
      spacing.push({
        name: `space-${key}`,
        value: String(value),
        token: `space.${key}`,
        pixels: numValue,
      });
    });
  }

  // Also check for space.* keys at root level
  Object.entries(tokens).forEach(([key, token]: [string, any]) => {
    if (key === 'space') return; // Already handled above
    
    if (!key.includes('space') && !key.includes('spacing') && !key.includes('gap') && !key.includes('padding') && !key.includes('margin')) {
      return;
    }

    const value = token?.value;
    if (!value) return;

    const numValue = typeof value === 'string' ? parseFloat(value.replace('px', '')) : value;
    spacing.push({
      name: key.replace(/^(space|spacing|gap|padding|margin)\.?/, ''),
      value: String(value),
      token: key,
      pixels: numValue,
    });
  });

  return spacing.sort((a, b) => a.pixels - b.pixels);
}

function SpacingSwatch({ name, value, token, pixels }: { name: string; value: string; token: string; pixels: number }) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        padding: '16px',
        border: '1px solid var(--color-border-default, #e6e6e6)',
        borderRadius: '8px',
        backgroundColor: 'var(--color-bg-default, #ffffff)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div
          style={{
            width: `${pixels}px`,
            height: '40px',
            backgroundColor: 'var(--color-bg-brand, #0d99ff)',
            borderRadius: '4px',
            minWidth: '4px',
          }}
        />
        <div style={{ flex: 1 }}>
          <div
            style={{
              fontSize: '12px',
              fontWeight: 600,
              color: 'var(--color-text-default, rgba(0, 0, 0, 0.9))',
              marginBottom: '4px',
            }}
          >
            {name || token}
          </div>
          <div
            style={{
              fontSize: '11px',
              fontFamily: 'monospace',
              color: 'var(--color-text-secondary, rgba(0, 0, 0, 0.5))',
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
    </div>
  );
}

export const SpacingScale: Story = {
  render: () => {
    const { brand, theme, tokens, loading } = useTokens();
    const spacing = useMemo(() => extractSpacingTokens(tokens), [tokens]);

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
            Spacing - {brand.charAt(0).toUpperCase() + brand.slice(1)} ({theme})
          </h2>
          <p style={{ color: 'var(--color-text-secondary, rgba(0, 0, 0, 0.5))', fontSize: '14px' }}>
            Spacing tokens from Figma design system. Use these values for consistent spacing throughout your designs.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '16px',
          }}
        >
          {spacing.map((space) => (
            <SpacingSwatch key={space.token} {...space} />
          ))}
        </div>
      </div>
    );
  },
};

