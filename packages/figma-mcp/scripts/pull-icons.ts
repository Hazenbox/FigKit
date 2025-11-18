// packages/figma-mcp/scripts/pull-icons.ts
import 'dotenv/config';
import { parseFigmaUrl } from './utils/figma.nodes.js';
import axios from 'axios';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { mkdirSync, writeFileSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '../../../');

/**
 * Find all icons recursively in the node tree
 */
function findIcons(node: any, icons: any[] = []): any[] {
  if (node.name?.startsWith('icon.24')) {
    icons.push(node);
  }
  if (node.children) {
    for (const child of node.children) {
      findIcons(child, icons);
    }
  }
  return icons;
}

/**
 * Fetch icon as SVG from Figma
 */
async function fetchIconSVG(fileKey: string, nodeId: string, pat: string): Promise<string> {
  try {
    // Use Figma's image export API to get SVG
    const { data } = await axios.get(
      `https://api.figma.com/v1/images/${fileKey}`,
      {
        params: { ids: nodeId, format: 'svg' },
        headers: { 'X-Figma-Token': pat },
      }
    );
    
    const imageUrl = data.images?.[nodeId];
    
    if (!imageUrl) {
      throw new Error('No image URL returned from Figma');
    }
    
    // Fetch the actual SVG
    const svgResponse = await axios.get(imageUrl);
    return svgResponse.data;
  } catch (error: any) {
    console.warn(`Could not fetch SVG for ${nodeId}:`, error.message);
    // Return placeholder SVG
    return `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="24" height="24" fill="currentColor" opacity="0.1"/>
  <text x="12" y="16" font-size="10" text-anchor="middle" fill="currentColor">?</text>
</svg>`;
  }
}

/**
 * Convert icon name to component name
 */
