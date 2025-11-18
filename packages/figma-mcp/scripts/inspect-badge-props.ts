// packages/figma-mcp/scripts/inspect-badge-props.ts
import 'dotenv/config';
import { parseFigmaUrl, fetchNode } from './utils/figma.nodes.js';

async function main() {
  const url = 'https://www.figma.com/design/zp6BWumXLgpNF4suKk9xTS/UI3--Figma-s-UI-Kit--Community-?node-id=2012-35027&m=dev';
  const { fileKey, nodeId } = parseFigmaUrl(url);
  const { node, children } = await fetchNode(fileKey, nodeId);

  console.log(`\n📦 Component Set: ${node.name}`);
  console.log(`📋 Found ${children?.length || 0} variants\n`);

  // Check component property definitions
  if (node.componentPropertyDefinitions) {
    console.log('🔍 Component Property Definitions:');
    console.log(JSON.stringify(node.componentPropertyDefinitions, null, 2));
    console.log('\n');
  }

  // Check a few variant instances to see their properties
  if (children && children.length > 0) {
    console.log('📋 Sample Variant Instances:');
    for (let i = 0; i < Math.min(5, children.length); i++) {
      const variant = children[i];
      console.log(`\n${i + 1}. ${variant.name}`);
      console.log(`   Variant Properties:`, variant.variantProperties);
      if (variant.cornerRadius !== undefined) {
        console.log(`   Corner Radius: ${variant.cornerRadius}`);
      }
      if (variant.cornerRadii) {
        console.log(`   Corner Radii: ${JSON.stringify(variant.cornerRadii)}`);
      }
    }
  }
}

main().catch(console.error);

