// packages/figma-mcp/scripts/pull-component.ts
import 'dotenv/config';
import { parseFigmaUrl, fetchNode } from './utils/figma.nodes.js';
import { mapFigmaKeyToSemantic, getTokenFallback } from './utils/token-map.js';
import { emitReactComponent, kebab, pascalCase } from './utils/codegen.js';
import { extractColorsFromNode } from './utils/extract-colors.js';
import { resolveBoundVariable } from './utils/resolve-variables.js';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
// Go from packages/figma-mcp/scripts/ to repo root
const rootDir = join(__dirname, '../../../');

async function main() {
  const arg = process.argv.slice(2).find((a) => !a.startsWith('--')) || process.env.FIGMA_NODE;
  
  if (!arg) {
    throw new Error('Usage: pnpm mcp:pull:component <figma-url-or-node-id>');
  }

  console.log(`🔍 Parsing Figma URL/node: ${arg}`);
  const { fileKey, nodeId } = parseFigmaUrl(arg);
  console.log(`📦 File Key: ${fileKey}, Node ID: ${nodeId}`);

  console.log('📥 Fetching node from Figma API...');
  const { node, children } = await fetchNode(fileKey, nodeId);

  // Basic inference
  const name = (node.name || 'Component').replace(/[\s/]+/g, ' ');
  const base = name.toLowerCase().includes('button') ? 'button' : kebab(name);
  const Comp = pascalCase(base);

  console.log(`📝 Component name: ${Comp} (from "${name}")`);
  console.log(`📦 Node type: ${node.type}`);

  // If it's a COMPONENT_SET, extract variant information
  let variantInstances: any[] = [];
  if (node.type === 'COMPONENT_SET' && children && children.length > 0) {
    console.log(`📋 Found ${children.length} variant instances in component set`);
    variantInstances = children;
    
    // Try to find a "Primary" variant to extract colors from
    const primaryVariant = children.find((c: any) => 
      c.name?.toLowerCase().includes('primary') || 
      c.variantProperties?.Variant === 'Primary'
    );
    
    if (primaryVariant) {
      console.log(`🎯 Using Primary variant for color extraction: ${primaryVariant.name}`);
    }
  }

  // Extract actual color values from Figma node (or primary variant if available)
  const colorSource = (node.type === 'COMPONENT_SET' && variantInstances.length > 0 && variantInstances.find((c: any) => c.name?.toLowerCase().includes('primary'))) || node;
  const colors = extractColorsFromNode(colorSource);
  
  console.log('🎨 Extracted colors from Figma:');
  if (colors.fill) {
    console.log(`   Fill: ${colors.fill}`);
  }
  if (colors.stroke) {
    console.log(`   Stroke: ${colors.stroke}`);
  }
  if (colors.text) {
    console.log(`   Text: ${colors.text}`);
  }
  
  // Resolve bound variables to get actual token values
  let resolvedFill = colors.fill;
  if (colors.boundVariables?.fill) {
    console.log(`   Resolving bound variable for fill: ${JSON.stringify(colors.boundVariables.fill)}`);
    const resolved = await resolveBoundVariable(fileKey, colors.boundVariables.fill.id || colors.boundVariables.fill);
    if (resolved) {
      resolvedFill = resolved;
      console.log(`   ✅ Resolved fill variable: ${resolved}`);
    }
  }
  
  // Map to semantic tokens
  let bgSemantic = getTokenFallback('bg', 'primary');
  let fgSemantic = getTokenFallback('text', 'onbrand');
  let borderSemantic = getTokenFallback('border', 'default');
  
  // Note: The extracted colors (resolvedFill) are the ACTUAL Figma values
  // But we use CSS variables from the token system for consistency across brands/themes
  // The token system should be synced with Figma via mcp:pull:tokens

  // Check if node has variant properties (Component Set)
  const variantProperties = node.variantProperties || {};
  const variants: string[] = [];
  
  // Try to get all variants from component set if this is a variant instance
  if (node.type === 'COMPONENT' || node.type === 'INSTANCE') {
    // For UI3 Figma kit, buttons typically have: primary, secondary, tertiary, danger
    // We'll include all common variants
    variants.push('primary', 'secondary', 'tertiary', 'danger');
  } else if (variantProperties.variant) {
    // Extract variant options from component set
    const variantValue = variantProperties.variant;
    if (typeof variantValue === 'string') {
      variants.push(variantValue);
    }
  } else {
    // Default variants based on common patterns - UI3 kit has these
    variants.push('primary', 'secondary', 'tertiary', 'danger');
  }

  // Infer variants from name (additional check)
  const nameLower = name.toLowerCase();
  if (nameLower.includes('primary') || nameLower.includes('default')) {
    if (!variants.includes('primary')) variants.unshift('primary');
  }
  if (nameLower.includes('secondary')) {
    if (!variants.includes('secondary')) variants.push('secondary');
  }
  if (nameLower.includes('tertiary')) {
    if (!variants.includes('tertiary')) variants.push('tertiary');
  }
  if (nameLower.includes('danger') || nameLower.includes('delete')) {
    if (!variants.includes('danger')) variants.push('danger');
  }
  
  // Remove duplicates and ensure we have at least primary
  const uniqueVariants = Array.from(new Set(variants));
  if (uniqueVariants.length === 0) {
    uniqueVariants.push('primary');
  }

  // Use semantic token paths
  bgSemantic = mapFigmaKeyToSemantic('✦.bg.brand.default') || getTokenFallback('bg', 'primary');
  fgSemantic = mapFigmaKeyToSemantic('✦._text.text-onbrand') || getTokenFallback('text', 'onbrand');
  borderSemantic = mapFigmaKeyToSemantic('✦._border.border-default') || getTokenFallback('border', 'default');

  console.log(`🎨 Using tokens:`);
  console.log(`   Background: ${bgSemantic}`);
  console.log(`   Text: ${fgSemantic}`);
  console.log(`   Border: ${borderSemantic}`);
  console.log(`   Variants: ${uniqueVariants.join(', ')}`);

  const outDir = join(rootDir, 'packages/ui/src');

  const { dir, compName } = emitReactComponent({
    name: Comp,
    outDir,
    cssClasses: '', // Not used in current implementation
    variants: uniqueVariants,
    sizes: ['sm', 'md', 'lg'],
    extractedColors: {
      fill: resolvedFill || colors.fill,
      stroke: colors.stroke,
      text: colors.text,
    },
  });

  console.log(`✅ Generated ${compName} in ${dir}`);
  console.log(`📦 Files created:`);
  console.log(`   - ${compName}.tsx`);
  console.log(`   - ${kebab(Comp)}.css`);
  console.log(`   - ${compName}.stories.tsx`);
  console.log(`   - index.ts`);
  
  // Auto-update component exports
  try {
    const { updateComponentExports } = await import('./utils/update-exports.js');
    updateComponentExports();
  } catch (error) {
    console.warn('⚠️  Could not auto-update exports:', error);
    console.log('👉 Manually update packages/ui/src/components.ts to export the new component');
  }
  
  console.log('');
  console.log('👉 Next steps:');
  console.log('   1. Run: pnpm -F @figkit/ui build');
  console.log('   2. Run: pnpm -F @figkit/docs storybook');
}

main().catch((e) => {
  console.error('❌ pull-component failed:', e);
  process.exit(1);
});

