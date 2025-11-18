// packages/figma-mcp/scripts/inspect-detailed.ts
import 'dotenv/config';
import { parseFigmaUrl, fetchNode } from './utils/figma.nodes.js';
import { extractAllProperties } from './utils/extract-all-properties.js';

async function main() {
  const url = process.argv[2];
  if (!url) {
    console.error('Usage: tsx inspect-detailed.ts <figma-url>');
    process.exit(1);
  }

  const { fileKey, nodeId } = parseFigmaUrl(url);
  const { node, children } = await fetchNode(fileKey, nodeId);

  console.log(`\n📦 Component Set: ${node.name}`);
  console.log(`📋 Found ${children?.length || 0} variants\n`);

  // Find Single Line, Default size, Default state, no icon, no dropdown
  const defaultVariant = children?.find((c: any) => 
    c.name?.includes('Single Line') && 
    c.name?.includes('Size=Default') &&
    c.name?.includes('State=Default') &&
    c.name?.includes('Icon Lead=False') &&
    c.name?.includes('Dropdown=False')
  );

  // Find Single Line, Default size, Focus state, no icon, no dropdown
  const focusVariant = children?.find((c: any) => 
    c.name?.includes('Single Line') && 
    c.name?.includes('Size=Default') &&
    c.name?.includes('State=Focus') &&
    c.name?.includes('Icon Lead=False') &&
    c.name?.includes('Dropdown=False')
  );

  // Find Single Line, Default size, Default state, with icon, no dropdown
  const iconVariant = children?.find((c: any) => 
    c.name?.includes('Single Line') && 
    c.name?.includes('Size=Default') &&
    c.name?.includes('State=Default') &&
    c.name?.includes('Icon Lead=True') &&
    c.name?.includes('Dropdown=False')
  );

  if (defaultVariant) {
    console.log(`\n🎯 === DEFAULT STATE ===`);
    console.log(`Name: ${defaultVariant.name}\n`);
    const { node: defaultNode } = await fetchNode(fileKey, defaultVariant.id);
    const defaultProps = extractAllProperties(defaultNode);

    console.log('📐 Container Properties:');
    console.log(`  Fills:`, JSON.stringify(defaultProps.fills, null, 2));
    console.log(`  Strokes:`, JSON.stringify(defaultProps.strokes, null, 2));
    console.log(`  Effects:`, JSON.stringify(defaultProps.effects, null, 2));
    console.log(`  Layout:`, JSON.stringify(defaultProps.layout, null, 2));
    console.log(`  Dimensions:`, JSON.stringify(defaultProps.dimensions, null, 2));
    console.log(`  Corner Radius:`, defaultProps.cornerRadius || defaultProps.cornerRadii || 'none');
    console.log(`  Opacity:`, defaultProps.opacity);
    console.log(`  Blend Mode:`, defaultProps.blendMode || 'NORMAL');

    // Check all children
    if (defaultNode.children) {
      console.log(`\n📦 Children (${defaultNode.children.length}):`);
      for (const child of defaultNode.children) {
        const childProps = extractAllProperties(child);
        console.log(`\n  Child: ${child.name || child.type} (${child.type})`);
        console.log(`    Fills:`, JSON.stringify(childProps.fills, null, 2));
        console.log(`    Strokes:`, JSON.stringify(childProps.strokes, null, 2));
        if (childProps.typography) {
          console.log(`    Typography:`, JSON.stringify(childProps.typography, null, 2));
        }
        console.log(`    Dimensions:`, JSON.stringify(childProps.dimensions, null, 2));
        console.log(`    Layout:`, JSON.stringify(childProps.layout, null, 2));
        console.log(`    Corner Radius:`, childProps.cornerRadius || childProps.cornerRadii || 'none');
        
        // Check nested children
        if (child.children && child.children.length > 0) {
          console.log(`    Nested Children (${child.children.length}):`);
          for (const nested of child.children) {
            const nestedProps = extractAllProperties(nested);
            console.log(`      - ${nested.name || nested.type}:`);
            if (nestedProps.typography) {
              console.log(`        Typography:`, JSON.stringify(nestedProps.typography, null, 2));
            }
            console.log(`        Fills:`, JSON.stringify(nestedProps.fills, null, 2));
            console.log(`        Dimensions:`, JSON.stringify(nestedProps.dimensions, null, 2));
          }
        }
      }
    }
  }

  if (focusVariant) {
    console.log(`\n\n🎯 === FOCUS STATE ===`);
    console.log(`Name: ${focusVariant.name}\n`);
    const { node: focusNode } = await fetchNode(fileKey, focusVariant.id);
    const focusProps = extractAllProperties(focusNode);

    console.log('📐 Container Properties:');
    console.log(`  Fills:`, JSON.stringify(focusProps.fills, null, 2));
    console.log(`  Strokes:`, JSON.stringify(focusProps.strokes, null, 2));
    console.log(`  Effects:`, JSON.stringify(focusProps.effects, null, 2));
    console.log(`  Layout:`, JSON.stringify(focusProps.layout, null, 2));
    console.log(`  Dimensions:`, JSON.stringify(focusProps.dimensions, null, 2));
    console.log(`  Corner Radius:`, focusProps.cornerRadius || focusProps.cornerRadii || 'none');
  }

  if (iconVariant) {
    console.log(`\n\n🎯 === WITH ICON ===`);
    console.log(`Name: ${iconVariant.name}\n`);
    const { node: iconNode } = await fetchNode(fileKey, iconVariant.id);
    const iconProps = extractAllProperties(iconNode);

    console.log('📐 Container Properties:');
    console.log(`  Layout:`, JSON.stringify(iconProps.layout, null, 2));
    
    if (iconNode.children) {
      console.log(`\n📦 Children (${iconNode.children.length}):`);
      for (const child of iconNode.children) {
        const childProps = extractAllProperties(child);
        console.log(`\n  Child: ${child.name || child.type} (${child.type})`);
        console.log(`    Dimensions:`, JSON.stringify(childProps.dimensions, null, 2));
        console.log(`    Layout:`, JSON.stringify(childProps.layout, null, 2));
        if (childProps.fills.length > 0) {
          console.log(`    Fills:`, JSON.stringify(childProps.fills, null, 2));
        }
        if (childProps.strokes.length > 0) {
          console.log(`    Strokes:`, JSON.stringify(childProps.strokes, null, 2));
        }
      }
    }
  }
}

main().catch(console.error);

