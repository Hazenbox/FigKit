import type { Meta, StoryObj } from '@storybook/react-vite';
import { useTokens } from './useTokens';
import React, { useMemo } from 'react';


const meta = {
  title: 'Foundations/Dimensions',
  component: () => null,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Dimension tokens for consistent sizing. All values extracted from Figma.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;


function extractDimensionTokens(tokens: any) {
  const dimensions: Array<{ name: string; value: string; token: string; pixels?: number }> = [];

  Object.entries(tokens).forEach(([key, token]: [string, any]) => {
    if (
      !key.includes('size') &&
      !key.includes('dimension') &&
      !key.includes('width') &&
      !key.includes('height') &&
      !key.includes('min') &&
      !key.includes('max')
    ) {
      return;
    }

    // Skip if it's a color or other non-dimension token
    if (key.includes('color') || key.includes('font') || key.includes('space') || key.includes('radius')) {
      return;
    }

    const value = token?.value;
    if (!value) return;

    const strValue = typeof value === 'string' ? value : JSON.stringify(value);
    const numValue = typeof value === 'number' ? value : parseFloat(strValue.replace('px', ''));

    dimensions.push({
      name: key,
      value: strValue,
      token: key,
      pixels: isNaN(numValue) ? undefined : numValue,
    });
  });

  return dimensions.sort((a, b) => {
    if (a.pixels && b.pixels) return a.pixels - b.pixels;
    return a.name.localeCompare(b.name);
  });
}

function DimensionSwatch({ name, value, token, pixels }: { name: string; value: string; token: string; pixels?: number }) {
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
      {pixels !== undefined && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div
            style={{
              width: `${Math.min(pixels, 200)}px`,
              height: '40px',
              backgroundColor: 'var(--color-bg-brand, #0d99ff)',
              borderRadius: '4px',
              minWidth: '4px',
            }}
          />
          <div
            style={{
              fontSize: '12px',
              fontWeight: 600,
              color: 'var(--color-text-default, rgba(0, 0, 0, 0.9))',
            }}
          >
            {pixels}px
          </div>
        </div>
      )}
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

export const DimensionScale: Story = {
  render: () => {
    const { brand, theme, tokens, loading } = useTokens();

    const dimensions = useMemo(() => extractDimensionTokens(tokens), [tokens]);

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
            Dimensions - {brand.charAt(0).toUpperCase() + brand.slice(1)} ({theme})
          </h2>
          <p style={{ color: 'var(--color-text-secondary, rgba(0, 0, 0, 0.5))', fontSize: '14px' }}>
            Dimension tokens from Figma design system.
          </p>
        </div>

        {dimensions.length > 0 ? (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: '16px',
            }}
          >
            {dimensions.map((dim) => (
              <DimensionSwatch key={dim.token} {...dim} />
            ))}
          </div>
        ) : (
          <div
            style={{
              padding: '24px',
              textAlign: 'center',
              color: 'var(--color-text-secondary, rgba(0, 0, 0, 0.5))',
            }}
          >
            No dimension tokens found in this brand/theme combination.
          </div>
        )}
      </div>
    );
  },
};

