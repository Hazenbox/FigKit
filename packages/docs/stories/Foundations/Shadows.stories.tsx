import type { Meta, StoryObj } from '@storybook/react-vite';
import { useTokens } from './useTokens';
import React, { useMemo } from 'react';


const meta = {
  title: 'Foundations/Shadows',
  component: () => null,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Shadow tokens for elevation and depth. All values extracted from Figma.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;


function extractShadowTokens(tokens: any) {
  const shadows: Array<{ name: string; value: string; token: string }> = [];

  Object.entries(tokens).forEach(([key, token]: [string, any]) => {
    if (!key.includes('shadow') && !key.includes('elevation') && !key.includes('effect')) {
      return;
    }

    const value = token?.value;
    if (!value) return;

    shadows.push({
      name: key.replace(/^(shadow|elevation|effect)\.?/, ''),
      value: typeof value === 'string' ? value : JSON.stringify(value),
      token: key,
    });
  });

  return shadows;
}

function ShadowSwatch({ name, value, token }: { name: string; value: string; token: string }) {
  // Try to parse shadow value
  let boxShadow = value;
  if (typeof value === 'string' && value.includes('rgba')) {
    // Assume it's a shadow value
    boxShadow = value;
  } else if (typeof value === 'object') {
    // Parse object shadow
    boxShadow = `${value.x || 0}px ${value.y || 0}px ${value.blur || 0}px ${value.spread || 0}px ${value.color || 'rgba(0,0,0,0.1)'}`;
  }

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
      <div
        style={{
          width: '100%',
          height: '100px',
          backgroundColor: 'var(--color-bg-secondary, #f5f5f5)',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: boxShadow,
        }}
      >
        <div
          style={{
            width: '80px',
            height: '80px',
            backgroundColor: 'var(--color-bg-default, #ffffff)',
            borderRadius: '4px',
          }}
        />
      </div>
      <div>
        <div
          style={{
            fontSize: '12px',
            fontWeight: 600,
            color: 'var(--color-text-default, rgba(0, 0, 0, 0.9))',
            marginBottom: '4px',
            textTransform: 'capitalize',
          }}
        >
          {name || token}
        </div>
        <div
          style={{
            fontSize: '11px',
            fontFamily: 'monospace',
            color: 'var(--color-text-secondary, rgba(0, 0, 0, 0.5))',
            marginBottom: '2px',
            wordBreak: 'break-word',
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

export const ShadowScale: Story = {
  render: () => {
    const { brand, theme, tokens, loading } = useTokens();

    const shadows = useMemo(() => extractShadowTokens(tokens), [tokens]);

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
            Shadows - {brand.charAt(0).toUpperCase() + brand.slice(1)} ({theme})
          </h2>
          <p style={{ color: 'var(--color-text-secondary, rgba(0, 0, 0, 0.5))', fontSize: '14px' }}>
            Shadow tokens from Figma design system.
          </p>
        </div>

        {shadows.length > 0 ? (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
              gap: '16px',
            }}
          >
            {shadows.map((shadow) => (
              <ShadowSwatch key={shadow.token} {...shadow} />
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
            No shadow tokens found in this brand/theme combination.
          </div>
        )}
      </div>
    );
  },
};

