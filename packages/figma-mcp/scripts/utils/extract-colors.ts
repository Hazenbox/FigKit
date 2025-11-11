// packages/figma-mcp/scripts/utils/extract-colors.ts
/**
 * Extract actual color values from Figma node
 */

export function rgbaToHex(rgba: { r: number; g: number; b: number; a?: number }): string {
  const r = Math.round(rgba.r * 255);
  const g = Math.round(rgba.g * 255);
  const b = Math.round(rgba.b * 255);
  const a = rgba.a !== undefined ? rgba.a : 1;
  
  if (a < 1) {
    return `rgba(${r}, ${g}, ${b}, ${a})`;
  }
  
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

export function extractColorsFromNode(node: any): {
  fill?: string;
  stroke?: string;
  text?: string;
  boundVariables?: {
    fill?: any;
    stroke?: any;
    text?: any;
  };
} {
  const result: any = {
    boundVariables: {},
  };

  // Extract fill color
  if (node.fills && Array.isArray(node.fills) && node.fills.length > 0) {
    const fill = node.fills[0];
    
    if (fill.type === 'SOLID' && fill.color) {
      result.fill = rgbaToHex(fill.color);
    }
    
    // Check for bound variables
    if (fill.boundVariables?.FILL) {
      result.boundVariables.fill = fill.boundVariables.FILL;
    }
  }

  // Extract stroke color
  if (node.strokes && Array.isArray(node.strokes) && node.strokes.length > 0) {
    const stroke = node.strokes[0];
    
    if (stroke.type === 'SOLID' && stroke.color) {
      result.stroke = rgbaToHex(stroke.color);
    }
    
    // Check for bound variables
    if (stroke.boundVariables?.STROKE_COLOR) {
      result.boundVariables.stroke = stroke.boundVariables.STROKE_COLOR;
    }
  }

  // Extract text color (if node has text)
  if (node.characters && node.fills && Array.isArray(node.fills) && node.fills.length > 0) {
    const textFill = node.fills[0];
    if (textFill.type === 'SOLID' && textFill.color) {
      result.text = rgbaToHex(textFill.color);
    }
  }

  return result;
}

