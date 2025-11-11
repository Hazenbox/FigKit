// packages/figma-mcp/scripts/update-storybook.ts
import { existsSync, writeFileSync, mkdirSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '../../../../');

const storyUtil = `
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Utilities/TokenStatus',
  parameters: {
    layout: 'centered',
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export function TokenStatus() {
  return (
    <div style={{ padding: 16, fontFamily: 'monospace', fontSize: '14px' }}>
      <h3 style={{ marginTop: 0 }}>Current Token Values</h3>
      <div style={{ display: 'grid', gap: '8px' }}>
        <div>
          <strong>BG Brand:</strong> <code>var(--color-bg-brand-default)</code>
          <div style={{ 
            width: '100px', 
            height: '24px', 
            background: 'var(--color-bg-brand-default)',
            border: '1px solid var(--color-border-default)',
            marginTop: '4px'
          }} />
        </div>
        <div>
          <strong>Text on Brand:</strong> <code>var(--color-text-onbrand)</code>
          <div style={{ 
            width: '100px', 
            height: '24px', 
            background: 'var(--color-bg-brand-default)',
            color: 'var(--color-text-onbrand)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: '4px'
          }}>Text</div>
        </div>
        <div>
          <strong>Border:</strong> <code>var(--color-border-component-default)</code>
          <div style={{ 
            width: '100px', 
            height: '24px', 
            border: '2px solid var(--color-border-component-default)',
            marginTop: '4px'
          }} />
        </div>
        <div>
          <strong>Space 4:</strong> <code>var(--space-4)</code> = <span style={{ paddingLeft: 'var(--space-4)' }}>←</span>
        </div>
        <div>
          <strong>Radius MD:</strong> <code>var(--radius-md)</code>
          <div style={{ 
            width: '100px', 
            height: '24px', 
            background: 'var(--color-bg-component-default)',
            borderRadius: 'var(--radius-md)',
            marginTop: '4px'
          }} />
        </div>
      </div>
      <p style={{ marginTop: '16px', fontSize: '12px', color: 'var(--color-text-secondary, #666)' }}>
        Use the Brand/Theme toolbar controls above to see how tokens change.
      </p>
    </div>
  );
}

export const Default: Story = {
  render: () => <TokenStatus />,
};
`;

async function main() {
  const utilPath = path.join(rootDir, 'packages/docs/stories/TokenStatus.stories.tsx');
  const utilDir = path.dirname(utilPath);
  
  if (!existsSync(utilDir)) {
    mkdirSync(utilDir, { recursive: true });
  }

  if (!existsSync(utilPath)) {
    writeFileSync(utilPath, storyUtil);
    console.log('✅ Added TokenStatus story to Storybook');
    console.log(`   Location: ${utilPath}`);
  } else {
    console.log('ℹ️  TokenStatus story already exists');
    console.log(`   Location: ${utilPath}`);
  }
}

main().catch((e) => {
  console.error('❌ update-storybook failed:', e);
  process.exit(1);
});

