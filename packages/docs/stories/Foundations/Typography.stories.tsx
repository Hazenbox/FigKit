import type { Meta, StoryObj } from '@storybook/react-vite';
import { useTokens } from './useTokens';
import React, { useMemo } from 'react';


const meta = {
  title: 'Foundations/Typography',
  component: () => null,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Typography tokens including font families, sizes, weights, line heights, and letter spacing. All values extracted from Figma.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;


function extractTypographyTokens(tokens: any) {
  const typography: Array<{
    name: string;
    token: string;
    fontFamily?: string;
    fontSize?: string;
    fontWeight?: string;
    lineHeight?: string;
    letterSpacing?: string;
  }> = [];

  Object.entries(tokens).forEach(([key, token]: [string, any]) => {
    if (!key.includes('typography') && !key.includes('font') && !key.includes('body') && !key.includes('heading')) {
      return;
    }

    const value = token?.value;
    if (!value) return;

    if (key.includes('fontFamily') || key.includes('font-family')) {
      typography.push({ name: key, token: key, fontFamily: String(value) });
    } else if (key.includes('fontSize') || key.includes('font-size')) {
      typography.push({ name: key, token: key, fontSize: String(value) });
    } else if (key.includes('fontWeight') || key.includes('font-weight')) {
      typography.push({ name: key, token: key, fontWeight: String(value) });
    } else if (key.includes('lineHeight') || key.includes('line-height')) {
      typography.push({ name: key, token: key, lineHeight: String(value) });
    } else if (key.includes('letterSpacing') || key.includes('letter-spacing')) {
      typography.push({ name: key, token: key, letterSpacing: String(value) });
    }
  });

  // Group by typography scale (body-small, body-medium, heading-large, etc.)
  const grouped: Record<string, any> = {};
  typography.forEach((item) => {
    const parts = item.name.split('.');
    const scale = parts.find((p) => ['body', 'heading', 'caption', 'label'].some((s) => p.includes(s))) || 'other';
    const property = parts[parts.length - 1];

    if (!grouped[scale]) grouped[scale] = {};
    grouped[scale][property] = item;
  });

  return grouped;
}

export const TypographyScale: Story = {
  render: () => {
    const { brand, theme, tokens, loading } = useTokens();

    const typography = useMemo(() => extractTypographyTokens(tokens), [tokens]);

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
            Typography - {brand.charAt(0).toUpperCase() + brand.slice(1)} ({theme})
          </h2>
          <p style={{ color: 'var(--color-text-secondary, rgba(0, 0, 0, 0.5))', fontSize: '14px' }}>
            Typography tokens from Figma design system.
          </p>
        </div>

        {Object.entries(typography).map(([scale, props]) => (
          <div
            key={scale}
            style={{
              marginBottom: '32px',
              padding: '24px',
              border: '1px solid var(--color-border-default, #e6e6e6)',
              borderRadius: '8px',
              backgroundColor: 'var(--color-bg-default, #ffffff)',
            }}
          >
            <h3
              style={{
                marginBottom: '16px',
                fontSize: '18px',
                fontWeight: 600,
                textTransform: 'capitalize',
              }}
            >
              {scale.replace(/-/g, ' ')}
            </h3>
            <div style={{ display: 'grid', gap: '12px' }}>
              {Object.entries(props).map(([prop, item]: [string, any]) => (
                <div
                  key={prop}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '8px 12px',
                    backgroundColor: 'var(--color-bg-secondary, #f5f5f5)',
                    borderRadius: '4px',
                  }}
                >
                  <span style={{ fontSize: '12px', fontWeight: 500 }}>{prop}</span>
                  <span
                    style={{
                      fontSize: '11px',
                      fontFamily: 'monospace',
                      color: 'var(--color-text-secondary, rgba(0, 0, 0, 0.5))',
                    }}
                  >
                    {item.value || item.fontFamily || item.fontSize || item.fontWeight || item.lineHeight || item.letterSpacing}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  },
};

