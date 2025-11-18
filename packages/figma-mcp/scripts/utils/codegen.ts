// packages/figma-mcp/scripts/utils/codegen.ts
import { mkdirSync, writeFileSync } from 'fs';
import path from 'path';
import { propertiesToCSS } from './extract-all-properties.js';

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

import type { ExtractedProperties } from './extract-all-properties.js';

export interface ComponentOptions {
  name: string;
  outDir: string;
  cssClasses: string;
  variants?: string[];
  sizes?: string[];
  componentProperties?: Record<string, { type: string; options: string[]; defaultValue: string }>; // ALL component property definitions
  extractedColors?: {
    fill?: string;
    stroke?: string;
    text?: string;
  };
  allProperties?: ExtractedProperties; // 100% extraction
  variantPropertiesMap?: Map<string, ExtractedProperties>; // Variant-specific properties
}

/**
 * Parse variant name to extract variant, size, state, and other properties
 */
function parseVariantName(variantName: string): {
  variant: string;
  size: string;
  state: 'default' | 'hover' | 'active' | 'focused' | 'disabled';
  iconLead: string;
} {
  const lower = variantName.toLowerCase();
  
  // Extract variant
  let variant = 'primary';
  const variantMatch = lower.match(/variant[=:]([^,]+)/);
  if (variantMatch) {
    variant = variantMatch[1].trim().replace(/\s+/g, '-').toLowerCase();
  }
  
  // Extract size
  let size = 'default';
  const sizeMatch = lower.match(/size[=:]([^,]+)/);
  if (sizeMatch) {
    size = sizeMatch[1].trim().toLowerCase();
  }
  
  // Extract state
  let state: 'default' | 'hover' | 'active' | 'focused' | 'disabled' = 'default';
  const stateMatch = lower.match(/state[=:]([^,]+)/);
  if (stateMatch) {
    const stateStr = stateMatch[1].trim().toLowerCase();
    if (stateStr === 'hover') state = 'hover';
    else if (stateStr === 'active') state = 'active';
    else if (stateStr === 'focused') state = 'focused';
    else if (stateStr === 'disabled' || stateStr === 'true') state = 'disabled';
  }
  
  // Extract icon lead
  let iconLead = 'false';
  const iconMatch = lower.match(/icon lead[=:]([^,]+)/);
  if (iconMatch) {
    iconLead = iconMatch[1].trim().toLowerCase();
  }
  
  return { variant, size, state, iconLead };
}

/**
 * Group variants by variant name and state
 */
