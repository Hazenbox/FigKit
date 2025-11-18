// packages/figma-mcp/scripts/pull-component.ts
import 'dotenv/config';
import { parseFigmaUrl, fetchNode } from './utils/figma.nodes.js';
import { mapFigmaKeyToSemantic, getTokenFallback } from './utils/token-map.js';
import { emitReactComponent, kebab, pascalCase } from './utils/codegen.js';
import { extractColorsFromNode } from './utils/extract-colors.js';
import { resolveBoundVariable } from './utils/resolve-variables.js';
import { extractAllProperties, propertiesToCSS } from './utils/extract-all-properties.js';
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

  // Extract ALL properties from Figma node (100% extraction)
  const colorSource = (node.type === 'COMPONENT_SET' && variantInstances.length > 0 && variantInstances.find((c: any) => c.name?.toLowerCase().includes('primary'))) || node;
  
  console.log('🔍 Extracting ALL properties from Figma node (100% extraction)...');
  const allProperties = extractAllProperties(colorSource);
  
  // Extract properties for each variant if component set
  const variantPropertiesMap = new Map<string, any>();
  if (node.type === 'COMPONENT_SET' && variantInstances.length > 0) {
    console.log('📋 Extracting properties for all variants...');
    
    // Fetch full node data for each variant to get all properties
    for (const variant of variantInstances) {
      try {
        // If variant has an ID, fetch its full data
        if (variant.id) {
          const { node: fullVariantNode } = await fetchNode(fileKey, variant.id);
          const variantName = fullVariantNode.name?.toLowerCase() || variant.name?.toLowerCase() || 'default';
          const variantProps = extractAllProperties(fullVariantNode);
          variantPropertiesMap.set(variantName, variantProps);
          console.log(`   ✅ Extracted ${variantName}: ${variantProps.fills.length} fills, ${variantProps.effects.length} effects, ${variantProps.strokes.length} strokes`);
        } else {
          // Fallback to variant data we have
          const variantName = variant.name?.toLowerCase() || 'default';
          const variantProps = extractAllProperties(variant);
          variantPropertiesMap.set(variantName, variantProps);
          console.log(`   ✅ Extracted ${variantName}: ${variantProps.fills.length} fills, ${variantProps.effects.length} effects`);
        }
      } catch (err) {
        console.warn(`   ⚠️  Could not fetch full data for variant ${variant.name}:`, err);
        // Fallback to variant data we have
        const variantName = variant.name?.toLowerCase() || 'default';
        const variantProps = extractAllProperties(variant);
        variantPropertiesMap.set(variantName, variantProps);
      }
    }
  }
  
  console.log('✅ Extracted properties:');
  console.log(`   Fills: ${allProperties.fills.length}`);
  console.log(`   Strokes: ${allProperties.strokes.length}`);
  console.log(`   Effects: ${allProperties.effects.length}`);
  console.log(`   Layout: ${allProperties.layout.layoutMode || 'none'}`);
  console.log(`   Dimensions: ${allProperties.dimensions.width}x${allProperties.dimensions.height}`);
  console.log(`   Typography: ${allProperties.typography ? 'yes' : 'no'}`);
  console.log(`   Opacity: ${allProperties.opacity}`);
  if (variantPropertiesMap.size > 0) {
    console.log(`   Variants: ${variantPropertiesMap.size} variants extracted`);
  }
  
  // Also extract colors for backward compatibility and token mapping
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

  // Extract ALL component property definitions (100% extraction)
  const variants: string[] = [];
  const sizes: string[] = [];
  const componentProps: Record<string, { type: string; options: string[]; defaultValue: string }> = {};
  
  if (node.type === 'COMPONENT_SET' && node.componentPropertyDefinitions) {
    console.log('📋 Extracting ALL component property definitions...');
    
    // Extract ALL properties, not just Variant and Size
    for (const [propName, propDef] of Object.entries(node.componentPropertyDefinitions)) {
      const prop = propDef as any;
      
      // Normalize property name (remove emojis, normalize to camelCase)
      const normalizedName = propName
        .replace(/[👥🐣🎛️]/g, '')
        .trim()
        .toLowerCase()
        .replace(/\s+/g, '-');
      
      if (prop.type === 'VARIANT' && prop.variantOptions) {
        const options = prop.variantOptions.map((opt: string) => 
          opt.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
        );
        
        componentProps[normalizedName] = {
          type: 'VARIANT',
          options,
          defaultValue: (prop.defaultValue || options[0] || '').toLowerCase().replace(/\s+/g, '-')
        };
        
        // Special handling for known properties
        if (propName.includes('Variant') || propName === '👥 Variant') {
          variants.push(...options);
        } else if (propName.includes('Size') || propName === '👥 Size') {
          sizes.push(...options);
        }
        
        console.log(`   ✅ ${propName}: ${options.length} options (${options.join(', ')})`);
      } else if (prop.type === 'BOOLEAN') {
        componentProps[normalizedName] = {
          type: 'BOOLEAN',
          options: ['true', 'false'],
          defaultValue: prop.defaultValue === 'TRUE' ? 'true' : 'false'
        };
        console.log(`   ✅ ${propName}: Boolean (default: ${componentProps[normalizedName].defaultValue})`);
      } else if (prop.type === 'TEXT') {
        componentProps[normalizedName] = {
          type: 'TEXT',
          options: [],
          defaultValue: prop.defaultValue || ''
        };
        console.log(`   ✅ ${propName}: Text (default: "${componentProps[normalizedName].defaultValue}")`);
      }
    }
  }
  
  // Fallback to common variants if not found
  if (variants.length === 0) {
    variants.push('primary', 'secondary', 'figjam', 'destructive', 'secondary-destruct', 'inverse', 'success', 'link', 'link-danger', 'ghost');
  }
  
  // Fallback to common sizes if not found
  if (sizes.length === 0) {
    sizes.push('default', 'large', 'wide');
  }
  
  // Remove duplicates
  const uniqueVariants = Array.from(new Set(variants));
  const uniqueSizes = Array.from(new Set(sizes));

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
    sizes: uniqueSizes.length > 0 ? uniqueSizes : ['default', 'large', 'wide'],
    componentProperties: componentProps, // Pass ALL component property definitions
    extractedColors: {
      fill: resolvedFill || colors.fill,
      stroke: colors.stroke,
      text: colors.text,
    },
    allProperties: allProperties, // Pass all extracted properties for 100% match
    variantPropertiesMap: variantPropertiesMap, // Pass variant-specific properties
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

