// packages/figma-mcp/scripts/inspect-variant.ts
import 'dotenv/config';
import { parseFigmaUrl, fetchNode } from './utils/figma.nodes.js';
import { extractAllProperties } from './utils/extract-all-properties.js';

async function main() {
  const url = process.argv[2];
  if (!url) {
    console.error('Usage: tsx inspect-variant.ts <figma-url>');
    process.exit(1);
  }

  const { fileKey, nodeId } = parseFigmaUrl(url);
  const { node, children } = await fetchNode(fileKey, nodeId);

  console.log(`\n📦 Component Set: ${node.name}`);
  console.log(`📋 Found ${children?.length || 0} variants\n`);

  // Find variants to compare
  const defaultVariant = children?.find((c: any) => 
    c.name?.includes('Single Line') && 
    c.name?.includes('Size=Default') &&
    c.name?.includes('State=Default') &&
    c.name?.includes('Icon Lead=False') &&
    c.name?.includes('Dropdown=False')
  );

  const focusVariant = children?.find((c: any) => 
    c.name?.includes('Single Line') && 
    c.name?.includes('Size=Default') &&
    c.name?.includes('State=Focus') &&
    c.name?.includes('Icon Lead=False') &&
    c.name?.includes('Dropdown=False')
  );

  const targetVariant = defaultVariant;

  if (targetVariant) {
    console.log(`🎯 Inspecting: ${targetVariant.name}\n`);
    const { node: variantNode } = await fetchNode(fileKey, targetVariant.id);
    const props = extractAllProperties(variantNode);

    console.log('=== EXTRACTED PROPERTIES ===');
    console.log(`Fills: ${props.fills.length}`);
    if (props.fills.length > 0) {
      props.fills.forEach((fill, i) => {
        console.log(`  Fill ${i + 1}:`, JSON.stringify(fill, null, 2));
      });
    }

    console.log(`\nStrokes: ${props.strokes.length}`);
    if (props.strokes.length > 0) {
      props.strokes.forEach((stroke, i) => {
        console.log(`  Stroke ${i + 1}:`, JSON.stringify(stroke, null, 2));
      });
    }

    console.log(`\nEffects: ${props.effects.length}`);
    if (props.effects.length > 0) {
      props.effects.forEach((effect, i) => {
        console.log(`  Effect ${i + 1}:`, JSON.stringify(effect, null, 2));
      });
    }

    console.log(`\nLayout:`, JSON.stringify(props.layout, null, 2));
    console.log(`\nDimensions:`, JSON.stringify(props.dimensions, null, 2));
    console.log(`\nCorner Radius:`, props.cornerRadius || props.cornerRadii || 'none');
    console.log(`\nTypography:`, props.typography ? JSON.stringify(props.typography, null, 2) : 'none');
    console.log(`\nOpacity:`, props.opacity);
    console.log(`\nBlend Mode:`, props.blendMode || 'NORMAL');
    console.log(`\nClips Content:`, props.clipsContent);

    // Also check children for text nodes
    if (variantNode.children) {
      console.log(`\n=== CHILDREN ===`);
      for (const child of variantNode.children) {
        const childProps = extractAllProperties(child);
        console.log(`\nChild: ${child.name || child.type}`);
        if (childProps.typography) {
          console.log('  Typography:', JSON.stringify(childProps.typography, null, 2));
        }
        if (childProps.fills.length > 0) {
          console.log('  Fills:', JSON.stringify(childProps.fills, null, 2));
        }
        if (childProps.strokes.length > 0) {
          console.log('  Strokes:', JSON.stringify(childProps.strokes, null, 2));
        }
      }
    }

    // Compare with Focus state
    if (focusVariant) {
      console.log(`\n\n=== COMPARING WITH FOCUS STATE ===`);
      const { node: focusNode } = await fetchNode(fileKey, focusVariant.id);
      const focusProps = extractAllProperties(focusNode);
      
      console.log(`\nFocus State Properties:`);
      console.log(`Fills: ${focusProps.fills.length}`);
      if (focusProps.fills.length > 0) {
        focusProps.fills.forEach((fill, i) => {
          console.log(`  Fill ${i + 1}:`, JSON.stringify(fill, null, 2));
        });
      }
      console.log(`Strokes: ${focusProps.strokes.length}`);
      if (focusProps.strokes.length > 0) {
        focusProps.strokes.forEach((stroke, i) => {
          console.log(`  Stroke ${i + 1}:`, JSON.stringify(stroke, null, 2));
        });
      }
      console.log(`Layout:`, JSON.stringify(focusProps.layout, null, 2));
      console.log(`Dimensions:`, JSON.stringify(focusProps.dimensions, null, 2));
      console.log(`Corner Radius:`, focusProps.cornerRadius || focusProps.cornerRadii || 'none');
    }
  } else {
    console.log('❌ Target variant not found');
    console.log('Available variants:');
    children?.slice(0, 10).forEach((c: any) => console.log(`  - ${c.name}`));
  }
}

main().catch(console.error);

