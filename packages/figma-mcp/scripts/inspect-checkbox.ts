// Temporary script to inspect Checkbox component structure
import 'dotenv/config';
import { parseFigmaUrl, fetchNode } from './utils/figma.nodes.js';
import { extractColorsFromNode } from './utils/extract-colors.js';

async function main() {
  const url = 'https://www.figma.com/design/zp6BWumXLgpNF4suKk9xTS/UI3--Figma-s-UI-Kit--Community-?node-id=2012-55461&m=dev';
  
  const { fileKey, nodeId } = parseFigmaUrl(url);
  console.log(`📦 Fetching Checkbox component set...\n`);
  
  const { node, children } = await fetchNode(fileKey, nodeId);
  
  console.log('=== COMPONENT SET INFO ===');
  console.log('Name:', node.name);
  console.log('Type:', node.type);
  console.log('\n=== VARIANT PROPERTIES ===');
  console.log(JSON.stringify(node.componentPropertyDefinitions, null, 2));
  
  console.log('\n=== VARIANT INSTANCES ===');
  console.log(`Found ${children?.length || 0} variants\n`);
  
  // Inspect a few key variants in detail
  const keyVariants = [
    children?.find((c: any) => c.name?.includes('Checked') && c.name?.includes('Disabled=False') && !c.name?.includes('Muted') && !c.name?.includes('Ghost')),
    children?.find((c: any) => c.name?.includes('Unchecked') && c.name?.includes('Disabled=False') && !c.name?.includes('Muted') && !c.name?.includes('Ghost')),
    children?.find((c: any) => c.name?.includes('Mixed')),
  ].filter(Boolean);
  
  for (const variant of keyVariants) {
    if (!variant) continue;
    console.log(`\n=== VARIANT: ${variant.name} ===`);
    console.log(`Type: ${variant.type}`);
    console.log(`Size: ${variant.absoluteBoundingBox?.width}x${variant.absoluteBoundingBox?.height}`);
    
    const colors = extractColorsFromNode(variant);
    console.log('Root Colors:', colors);
    
    // Deep dive into children structure
    if (variant.children) {
      console.log(`\n  Children (${variant.children.length}):`);
      for (const child of variant.children) {
        console.log(`\n  └─ ${child.name} (${child.type})`);
        console.log(`     Size: ${child.absoluteBoundingBox?.width}x${child.absoluteBoundingBox?.height}`);
        console.log(`     Position: x=${child.absoluteBoundingBox?.x}, y=${child.absoluteBoundingBox?.y}`);
        
        const childColors = extractColorsFromNode(child);
        if (childColors.fill || childColors.stroke || childColors.text) {
          console.log(`     Colors:`, childColors);
        }
        if (child.fills) {
          console.log(`     Fills:`, JSON.stringify(child.fills, null, 2));
        }
        if (child.strokes) {
          console.log(`     Strokes:`, JSON.stringify(child.strokes, null, 2));
        }
        if (child.cornerRadius !== undefined) {
          console.log(`     Corner Radius: ${child.cornerRadius}`);
        }
        if (child.boundVariables) {
          console.log(`     Bound Variables:`, JSON.stringify(child.boundVariables, null, 2));
        }
        
        // Check nested children (checkbox box, icon, etc.)
        if (child.children) {
          for (const grandchild of child.children) {
            console.log(`\n     └─ ${grandchild.name} (${grandchild.type})`);
            console.log(`        Size: ${grandchild.absoluteBoundingBox?.width}x${grandchild.absoluteBoundingBox?.height}`);
            const gcColors = extractColorsFromNode(grandchild);
            if (gcColors.fill || gcColors.stroke || gcColors.text) {
              console.log(`        Colors:`, gcColors);
            }
            if (grandchild.fills) {
              console.log(`        Fills:`, JSON.stringify(grandchild.fills, null, 2));
            }
            if (grandchild.strokes) {
              console.log(`        Strokes:`, JSON.stringify(grandchild.strokes, null, 2));
            }
            if (grandchild.cornerRadius !== undefined) {
              console.log(`        Corner Radius: ${grandchild.cornerRadius}`);
            }
            if (grandchild.boundVariables) {
              console.log(`        Bound Variables:`, JSON.stringify(grandchild.boundVariables, null, 2));
            }
            
            // Go deeper - check for icon/checkmark inside Check frame
            if (grandchild.children && grandchild.name === 'Check') {
              for (const greatGrandchild of grandchild.children) {
                console.log(`\n        └─ ${greatGrandchild.name} (${greatGrandchild.type})`);
                console.log(`           Size: ${greatGrandchild.absoluteBoundingBox?.width}x${greatGrandchild.absoluteBoundingBox?.height}`);
                const ggcColors = extractColorsFromNode(greatGrandchild);
                if (ggcColors.fill || ggcColors.stroke || ggcColors.text) {
                  console.log(`           Colors:`, ggcColors);
                }
                if (greatGrandchild.fills) {
                  console.log(`           Fills:`, JSON.stringify(greatGrandchild.fills, null, 2));
                }
                if (greatGrandchild.strokes) {
                  console.log(`           Strokes:`, JSON.stringify(greatGrandchild.strokes, null, 2));
                }
                // If it's a vector/icon, get the path data
                if (greatGrandchild.type === 'VECTOR' || greatGrandchild.type === 'BOOLEAN_OPERATION') {
                  console.log(`           Vector/Icon detected`);
                }
              }
            }
          }
        }
      }
    }
  }
}

main().catch(console.error);

