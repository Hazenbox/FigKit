// Temporary script to inspect Figma node data
import 'dotenv/config';
import { parseFigmaUrl, fetchNode } from './utils/figma.nodes.js';

async function main() {
  const url = process.argv[2] || 'https://www.figma.com/design/zp6BWumXLgpNF4suKk9xTS/UI3--Figma-s-UI-Kit--Community-?node-id=2012-48557&m=dev';
  
  const { fileKey, nodeId } = parseFigmaUrl(url);
  console.log(`📦 Fetching node ${nodeId} from file ${fileKey}...\n`);
  
  const node = await fetchNode(fileKey, nodeId);
  
  console.log('=== NODE INFO ===');
  console.log('Name:', node.name);
  console.log('Type:', node.type);
  console.log('\n=== FILLS ===');
  console.log(JSON.stringify(node.fills, null, 2));
  
  if (node.fills?.[0]) {
    const fill = node.fills[0];
    console.log('\n=== FILL DETAILS ===');
    console.log('Type:', fill.type);
    console.log('Color:', fill.color);
    console.log('Opacity:', fill.opacity);
    console.log('Bound Variables:', JSON.stringify(fill.boundVariables, null, 2));
    if (fill.color) {
      const { r, g, b, a } = fill.color;
      const hex = `#${Math.round(r * 255).toString(16).padStart(2, '0')}${Math.round(g * 255).toString(16).padStart(2, '0')}${Math.round(b * 255).toString(16).padStart(2, '0')}`;
      console.log('Hex Color:', hex);
    }
  }
  
  console.log('\n=== STROKES ===');
  console.log(JSON.stringify(node.strokes, null, 2));
  
  console.log('\n=== VARIANT PROPERTIES ===');
  console.log(JSON.stringify(node.variantProperties, null, 2));
  
  console.log('\n=== FULL NODE (truncated) ===');
  const nodeStr = JSON.stringify(node, null, 2);
  console.log(nodeStr.substring(0, 2000));
  if (nodeStr.length > 2000) {
    console.log(`\n... (${nodeStr.length - 2000} more characters)`);
  }
}

main().catch(console.error);

