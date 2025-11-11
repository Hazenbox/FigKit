// packages/figma-mcp/scripts/utils/figma.nodes.ts
import axios from 'axios';
import 'dotenv/config';

export function parseFigmaUrl(input: string): { fileKey: string; nodeId: string } {
  // Supports full URL or raw node id
  const urlMatch = input.match(/figma\.com\/design\/([^\/]+)/);
  const fileKey = urlMatch?.[1] ?? process.env.FIGMA_FILE_KEY!;
  
  // Extract node-id from URL, handle both - and : formats
  let nodeParam = input.match(/[?&]node-id=([^&]+)/)?.[1];
  if (nodeParam) {
    // Decode URL encoding and convert - to : (Figma uses : internally)
    nodeParam = decodeURIComponent(nodeParam).replace(/-/g, ':');
  }
  const nodeId = nodeParam || input.replace(/-/g, ':'); // Allow raw "3456:789" or "3456-789"
  
  if (!fileKey || !nodeId) {
    throw new Error(`Missing fileKey or nodeId. fileKey: ${fileKey}, nodeId: ${nodeId}`);
  }
  
  return { fileKey, nodeId };
}

export async function fetchNode(
  fileKey: string,
  nodeId: string,
  pat: string = process.env.FIGMA_PAT!
): Promise<{ node: any; children?: any[] }> {
  if (!pat) {
    throw new Error('FIGMA_PAT environment variable is required');
  }

  try {
    const { data } = await axios.get(
      `https://api.figma.com/v1/files/${fileKey}/nodes`,
      {
        params: { ids: nodeId },
        headers: { 'X-Figma-Token': pat },
      }
    );

    // Find node
    const node = data?.nodes?.[nodeId]?.document;
    if (!node) {
      throw new Error(`Node not found: ${nodeId}`);
    }

    // If it's a COMPONENT_SET, we need to fetch the children separately
    // The /nodes endpoint doesn't return children by default, we need to fetch the full file or use /files/:key
    let children: any[] = [];
    if (node.type === 'COMPONENT_SET') {
      // Try to get children from the node itself
      if (node.children) {
        children = node.children;
      } else {
        // Fetch the full file to get children
        try {
          const fileData = await axios.get(
            `https://api.figma.com/v1/files/${fileKey}`,
            {
              headers: { 'X-Figma-Token': pat },
              params: { ids: nodeId },
            }
          );
          // Find the node in the document tree
          const findNodeInTree = (tree: any, targetId: string): any => {
            if (tree.id === targetId) return tree;
            if (tree.children) {
              for (const child of tree.children) {
                const found = findNodeInTree(child, targetId);
                if (found) return found;
              }
            }
            return null;
          };
          const doc = fileData.data?.document;
          const foundNode = findNodeInTree(doc, nodeId);
          if (foundNode?.children) {
            children = foundNode.children;
          }
        } catch (err) {
          console.warn('Could not fetch children from file:', err);
        }
      }
    }

    return { node, children };
  } catch (error: any) {
    if (error.response?.status === 404) {
      throw new Error(`Node ${nodeId} not found in file ${fileKey}`);
    }
    if (error.response?.status === 403) {
      throw new Error('Access denied. Check your FIGMA_PAT has access to this file.');
    }
    throw error;
  }
}

