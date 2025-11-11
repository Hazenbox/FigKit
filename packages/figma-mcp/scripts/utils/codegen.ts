// packages/figma-mcp/scripts/utils/codegen.ts
import { mkdirSync, writeFileSync } from 'fs';
import path from 'path';

export function pascalCase(str: string): string {
  return str
    .replace(/(^[\w])|([-_\\s]+[\w])/g, (s) => s.replace(/[-_\\s]+/g, '').toUpperCase())
    .replace(/[^a-zA-Z0-9]/g, '');
}

export function kebab(str: string): string {
  return str
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .toLowerCase()
    .replace(/[\s_]+/g, '-')
    .replace(/[^a-z0-9-]/g, '');
}

export interface ComponentOptions {
  name: string;
  outDir: string;
  cssClasses: string;
  variants?: string[];
  sizes?: string[];
  extractedColors?: {
    fill?: string;
    stroke?: string;
    text?: string;
  };
}

export function emitReactComponent(opts: ComponentOptions): { dir: string; compName: string } {
  const Comp = pascalCase(opts.name);
  const dirName = kebab(opts.name);
  const dir = path.join(opts.outDir, dirName);
  
  mkdirSync(dir, { recursive: true });

  const variants = opts.variants || ['primary'];
  const sizes = opts.sizes || ['sm', 'md', 'lg'];

  const tsx = `import './${dirName}.css';
import type { ReactNode, ButtonHTMLAttributes } from 'react';

export interface ${Comp}Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  variant?: ${variants.map((v) => `"${v}"`).join(' | ')};
  size?: ${sizes.map((s) => `"${s}"`).join(' | ')};
}

export const ${Comp} = ({
  children,
  variant = "${variants[0]}",
  size = "md",
  className = '',
  ...rest
}: ${Comp}Props) => {
  const classes = [
    '${dirName}',
    \`\${dirName}--\${variant}\`,
    \`\${dirName}--\${size}\`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
};
`;

  const css = `/* Tokenized component styles - uses CSS variables from @figkit/themes */
.${dirName} {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
  font-family: inherit;
  font-weight: 500;
  transition: all 0.2s ease;
  white-space: nowrap;
  user-select: none;
}

${variants.map((v) => {
  const isPrimary = v === 'primary';
  const isDanger = v === 'danger';
  const isTertiary = v === 'tertiary';
  
  if (isPrimary) {
    // Use only CSS variables - no hardcoded fallbacks
    // The token system should provide all values
    return `
.${dirName}--${v} {
  background: var(--color-bg-brand-default, var(--color-bg-brand));
  color: var(--color-text-onbrand, var(--color-text-component-oncomponent));
}

.${dirName}--${v}:hover:not(:disabled) {
  background: var(--color-bg-brand-hover, var(--color-bg-brand-secondary));
}

.${dirName}--${v}:active:not(:disabled) {
  background: var(--color-bg-brand-pressed, var(--color-bg-brand-tertiary));
}
`;
  } else if (isDanger) {
    return `
.${dirName}--${v} {
  background: var(--color-bg-danger-default, var(--color-bg-danger));
  color: var(--color-text-onbrand, var(--color-text-component-oncomponent));
}

.${dirName}--${v}:hover:not(:disabled) {
  background: var(--color-bg-danger-hover, var(--color-bg-danger-secondary));
}

.${dirName}--${v}:active:not(:disabled) {
  background: var(--color-bg-danger-pressed, var(--color-bg-danger-tertiary));
}
`;
  } else if (isTertiary) {
    return `
.${dirName}--${v} {
  background: transparent;
  color: var(--color-text-component-default, var(--color-text-default));
}

.${dirName}--${v}:hover:not(:disabled) {
  background: var(--color-bg-component-hover, var(--color-bg-hover));
}

.${dirName}--${v}:active:not(:disabled) {
  background: var(--color-bg-component-pressed, var(--color-bg-selected));
}
`;
  } else {
    // Secondary or other variants
    return `
.${dirName}--${v} {
  background: var(--color-bg-component-default, var(--color-bg-secondary));
  color: var(--color-text-component-default, var(--color-text-default));
  border: 1px solid var(--color-border-component-default, var(--color-border-default));
}

.${dirName}--${v}:hover:not(:disabled) {
  background: var(--color-bg-component-hover, var(--color-bg-hover));
  border-color: var(--color-border-component-hover, var(--color-border-strong));
}

.${dirName}--${v}:active:not(:disabled) {
  background: var(--color-bg-component-pressed, var(--color-bg-selected));
}
`;
  }
}).join('')}

${sizes.map((s) => {
  const sizeMap: Record<string, { padding: string; height: string; fontSize: string; lineHeight: string; radius: string }> = {
    sm: { padding: '0 var(--space-3)', height: '32px', fontSize: '12px', lineHeight: '16px', radius: 'var(--radius-sm)' },
    md: { padding: '0 var(--space-4)', height: '36px', fontSize: '14px', lineHeight: '20px', radius: 'var(--radius-md)' },
    lg: { padding: '0 var(--space-5)', height: '40px', fontSize: '16px', lineHeight: '24px', radius: 'var(--radius-lg)' },
  };
  const size = sizeMap[s] || sizeMap.md;
  return `
.${dirName}--${s} {
  padding: ${size.padding};
  height: ${size.height};
  font-size: ${size.fontSize};
  line-height: ${size.lineHeight};
  border-radius: ${size.radius};
}
`;
}).join('')}

.${dirName}:disabled,
.${dirName}--disabled {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}

.${dirName}:focus-visible {
  outline: 2px solid var(--color-bg-brand);
  outline-offset: 2px;
}
`;

  const story = `import type { Meta, StoryObj } from '@storybook/react-vite';
import { ${Comp} } from './${Comp}';

const meta = {
  title: 'UI/${Comp}',
  component: ${Comp},
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: [${variants.map((v) => `'${v}'`).join(', ')}],
    },
    size: {
      control: 'select',
      options: [${sizes.map((s) => `'${s}'`).join(', ')}],
    },
    disabled: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof ${Comp}>;

export default meta;
type Story = StoryObj<typeof meta>;

${variants.map((v) => `export const ${v.charAt(0).toUpperCase() + v.slice(1)}: Story = {
  args: {
    children: '${v.charAt(0).toUpperCase() + v.slice(1)} ${Comp}',
    variant: '${v}',
  },
};`).join('\n\n')}

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
      ${sizes.map((s) => `<${Comp} size="${s}">${s.toUpperCase()}</${Comp}>`).join('\n      ')}
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px' }}>
      ${variants.map((v) => `<${Comp} variant="${v}" disabled>${v.charAt(0).toUpperCase() + v.slice(1)} Disabled</${Comp}>`).join('\n      ')}
    </div>
  ),
};
`;

  writeFileSync(path.join(dir, `${Comp}.tsx`), tsx);
  writeFileSync(path.join(dir, `${dirName}.css`), css);
  writeFileSync(path.join(dir, `${Comp}.stories.tsx`), story);
  writeFileSync(path.join(dir, 'index.ts'), `export * from './${Comp}';\n`);

  return { dir, compName: Comp };
}

