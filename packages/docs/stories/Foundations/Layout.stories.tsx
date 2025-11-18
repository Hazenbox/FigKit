import type { Meta, StoryObj } from '@storybook/react-vite';
import { useTokens } from './useTokens';
import React, { useMemo } from 'react';


const meta = {
  title: 'Foundations/Layout',
  component: () => null,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Layout tokens including container widths, breakpoints, and layout constraints. All values extracted from Figma.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;


function extractLayoutTokens(tokens: any) {
  const layout: Array<{ name: string; value: string; token: string }> = [];

  Object.entries(tokens).forEach(([key, token]: [string, any]) => {
    if (
      !key.includes('layout') &&
      !key.includes('container') &&
      !key.includes('breakpoint') &&
      !key.includes('grid') &&
      !key.includes('width') &&
      !key.includes('height') &&
      !key.includes('max') &&
      !key.includes('min')
    ) {
      return;
    }

    const value = token?.value;
    if (!value) return;

    layout.push({
      name: key,
      value: typeof value === 'string' ? value : JSON.stringify(value),
      token: key,
    });
  });

  return layout;
}

export const LayoutTokens: Story = {
  render: () => {
    const { brand, theme, tokens, loading } = useTokens();

    const layout = useMemo(() => extractLayoutTokens(tokens), [tokens]);

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
            Layout - {brand.charAt(0).toUpperCase() + brand.slice(1)} ({theme})
          </h2>
          <p style={{ color: 'var(--color-text-secondary, rgba(0, 0, 0, 0.5))', fontSize: '14px' }}>
            Layout tokens from Figma design system.
          </p>
        </div>

        {layout.length > 0 ? (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: '16px',
            }}
          >
            {layout.map((item) => (
              <div
                key={item.token}
                style={{
                  padding: '16px',
                  border: '1px solid var(--color-border-default, #e6e6e6)',
                  borderRadius: '8px',
                  backgroundColor: 'var(--color-bg-default, #ffffff)',
                }}
              >
                <div
                  style={{
                    fontSize: '12px',
                    fontWeight: 600,
                    color: 'var(--color-text-default, rgba(0, 0, 0, 0.9))',
                    marginBottom: '8px',
                  }}
                >
                  {item.name}
                </div>
                <div
                  style={{
                    fontSize: '11px',
                    fontFamily: 'monospace',
                    color: 'var(--color-text-secondary, rgba(0, 0, 0, 0.5))',
                    marginBottom: '4px',
                  }}
                >
                  {item.value}
                </div>
                <div
                  style={{
                    fontSize: '10px',
                    color: 'var(--color-text-tertiary, rgba(0, 0, 0, 0.3))',
                  }}
                >
                  {item.token}
                </div>
              </div>
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
            No layout tokens found in this brand/theme combination.
          </div>
        )}
      </div>
    );
  },
};

