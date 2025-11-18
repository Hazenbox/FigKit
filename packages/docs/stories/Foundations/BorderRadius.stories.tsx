import type { Meta, StoryObj } from '@storybook/react-vite';
import { useTokens } from './useTokens';
import React, { useMemo } from 'react';


const meta = {
  title: 'Foundations/Border Radius',
  component: () => null,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Border radius tokens for consistent corner rounding. All values extracted from Figma.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;


function extractRadiusTokens(tokens: any) {
  const radius: Array<{ name: string; value: string; token: string; pixels: number }> = [];

  if (tokens.radius) {
    Object.entries(tokens.radius).forEach(([key, token]: [string, any]) => {
      const value = token?.value;
      if (!value) return;

      const numValue = typeof value === 'string' ? parseFloat(value.replace('px', '')) : value;
      radius.push({
        name: key,
        value: String(value),
        token: `radius.${key}`,
        pixels: numValue,
      });
    });
  }

  // Also check for radius.* keys
  Object.entries(tokens).forEach(([key, token]: [string, any]) => {
    if (key.startsWith('radius.') && token?.value) {
      const value = String(token.value);
      const numValue = parseFloat(value.replace('px', ''));
      radius.push({
        name: key.replace('radius.', ''),
        value,
        token: key,
        pixels: numValue,
      });
    }
  });

  return radius.sort((a, b) => a.pixels - b.pixels);
}

function RadiusSwatch({ name, value, token, pixels }: { name: string; value: string; token: string; pixels: number }) {
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
          width: '100px',
          height: '100px',
          backgroundColor: 'var(--color-bg-brand, #0d99ff)',
          borderRadius: `${pixels}px`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontSize: '12px',
          fontWeight: 600,
        }}
      >
        {pixels}px
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

export const BorderRadiusScale: Story = {
  render: () => {
    const { brand, theme, tokens, loading } = useTokens();

    const radius = useMemo(() => extractRadiusTokens(tokens), [tokens]);

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
            Border Radius - {brand.charAt(0).toUpperCase() + brand.slice(1)} ({theme})
          </h2>
          <p style={{ color: 'var(--color-text-secondary, rgba(0, 0, 0, 0.5))', fontSize: '14px' }}>
            Border radius tokens from Figma design system.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
            gap: '16px',
          }}
        >
          {radius.map((r) => (
            <RadiusSwatch key={r.token} {...r} />
          ))}
        </div>
      </div>
    );
  },
};

