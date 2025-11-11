import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Utilities/ThemeTest',
  parameters: {
    layout: 'centered',
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const ThemeDebug: Story = {
  render: () => {
    if (typeof document === 'undefined') {
      return <div>Server-side rendering</div>;
    }
    
    const brand = document.documentElement.getAttribute('data-brand') || 'not set';
    const theme = document.documentElement.getAttribute('data-theme') || 'not set';
    const bgColor = getComputedStyle(document.documentElement).getPropertyValue('--color-bg-default').trim();
    const textColor = getComputedStyle(document.documentElement).getPropertyValue('--color-text-default').trim();
    
    return (
      <div style={{ padding: '20px', fontFamily: 'monospace' }}>
        <h3>Theme Debug Info</h3>
        <div style={{ marginTop: '16px' }}>
          <div><strong>data-brand:</strong> {brand}</div>
          <div><strong>data-theme:</strong> {theme}</div>
          <div><strong>--color-bg-default:</strong> {bgColor || 'not found'}</div>
          <div><strong>--color-text-default:</strong> {textColor || 'not found'}</div>
        </div>
        <div style={{ 
          marginTop: '20px', 
          padding: '16px', 
          backgroundColor: bgColor || '#fff',
          color: textColor || '#000',
          border: '1px solid #ccc',
          borderRadius: '8px'
        }}>
          <p>This box should change color when you switch themes.</p>
          <p>Background: {bgColor}</p>
          <p>Text: {textColor}</p>
        </div>
      </div>
    );
  },
};

