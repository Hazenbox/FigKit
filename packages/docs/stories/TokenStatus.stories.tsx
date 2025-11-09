import type { Meta, StoryObj } from '@storybook/react-vite';
import { useEffect, useState } from 'react';

const TokenStatus = () => {
  const [tokens, setTokens] = useState<Array<{ name: string; value: string }>>([]);
  const [brand, setBrand] = useState('not set');
  const [theme, setTheme] = useState('not set');

  useEffect(() => {
    if (typeof window === 'undefined' || typeof document === 'undefined') return;

    const updateTokens = () => {
      const tokenNames = [
        '--color-text-default',
        '--color-bg-default',
        '--color-bg-brand',
        '--radius-md',
        '--space-4',
      ];

      const computedTokens = tokenNames.map(name => ({
        name,
        value: getComputedStyle(document.documentElement).getPropertyValue(name).trim() || 'N/A'
      }));

      setTokens(computedTokens);
      setBrand(document.documentElement.getAttribute('data-brand') || 'not set');
      setTheme(document.documentElement.getAttribute('data-theme') || 'not set');
    };

    updateTokens();
  }, []);

  return (
    <div style={{
      padding: 'var(--space-4, 16px)',
      background: 'var(--color-bg-surface, #ffffff)',
      borderRadius: 'var(--radius-md, 8px)',
      border: '1px solid #e5e7eb',
      fontFamily: 'system-ui, sans-serif',
      fontSize: '14px',
    }}>
      <h2 style={{ 
        marginTop: 0, 
        marginBottom: '16px',
        color: 'var(--color-fg-text, #111111)',
        fontSize: '18px',
        fontWeight: '600'
      }}>
        Token Status
      </h2>
      
      <div style={{ marginBottom: '16px' }}>
        <strong>Active Theme:</strong>
        <div style={{ 
          marginTop: '4px',
          padding: '8px',
          background: '#f3f4f6',
          borderRadius: '4px',
          fontFamily: 'monospace',
          fontSize: '12px'
        }}>
          Brand: <code>{brand}</code> | Theme: <code>{theme}</code>
        </div>
      </div>

      <div>
        <strong>Token Values:</strong>
        <table style={{
          width: '100%',
          marginTop: '8px',
          borderCollapse: 'collapse',
          fontSize: '12px'
        }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
              <th style={{ textAlign: 'left', padding: '8px', fontWeight: '600' }}>Token</th>
              <th style={{ textAlign: 'left', padding: '8px', fontWeight: '600' }}>Value</th>
              <th style={{ textAlign: 'left', padding: '8px', fontWeight: '600' }}>Preview</th>
            </tr>
          </thead>
          <tbody>
            {tokens.length === 0 ? (
              <tr>
                <td colSpan={3} style={{ padding: '16px', textAlign: 'center', color: '#6b7280' }}>
                  Loading token values...
                </td>
              </tr>
            ) : (
              tokens.map((token) => {
              const isColor = token.name.includes('color');
              const previewStyle = isColor 
                ? {
                    width: '40px',
                    height: '24px',
                    borderRadius: '4px',
                    border: '1px solid #e5e7eb',
                    background: token.value || 'transparent'
                  }
                : null;

              return (
                <tr key={token.name} style={{ borderBottom: '1px solid #f3f4f6' }}>
                  <td style={{ padding: '8px', fontFamily: 'monospace', fontSize: '11px' }}>
                    {token.name}
                  </td>
                  <td style={{ padding: '8px', fontFamily: 'monospace', fontSize: '11px', color: '#6b7280' }}>
                    {token.value || <span style={{ color: '#ef4444' }}>Not defined</span>}
                  </td>
                  <td style={{ padding: '8px' }}>
                    {previewStyle && (
                      <div style={previewStyle} title={token.value} />
                    )}
                    {!isColor && token.value && (
                      <span style={{ 
                        padding: '2px 6px',
                        background: '#f3f4f6',
                        borderRadius: '4px',
                        fontSize: '11px'
                      }}>
                        {token.value}
                      </span>
                    )}
                  </td>
                </tr>
              );
            })
            )}
          </tbody>
        </table>
      </div>

      <div style={{
        marginTop: '16px',
        padding: '12px',
        background: '#fef3c7',
        borderRadius: '4px',
        fontSize: '12px',
        color: '#92400e'
      }}>
        <strong>💡 Tip:</strong> Use the toolbar controls above to switch between brands and themes. 
        Token values will update automatically.
      </div>
    </div>
  );
};

const meta = {
  title: 'Status/Token Status',
  component: TokenStatus,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof TokenStatus>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const FullWidth: Story = {
  render: () => (
    <div style={{ width: '800px', maxWidth: '100%' }}>
      <TokenStatus />
    </div>
  ),
};