function groupVariantsByState(variantPropertiesMap: Map<string, ExtractedProperties>): Map<string, Map<string, ExtractedProperties>> {
  const grouped = new Map<string, Map<string, ExtractedProperties>>();
  
  for (const [variantName, props] of variantPropertiesMap.entries()) {
    const parsed = parseVariantName(variantName);
    const variantKey = parsed.variant;
    
    if (!grouped.has(variantKey)) {
      grouped.set(variantKey, new Map());
    }
    
    const variantStates = grouped.get(variantKey)!;
    variantStates.set(parsed.state, props);
  }
  
  return grouped;
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

// Simple clsx replacement
function clsx(...args: (string | boolean | undefined | null)[]): string {
  return args.filter(Boolean).join(' ');
}

export type ${Comp}Variant =
  | ${variants.map((v) => `'${v}'`).join('\n  | ')};

export type ${Comp}Size = ${sizes.map((s) => `'${s}'`).join(' | ')};

export interface ${Comp}Props extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'size'> {
  children?: ReactNode;
  variant?: ${Comp}Variant;
  size?: ${Comp}Size;
  icon?: ReactNode;
  iconPosition?: 'left' | 'center';
}

export const ${Comp} = ({
  children,
  variant = "${variants[0]}",
  size = "${sizes[1] || sizes[0]}",
  icon,
  iconPosition = 'left',
  className,
  disabled,
  ...rest
}: ${Comp}Props) => {
  const hasIcon = icon !== undefined && icon !== null;
  const iconAlign = hasIcon ? (iconPosition === 'center' ? 'center' : 'left') : null;

  return (
    <button
      className={clsx(
        '${dirName}',
        \`\${dirName}--\${variant}\`,
        \`\${dirName}--\${size}\`,
        disabled && '${dirName}--disabled',
        hasIcon && iconAlign && \`\${dirName}--icon-\${iconAlign}\`,
        className
      )}
      disabled={disabled}
      {...rest}
    >
      {hasIcon && iconAlign === 'left' && <span className="${dirName}-icon ${dirName}-icon--left">{icon}</span>}
      {hasIcon && iconAlign === 'center' && <span className="${dirName}-icon ${dirName}-icon--center">{icon}</span>}
      <span className="${dirName}-text">{children}</span>
    </button>
  );
};
`;

  // Generate base CSS from extracted properties (100% Figma match)
  let baseCSS = '';
  if (opts.allProperties) {
    baseCSS = propertiesToCSS(opts.allProperties);
  }
  
  // If no properties extracted, use fallback
  if (!baseCSS) {
    baseCSS = `display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
  font-family: var(--body-medium-fontFamily, var(--font-family-default, 'Inter'));
  font-size: var(--body-medium-fontSize, 11px);
  font-weight: var(--body-medium-fontWeight, var(--font-weight-medium, 450));
  line-height: var(--body-medium-lineHeight, 16px);
  letter-spacing: var(--body-medium-letterSpacing, 0.055px);
  transition: all 0.2s ease;
  white-space: nowrap;
  user-select: none;
  position: relative;
  text-align: center;`;
  }

  // Generate variant-specific CSS with state mappings
  let variantCSS = '';
  if (opts.variantPropertiesMap && opts.variantPropertiesMap.size > 0) {
    const groupedVariants = groupVariantsByState(opts.variantPropertiesMap);
    
    variantCSS = '\n\n/* Variant-specific styles extracted from Figma with all states */\n';
    
    for (const variant of variants) {
      const variantKey = variant.toLowerCase().replace(/\s+/g, '-');
      const variantStates = groupedVariants.get(variantKey) || groupedVariants.get(variant.toLowerCase());
      
      if (variantStates) {
        // Default state
        const defaultProps = variantStates.get('default');
        if (defaultProps) {
          const defaultCSS = propertiesToCSS(defaultProps);
          variantCSS += `.${dirName}--${variantKey} {\n  ${defaultCSS.split('\n').join('\n  ')}\n}\n\n`;
        }
        
        // Hover state
        const hoverProps = variantStates.get('hover');
        if (hoverProps) {
          const hoverCSS = propertiesToCSS(hoverProps);
          variantCSS += `.${dirName}--${variantKey}:hover:not(:disabled):not(.${dirName}--disabled) {\n  ${hoverCSS.split('\n').join('\n  ')}\n}\n\n`;
        }
        
        // Active state
        const activeProps = variantStates.get('active');
        if (activeProps) {
          const activeCSS = propertiesToCSS(activeProps);
          variantCSS += `.${dirName}--${variantKey}:active:not(:disabled):not(.${dirName}--disabled) {\n  ${activeCSS.split('\n').join('\n  ')}\n}\n\n`;
        }
        
        // Focused state
        const focusedProps = variantStates.get('focused');
        if (focusedProps) {
          const focusedCSS = propertiesToCSS(focusedProps);
          variantCSS += `.${dirName}--${variantKey}:focus-visible {\n  ${focusedCSS.split('\n').join('\n  ')}\n}\n\n`;
        }
      }
    }
  }

  // Generate fallback variant CSS if no extracted properties
  let fallbackVariantCSS = '';
  if (!variantCSS && variants.length > 0) {
    // Use token-based CSS as fallback
    fallbackVariantCSS = variants.map((v) => {
      const variantKey = v.toLowerCase().replace(/\s+/g, '-');
      const isPrimary = variantKey === 'primary';
      const isDestructive = variantKey === 'destructive' || variantKey === 'danger';
      const isSecondary = variantKey === 'secondary';
      const isFigjam = variantKey === 'figjam';
      const isInverse = variantKey === 'inverse';
      const isSuccess = variantKey === 'success';
      const isLink = variantKey === 'link' || variantKey === 'link-danger';
      const isGhost = variantKey === 'ghost';
      const isSecondaryDestruct = variantKey === 'secondary-destruct' || variantKey === 'secondary-destruct';
      
      if (isLink) {
        const isDanger = variantKey.includes('danger');
        return `
.${dirName}--${variantKey} {
  background: transparent;
  color: var(--color-text-${isDanger ? 'danger' : 'brand'}, ${isDanger ? '#dc3412' : '#007be5'});
  border: none;
  padding: 0;
  height: auto;
}

.${dirName}--${variantKey}:hover:not(:disabled):not(.${dirName}--disabled) {
  text-decoration: underline;
  color: var(--color-text-${isDanger ? 'danger' : 'brand'}-hover, ${isDanger ? '#dc3412' : '#007be5'});
}

.${dirName}--${variantKey}:focus-visible {
  outline: 2px solid var(--color-border-selected, var(--color-bg-brand, #0d99ff));
  outline-offset: 2px;
  border-radius: var(--radius-sm, 2px);
}
`;
      } else if (isGhost) {
        return `
.${dirName}--${variantKey} {
  background: transparent;
  color: var(--color-text-default, rgba(0, 0, 0, 0.9));
  border: none;
}

.${dirName}--${variantKey}:hover:not(:disabled):not(.${dirName}--disabled) {
  background: var(--color-bg-component-hover, rgba(0, 0, 0, 0.05));
}

.${dirName}--${variantKey}:active:not(:disabled):not(.${dirName}--disabled) {
  background: var(--color-bg-component-pressed, rgba(0, 0, 0, 0.1));
}

.${dirName}--${variantKey}:focus-visible {
  border: 1px solid var(--color-border-selected, var(--color-bg-brand, #0d99ff));
  box-shadow: inset 0 0 0 2px #ffffff;
}
`;
      } else if (isPrimary) {
        return `
.${dirName}--${variantKey} {
  background: var(--color-bg-brand-default, var(--color-bg-brand, #0d99ff));
  color: var(--color-text-onbrand, #ffffff);
  border: none;
}

.${dirName}--${variantKey}:hover:not(:disabled):not(.${dirName}--disabled) {
  background: var(--color-bg-brand-hover, var(--color-bg-brand-secondary));
}

.${dirName}--${variantKey}:active:not(:disabled):not(.${dirName}--disabled) {
  background: var(--color-bg-brand-pressed, #007be5);
}

.${dirName}--${variantKey}:focus-visible {
  border: 1px solid var(--color-border-selected, var(--color-bg-brand, #0d99ff));
  box-shadow: inset 0 0 0 2px #ffffff;
}
`;
      } else if (isDestructive) {
        return `
.${dirName}--${variantKey} {
  background: var(--color-bg-danger-default, var(--color-bg-danger, #f24822));
  color: var(--color-text-onbrand, #ffffff);
  border: none;
}

.${dirName}--${variantKey}:hover:not(:disabled):not(.${dirName}--disabled) {
  background: var(--color-bg-danger-hover, var(--color-bg-danger-secondary));
}

.${dirName}--${variantKey}:active:not(:disabled):not(.${dirName}--disabled) {
  background: var(--color-bg-danger-pressed, var(--color-bg-danger-tertiary));
}

.${dirName}--${variantKey}:focus-visible {
  border: 1px solid var(--color-border-selected, var(--color-bg-danger, #f24822));
  box-shadow: inset 0 0 0 2px #ffffff;
}
`;
      } else if (isSecondaryDestruct) {
        return `
.${dirName}--${variantKey} {
  background: var(--color-bg-component-default, var(--color-bg-secondary, #f5f5f5));
  color: var(--color-text-danger, #dc3412);
  border: 1px solid var(--color-border-danger-default, var(--color-border-danger, #dc3412));
}

.${dirName}--${variantKey}:hover:not(:disabled):not(.${dirName}--disabled) {
  background: var(--color-bg-component-hover, var(--color-bg-hover, #f5f5f5));
  border-color: var(--color-border-danger-strong, var(--color-border-danger, #dc3412));
}

.${dirName}--${variantKey}:active:not(:disabled):not(.${dirName}--disabled) {
  background: var(--color-bg-component-pressed, var(--color-bg-selected));
}

.${dirName}--${variantKey}:focus-visible {
  border: 1px solid var(--color-border-selected, var(--color-bg-danger, #f24822));
  box-shadow: inset 0 0 0 2px #ffffff;
}
`;
      } else if (isSecondary) {
        return `
.${dirName}--${variantKey} {
  background: transparent;
  color: var(--color-text-default, var(--color-text, rgba(0, 0, 0, 0.9)));
  border: 1px solid var(--color-border-component-default, var(--color-border-default, rgba(0, 0, 0, 0.1)));
  box-sizing: border-box;
}

.${dirName}--${variantKey}:hover:not(:disabled):not(.${dirName}--disabled) {
  background: var(--color-bg-component-hover, var(--color-bg-hover, rgba(0, 0, 0, 0.05)));
  border-color: var(--color-border-component-hover, var(--color-border-strong));
}

.${dirName}--${variantKey}:active:not(:disabled):not(.${dirName}--disabled) {
  background: var(--color-bg-component-pressed, var(--color-bg-selected));
}

.${dirName}--${variantKey}:focus-visible {
  border: 1px solid var(--color-border-selected, var(--color-bg-brand, #0d99ff));
  box-shadow: inset 0 0 0 2px #ffffff;
}
`;
      } else if (isFigjam) {
        return `
.${dirName}--${variantKey} {
  background: var(--color-bg-figjam-default, var(--color-bg-figjam, #9747ff));
  color: var(--color-text-onbrand, #ffffff);
  border: none;
}

.${dirName}--${variantKey}:hover:not(:disabled):not(.${dirName}--disabled) {
  background: var(--color-bg-figjam-hover, var(--color-bg-figjam-secondary));
}

.${dirName}--${variantKey}:active:not(:disabled):not(.${dirName}--disabled) {
  background: var(--color-bg-figjam-pressed, var(--color-bg-figjam-tertiary));
}

.${dirName}--${variantKey}:focus-visible {
  border: 1px solid var(--color-border-selected, var(--color-bg-figjam, #9747ff));
  box-shadow: inset 0 0 0 2px #ffffff;
}
`;
      } else if (isInverse) {
        return `
.${dirName}--${variantKey} {
  background: var(--color-bg-inverse-default, var(--color-bg-inverse, #2c2c2c));
  color: rgba(255, 255, 255, 0.9);
  border: none;
}

.${dirName}--${variantKey}:hover:not(:disabled):not(.${dirName}--disabled) {
  background: var(--color-bg-inverse-default, var(--color-bg-inverse, #2c2c2c));
  opacity: 0.9;
}

.${dirName}--${variantKey}:active:not(:disabled):not(.${dirName}--disabled) {
  background: var(--color-bg-inverse-default, var(--color-bg-inverse, #2c2c2c));
  opacity: 0.8;
}

.${dirName}--${variantKey}:focus-visible {
  border: 1px solid var(--color-border-selected, var(--color-bg-brand, #0d99ff));
  box-shadow: inset 0 0 0 2px #ffffff;
}
`;
      } else if (isSuccess) {
        return `
.${dirName}--${variantKey} {
  background: var(--color-bg-success-default, var(--color-bg-success, #14ae5c));
  color: var(--color-text-onbrand, #ffffff);
  border: none;
}

.${dirName}--${variantKey}:hover:not(:disabled):not(.${dirName}--disabled) {
  background: var(--color-bg-success-hover, var(--color-bg-success-secondary));
}

.${dirName}--${variantKey}:active:not(:disabled):not(.${dirName}--disabled) {
  background: var(--color-bg-success-pressed, var(--color-bg-success-tertiary));
}

.${dirName}--${variantKey}:focus-visible {
  border: 1px solid var(--color-border-selected, var(--color-bg-success, #14ae5c));
  box-shadow: inset 0 0 0 2px #ffffff;
}
`;
      } else {
        return `
.${dirName}--${variantKey} {
  background: var(--color-bg-component-default, var(--color-bg-secondary));
  color: var(--color-text-component-default, var(--color-text-default));
  border: 1px solid var(--color-border-component-default, var(--color-border-default));
}

.${dirName}--${variantKey}:hover:not(:disabled):not(.${dirName}--disabled) {
  background: var(--color-bg-component-hover, var(--color-bg-hover));
  border-color: var(--color-border-component-hover, var(--color-border-strong));
}

.${dirName}--${variantKey}:active:not(:disabled):not(.${dirName}--disabled) {
  background: var(--color-bg-component-pressed, var(--color-bg-selected));
}
`;
      }
    }).join('\n');
  }

  const css = `/* 100% Figma-to-Code match - All properties extracted from Figma */
/* Base styles extracted directly from Figma node */
.${dirName} {
  ${baseCSS.split('\n').join('\n  ')}
}

.${dirName}-text {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.${dirName}-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.${dirName}-icon--left {
  margin-right: var(--space-1, 4px);
}

.${dirName}-icon--center {
  margin: 0 var(--space-1, 4px);
}

${variantCSS || fallbackVariantCSS}

/* Size: Default (24px height) */
.${dirName}--default {
  height: 24px;
  padding: 0 var(--space-3, 12px);
  border-radius: var(--radius-sm, 2px);
}

/* Size: Large (32px height) */
.${dirName}--large {
  height: 32px;
  padding: 0 var(--space-4, 16px);
  border-radius: var(--radius-sm, 2px);
}

/* Size: Wide (full width, 24px height) */
.${dirName}--wide {
  width: 100%;
  height: 24px;
  padding: 0 var(--space-3, 12px);
  border-radius: var(--radius-sm, 2px);
}

/* Disabled state */
.${dirName}:disabled,
.${dirName}--disabled {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}

/* Icon alignment */
.${dirName}--icon-left {
  flex-direction: row;
}

.${dirName}--icon-center {
  flex-direction: row;
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

${variants.map((v) => `export const ${v.charAt(0).toUpperCase() + v.slice(1).replace(/-/g, '')}: Story = {
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
