// packages/figma-mcp/scripts/inspect-icons.ts
import 'dotenv/config';
import { parseFigmaUrl } from './utils/figma.nodes.js';
import axios from 'axios';

async function main() {
  const url = process.argv[2] || 'https://www.figma.com/design/zp6BWumXLgpNF4suKk9xTS/UI3--Figma-s-UI-Kit--Community-?node-id=1-530896&t=HSUJFG6qVpf7DrOV-4';
  
  const { fileKey, nodeId } = parseFigmaUrl(url);
  const FIGMA_PAT = process.env.FIGMA_PAT || process.env.FIGMA_API || '';
  
  console.log(`📦 File Key: ${fileKey}, Node ID: ${nodeId}`);
  
  // Fetch the full file to get all children
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
    console.log('❌ Node not found');
    return;
  }
  
  console.log(`\n📋 Node: ${targetNode.name} (${targetNode.type})`);
  console.log(`📋 Children: ${targetNode.children?.length || 0}`);
  
  // Find all icons starting with 'icon.24'
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
  
  const allIcons = findIcons(targetNode);
  console.log(`\n🎨 Found ${allIcons.length} icons starting with 'icon.24'`);
  
  if (allIcons.length > 0) {
    console.log('\nFirst 20 icons:');
    allIcons.slice(0, 20).forEach((icon, i) => {
      console.log(`  ${i + 1}. ${icon.name} (${icon.type}, ID: ${icon.id})`);
    });
  }
}

main().catch(console.error);