function iconNameToComponent(name: string): string {
  // icon.24.search.small -> SearchSmallIcon
  // icon.24.chevron.down.large/Default -> ChevronDownLargeDefaultIcon
  const parts = name
    .replace(/^icon\.24\./, '')
    .replace(/\//g, '.')
    .split('.')
    .map(part => part.charAt(0).toUpperCase() + part.slice(1));
  return parts.join('') + 'Icon';
}

/**
 * Convert icon name to kebab case
 */
function iconNameToKebab(name: string): string {
  // icon.24.search.small -> search-small
  // icon.24.chevron.down.large/Default -> chevron-down-large-default
  return name
    .replace(/^icon\.24\./, '')
    .replace(/\./g, '-')
    .replace(/\//g, '-')
    .toLowerCase();
}

/**
 * Generate React icon component
 */
function generateIconComponent(name: string, innerSVG: string, kebabName: string): string {
  const componentName = iconNameToComponent(name);
  
  // Clean up the inner SVG - remove any nested svg tags
  const cleanedSVG = innerSVG
    .replace(/<svg[^>]*>/g, '')
    .replace(/<\/svg>/g, '')
    .trim();
  
  return `import React from 'react';
import type { SVGProps } from 'react';

export interface ${componentName}Props extends Omit<SVGProps<SVGSVGElement>, 'width' | 'height'> {
  size?: number | string;
  color?: string;
}

export const ${componentName} = ({ 
  size = 24, 
  color = 'currentColor',
  ...props 
}: ${componentName}Props) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      ${cleanedSVG}
    </svg>
  );
};
`;
}

async function main() {
  const url = process.argv[2] || 'https://www.figma.com/design/zp6BWumXLgpNF4suKk9xTS/UI3--Figma-s-UI-Kit--Community-?node-id=1-530896&t=HSUJFG6qVpf7DrOV-4';
  
  console.log(`🔍 Parsing Figma URL: ${url}`);
  const { fileKey, nodeId } = parseFigmaUrl(url);
  console.log(`📦 File Key: ${fileKey}, Node ID: ${nodeId}`);

  const FIGMA_PAT = process.env.FIGMA_PAT || process.env.FIGMA_API || '';
  if (!FIGMA_PAT) {
    throw new Error('FIGMA_PAT or FIGMA_API environment variable is required');
  }

  console.log('📥 Fetching full file from Figma API...');
  
  // Fetch the full file to get all children recursively
  const { data: fileData } = await axios.get(
    `https://api.figma.com/v1/files/${fileKey}`,
    { headers: { 'X-Figma-Token': FIGMA_PAT } }
  );
  
  // Find node in document tree
  function findNodeInTree(tree: any, targetId: string): any {
    if (tree.id === targetId) return tree;
    if (tree.children) {
      for (const child of tree.children) {
        const found = findNodeInTree(child, targetId);
        if (found) return found;
      }
    }
    return null;
  }
  
  const doc = fileData.document;
  const targetNode = findNodeInTree(doc, nodeId);
  
  if (!targetNode) {
    throw new Error(`Node ${nodeId} not found in file`);
  }

  console.log(`📋 Node: ${targetNode.name} (${targetNode.type})`);

  // Find all icons starting with 'icon.24' recursively
  const icon24Nodes = findIcons(targetNode);

  console.log(`\n🎨 Found ${icon24Nodes.length} icons starting with 'icon.24'`);

  if (icon24Nodes.length === 0) {
    console.log('❌ No icons found starting with "icon.24"');
    return;
  }

  // Create icons directory structure
  const iconsDir = join(rootDir, 'packages/ui/src/icons');
  mkdirSync(iconsDir, { recursive: true });

  const iconExports: string[] = [];
  const iconTypes: string[] = [];

  // Process each icon
  for (let i = 0; i < icon24Nodes.length; i++) {
    const iconNode = icon24Nodes[i];
    const iconName = iconNode.name;
    const kebabName = iconNameToKebab(iconName);
    const componentName = iconNameToComponent(iconName);

    console.log(`\n[${i + 1}/${icon24Nodes.length}] Processing: ${iconName}`);

    try {
      // Fetch SVG from Figma
      const svg = await fetchIconSVG(fileKey, iconNode.id, FIGMA_PAT);
      
      // Extract inner SVG content (remove outer <svg> tag)
      // Also convert HTML attributes to React props (fill-rule -> fillRule, etc.)
      let innerSVG = svg
        .replace(/<svg[^>]*>/, '')
        .replace('</svg>', '')
        .trim();
      
      // Convert HTML attributes to React props
      innerSVG = innerSVG
        .replace(/fill-rule=/g, 'fillRule=')
        .replace(/clip-rule=/g, 'clipRule=')
        .replace(/fill-opacity=/g, 'fillOpacity=')
        .replace(/stroke-width=/g, 'strokeWidth=')
        .replace(/stroke-linecap=/g, 'strokeLinecap=')
        .replace(/stroke-linejoin=/g, 'strokeLinejoin=')
        .replace(/stroke-miterlimit=/g, 'strokeMiterlimit=')
        .replace(/stroke-dasharray=/g, 'strokeDasharray=')
        .replace(/stroke-dashoffset=/g, 'strokeDashoffset=')
        .replace(/text-anchor=/g, 'textAnchor=')
        .replace(/font-size=/g, 'fontSize=')
        .replace(/font-weight=/g, 'fontWeight=')
        .replace(/font-family=/g, 'fontFamily=')
        .replace(/xlink:href=/g, 'xlinkHref=');
      
      // Generate component
      const componentCode = generateIconComponent(iconName, innerSVG, kebabName);
      
      // Write component file
      const iconDir = join(iconsDir, kebabName);
      mkdirSync(iconDir, { recursive: true });
      writeFileSync(join(iconDir, `${componentName}.tsx`), componentCode);
      writeFileSync(join(iconDir, 'index.ts'), `export * from './${componentName}';\n`);
      
      // Add to exports
      iconExports.push(`export { ${componentName} } from './${kebabName}/${componentName}';`);
      iconExports.push(`export type { ${componentName}Props } from './${kebabName}/${componentName}';`);
      iconTypes.push(componentName);
      
      console.log(`   ✅ [${i + 1}/${icon24Nodes.length}] Created ${componentName}`);
      
      // Add small delay to avoid rate limiting
      if ((i + 1) % 10 === 0) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    } catch (error: any) {
      console.error(`   ❌ Error processing ${iconName}:`, error.message);
    }
  }

  // Create main index file
  const indexContent = `// Icon exports - Auto-generated from Figma
${iconExports.join('\n')}
`;
  writeFileSync(join(iconsDir, 'index.ts'), indexContent);

  // Update main components.ts to export icons
  const componentsPath = join(rootDir, 'packages/ui/src/components.ts');
  const componentsContent = require('fs').readFileSync(componentsPath, 'utf-8');
  
  if (!componentsContent.includes('from \'./icons\'')) {
    const updatedContent = componentsContent + '\n// Icons\nexport * from \'./icons\';\n';
    writeFileSync(componentsPath, updatedContent);
  }

  console.log(`\n✅ Extracted ${icon24Nodes.length} icons`);
  console.log(`📦 Icons directory: ${iconsDir}`);
  console.log(`\n👉 Next steps:`);
  console.log(`   1. Run: pnpm -F @figkit/ui build`);
  console.log(`   2. Create Storybook story for icons`);
}

main().catch((e) => {
  console.error('❌ pull-icons failed:', e);
  process.exit(1);
});

