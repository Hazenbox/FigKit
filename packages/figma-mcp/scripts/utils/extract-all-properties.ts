// packages/figma-mcp/scripts/utils/extract-all-properties.ts
/**
 * Comprehensive property extractor for 100% Figma-to-Code conversion
 * Extracts ALL visual and layout properties from Figma nodes
 */

import { rgbaToHex } from './extract-colors.js';

export interface ExtractedProperties {
  // Colors
  fills: FillProperty[];
  strokes: StrokeProperty[];
  
  // Effects
  effects: EffectProperty[];
  
  // Layout
  layout: LayoutProperty;
  
  // Typography
  typography: TypographyProperty | null;
  
  // Dimensions
  dimensions: DimensionProperty;
  
  // Constraints
  constraints: ConstraintProperty | null;
  
  // Transform
  transform: TransformProperty | null;
  
  // Opacity
  opacity: number;
  
  // Blend mode
  blendMode: string | null;
  
  // Clipping
  clipsContent: boolean;
  isMask: boolean;
  
  // Corner radius
  cornerRadius?: number;
  cornerRadii?: [number, number, number, number]; // [topLeft, topRight, bottomRight, bottomLeft]
}

export interface FillProperty {
  type: 'SOLID' | 'GRADIENT_LINEAR' | 'GRADIENT_RADIAL' | 'GRADIENT_ANGULAR' | 'GRADIENT_DIAMOND' | 'IMAGE';
  color?: string; // For SOLID
  opacity?: number;
  gradientStops?: Array<{ color: string; position: number }>;
  gradientTransform?: number[][];
  imageRef?: string; // For IMAGE
  scaleMode?: string;
  boundVariables?: any;
}

export interface StrokeProperty {
  color?: string;
  width: number;
  align: 'INSIDE' | 'OUTSIDE' | 'CENTER';
  cap: 'NONE' | 'ROUND' | 'SQUARE';
  join: 'MITER' | 'BEVEL' | 'ROUND';
  dashes?: number[];
  miterLimit?: number;
  boundVariables?: any;
}

export interface EffectProperty {
  type: 'DROP_SHADOW' | 'INNER_SHADOW' | 'LAYER_BLUR' | 'BACKGROUND_BLUR';
  visible: boolean;
  color?: string;
  offset?: { x: number; y: number };
  radius: number;
  spread?: number;
  boundVariables?: any;
}

export interface LayoutProperty {
  layoutMode: 'HORIZONTAL' | 'VERTICAL' | null;
  paddingLeft: number;
  paddingRight: number;
  paddingTop: number;
  paddingBottom: number;
  itemSpacing: number;
  layoutAlign: 'MIN' | 'CENTER' | 'MAX' | 'STRETCH';
  layoutGrow: 0 | 1;
  layoutWrap: 'NO_WRAP' | 'WRAP';
  primaryAxisAlignItems: 'MIN' | 'CENTER' | 'MAX' | 'SPACE_BETWEEN';
  counterAxisAlignItems: 'MIN' | 'CENTER' | 'MAX' | 'STRETCH';
}

export interface TypographyProperty {
  fontFamily: string;
  fontSize: number;
  fontWeight: number;
  lineHeight: number | { value: number; unit: 'PIXELS' | 'PERCENT' };
  letterSpacing: number | { value: number; unit: 'PIXELS' | 'PERCENT' };
  textAlignHorizontal: 'LEFT' | 'CENTER' | 'RIGHT' | 'JUSTIFIED';
  textAlignVertical: 'TOP' | 'CENTER' | 'BOTTOM';
  textDecoration: 'NONE' | 'UNDERLINE' | 'STRIKETHROUGH';
  textCase: 'ORIGINAL' | 'UPPER' | 'LOWER' | 'TITLE';
  paragraphIndent?: number;
  paragraphSpacing?: number;
  listOptions?: any;
}

export interface DimensionProperty {
  width: number;
  height: number;
  minWidth?: number | null;
  maxWidth?: number | null;
  minHeight?: number | null;
  maxHeight?: number | null;
}

export interface ConstraintProperty {
  horizontal: 'MIN' | 'CENTER' | 'MAX' | 'STRETCH' | 'SCALE';
  vertical: 'MIN' | 'CENTER' | 'MAX' | 'STRETCH' | 'SCALE';
}

export interface TransformProperty {
  rotation: number;
  scaleX?: number;
  scaleY?: number;
  skewX?: number;
  skewY?: number;
}

/**
 * Extract gradient stops from Figma gradient fill
 */
function extractGradientStops(gradientFill: any): Array<{ color: string; position: number }> {
  if (!gradientFill.gradientStops || !Array.isArray(gradientFill.gradientStops)) {
    return [];
  }
  
  return gradientFill.gradientStops.map((stop: any) => ({
    color: rgbaToHex(stop.color),
    position: stop.position || 0,
  }));
}

/**
 * Convert gradient transform matrix to CSS angle/position
 */
function gradientTransformToCSS(transform: number[][]): string {
  // Figma uses a 3x3 transform matrix
  // For linear gradients: angle = atan2(b, a) * (180 / π)
  if (transform && transform.length >= 2) {
    const [a, b] = transform[0];
    const angle = Math.atan2(b, a) * (180 / Math.PI);
    return `${angle}deg`;
  }
  return '0deg';
}

/**
 * Extract all fills from node
 */
function extractFills(node: any): FillProperty[] {
  if (!node.fills || !Array.isArray(node.fills)) {
    return [];
  }
  
  return node.fills
    .filter((fill: any) => fill.visible !== false)
    .map((fill: any) => {
      const result: FillProperty = {
        type: fill.type,
        opacity: fill.opacity !== undefined ? fill.opacity : 1,
      };
      
      if (fill.boundVariables) {
        result.boundVariables = fill.boundVariables;
      }
      
      switch (fill.type) {
        case 'SOLID':
          if (fill.color) {
            result.color = rgbaToHex(fill.color);
          }
          break;
          
        case 'GRADIENT_LINEAR':
        case 'GRADIENT_RADIAL':
        case 'GRADIENT_ANGULAR':
        case 'GRADIENT_DIAMOND':
          result.gradientStops = extractGradientStops(fill);
          if (fill.gradientTransform) {
            result.gradientTransform = fill.gradientTransform;
          }
          break;
          
        case 'IMAGE':
          result.imageRef = fill.imageRef;
          result.scaleMode = fill.scaleMode;
          break;
      }
      
      return result;
    });
}

/**
 * Extract all strokes from node
 */
function extractStrokes(node: any): StrokeProperty[] {
  if (!node.strokes || !Array.isArray(node.strokes) || node.strokes.length === 0) {
    return [];
  }
  
  return node.strokes
    .filter((stroke: any) => stroke.visible !== false)
    .map((stroke: any) => {
      const result: StrokeProperty = {
        width: node.strokeWeight || 0,
        align: node.strokeAlign || 'INSIDE',
        cap: node.strokeCap || 'NONE',
        join: node.strokeJoin || 'MITER',
      };
      
      if (stroke.type === 'SOLID' && stroke.color) {
        result.color = rgbaToHex(stroke.color);
      }
      
      if (stroke.boundVariables) {
        result.boundVariables = stroke.boundVariables;
      }
      
      if (node.strokeDashes && Array.isArray(node.strokeDashes) && node.strokeDashes.length > 0) {
        result.dashes = node.strokeDashes;
      }
      
      if (node.strokeMiterAngle !== undefined) {
        result.miterLimit = node.strokeMiterAngle;
      }
      
      return result;
    });
}

/**
 * Extract all effects (shadows, blurs) from node
 */
function extractEffects(node: any): EffectProperty[] {
  if (!node.effects || !Array.isArray(node.effects)) {
    return [];
  }
  
  return node.effects
    .filter((effect: any) => effect.visible !== false)
    .map((effect: any) => {
      const result: EffectProperty = {
        type: effect.type,
        visible: effect.visible !== false,
        radius: effect.radius || 0,
      };
      
      if (effect.color) {
        result.color = rgbaToHex(effect.color);
      }
      
      if (effect.offset) {
        result.offset = {
          x: effect.offset.x || 0,
          y: effect.offset.y || 0,
        };
      }
      
      if (effect.spread !== undefined) {
        result.spread = effect.spread;
      }
      
      if (effect.boundVariables) {
        result.boundVariables = effect.boundVariables;
      }
      
      return result;
    });
}

/**
 * Extract layout properties (Auto Layout)
 */
function extractLayout(node: any): LayoutProperty {
  return {
    layoutMode: node.layoutMode || null,
    paddingLeft: node.paddingLeft || 0,
    paddingRight: node.paddingRight || 0,
    paddingTop: node.paddingTop || 0,
    paddingBottom: node.paddingBottom || 0,
    itemSpacing: node.itemSpacing || 0,
    layoutAlign: node.layoutAlign || 'MIN',
    layoutGrow: node.layoutGrow || 0,
    layoutWrap: node.layoutWrap || 'NO_WRAP',
    primaryAxisAlignItems: node.primaryAxisAlignItems || 'MIN',
    counterAxisAlignItems: node.counterAxisAlignItems || 'MIN',
  };
}

/**
 * Extract typography properties from text node
 */
function extractTypography(node: any): TypographyProperty | null {
  if (!node.characters && node.type !== 'TEXT') {
    return null;
  }
  
  const style = node.style || {};
  
  return {
    fontFamily: style.fontFamily || 'Inter',
    fontSize: style.fontSize || 14,
    fontWeight: style.fontWeight || 400,
    lineHeight: style.lineHeight || { value: 1.2, unit: 'PERCENT' },
    letterSpacing: style.letterSpacing || { value: 0, unit: 'PIXELS' },
    textAlignHorizontal: node.textAlignHorizontal || 'LEFT',
    textAlignVertical: node.textAlignVertical || 'TOP',
    textDecoration: style.textDecoration || 'NONE',
    textCase: style.textCase || 'ORIGINAL',
    paragraphIndent: style.paragraphIndent,
    paragraphSpacing: style.paragraphSpacing,
    listOptions: style.listOptions,
  };
}

/**
 * Extract dimension properties
 */
function extractDimensions(node: any): DimensionProperty {
  // Try multiple sources for dimensions
  const width = node.width || 
                node.absoluteBoundingBox?.width || 
                node.size?.x || 
                (node.absoluteBoundingBox ? node.absoluteBoundingBox.right - node.absoluteBoundingBox.left : 0);
  
  const height = node.height || 
                 node.absoluteBoundingBox?.height || 
                 node.size?.y || 
                 (node.absoluteBoundingBox ? node.absoluteBoundingBox.bottom - node.absoluteBoundingBox.top : 0);
  
  return {
    width: width || 0,
    height: height || 0,
    minWidth: node.minWidth,
    maxWidth: node.maxWidth,
    minHeight: node.minHeight,
    maxHeight: node.maxHeight,
  };
}

/**
 * Extract constraint properties
 */
function extractConstraints(node: any): ConstraintProperty | null {
  if (!node.constraints) {
    return null;
  }
  
  return {
    horizontal: node.constraints.horizontal || 'MIN',
    vertical: node.constraints.vertical || 'MIN',
  };
}

/**
 * Extract transform properties
 */
function extractTransform(node: any): TransformProperty | null {
  if (node.rotation === undefined && node.scaleFactor === undefined) {
    return null;
  }
  
  return {
    rotation: node.rotation || 0,
    scaleX: node.scaleFactor?.x,
    scaleY: node.scaleFactor?.y,
    skewX: node.skewX,
    skewY: node.skewY,
  };
}

/**
 * Main extraction function - extracts ALL properties from a Figma node
 */
export function extractAllProperties(node: any): ExtractedProperties {
  // Extract corner radius (can be single value or array for individual corners)
  let cornerRadius: number | undefined;
  let cornerRadii: [number, number, number, number] | undefined;
  
  if (node.cornerRadius !== undefined) {
    cornerRadius = node.cornerRadius;
  } else if (node.rectangleCornerRadii) {
    const radii = node.rectangleCornerRadii;
    if (Array.isArray(radii) && radii.length === 4) {
      cornerRadii = [radii[0], radii[1], radii[2], radii[3]];
    } else if (typeof radii === 'object' && radii.RECTANGLE_TOP_LEFT_CORNER_RADIUS !== undefined) {
      // Handle bound variables structure
      cornerRadius = 0; // Will be resolved via tokens
    }
  }
  
  const props: ExtractedProperties = {
    fills: extractFills(node),
    strokes: extractStrokes(node),
    effects: extractEffects(node),
    layout: extractLayout(node),
    typography: extractTypography(node),
    dimensions: extractDimensions(node),
    constraints: extractConstraints(node),
    transform: extractTransform(node),
    opacity: node.opacity !== undefined ? node.opacity : 1,
    blendMode: node.blendMode || null,
    clipsContent: node.clipsContent || false,
    isMask: node.isMask || false,
  };
  
  // Add corner radius to the properties object
  if (cornerRadius !== undefined) {
    (props as any).cornerRadius = cornerRadius;
  }
  if (cornerRadii) {
    (props as any).cornerRadii = cornerRadii;
  }
  
  return props;
}

/**
 * Convert extracted properties to CSS
 */
export function propertiesToCSS(props: ExtractedProperties): string {
  const css: string[] = [];
  
  // Opacity
  if (props.opacity !== 1) {
    css.push(`opacity: ${props.opacity};`);
  }
  
  // Blend mode
  if (props.blendMode && props.blendMode !== 'NORMAL') {
    css.push(`mix-blend-mode: ${props.blendMode.toLowerCase()};`);
  }
  
  // Clipping
  if (props.clipsContent) {
    css.push(`overflow: hidden;`);
  }
  
  // Fills (background)
  if (props.fills.length > 0) {
    const fill = props.fills[0];
    
    if (fill.type === 'SOLID' && fill.color) {
      const opacity = fill.opacity !== undefined ? fill.opacity : 1;
      if (opacity < 1) {
        const rgba = fill.color.replace('#', '');
        const r = parseInt(rgba.substring(0, 2), 16);
        const g = parseInt(rgba.substring(2, 4), 16);
        const b = parseInt(rgba.substring(4, 6), 16);
        css.push(`background-color: rgba(${r}, ${g}, ${b}, ${opacity});`);
      } else {
        css.push(`background-color: ${fill.color};`);
      }
    } else if (fill.type.startsWith('GRADIENT_')) {
      const gradientType = fill.type.replace('GRADIENT_', '').toLowerCase();
      let gradientCSS = '';
      
      if (fill.gradientStops && fill.gradientStops.length > 0) {
        const stops = fill.gradientStops.map(s => `${s.color} ${s.position * 100}%`).join(', ');
        
        if (gradientType === 'linear') {
          const angle = fill.gradientTransform ? gradientTransformToCSS(fill.gradientTransform) : '0deg';
          gradientCSS = `linear-gradient(${angle}, ${stops})`;
        } else if (gradientType === 'radial') {
          gradientCSS = `radial-gradient(circle, ${stops})`;
        } else if (gradientType === 'angular') {
          gradientCSS = `conic-gradient(${stops})`;
        } else if (gradientType === 'diamond') {
          gradientCSS = `radial-gradient(ellipse at center, ${stops})`;
        }
        
        css.push(`background: ${gradientCSS};`);
      }
    } else if (fill.type === 'IMAGE' && fill.imageRef) {
      css.push(`background-image: url('${fill.imageRef}');`);
      if (fill.scaleMode) {
        css.push(`background-size: ${fill.scaleMode === 'FILL' ? 'cover' : 'contain'};`);
      }
    }
  }
  
  // Strokes (borders)
  if (props.strokes.length > 0) {
    const stroke = props.strokes[0];
    
    if (stroke.color && stroke.width > 0) {
      const width = `${stroke.width}px`;
      const style = stroke.dashes && stroke.dashes.length > 0 ? 'dashed' : 'solid';
      
      // Handle stroke alignment
      if (stroke.align === 'INSIDE') {
        css.push(`border: ${width} ${style} ${stroke.color};`);
        css.push(`box-sizing: border-box;`);
      } else if (stroke.align === 'OUTSIDE') {
        css.push(`border: ${width} ${style} ${stroke.color};`);
        css.push(`box-sizing: border-box;`);
        css.push(`outline: ${width} ${style} ${stroke.color};`);
        css.push(`outline-offset: ${stroke.width}px;`);
      } else {
        css.push(`border: ${width} ${style} ${stroke.color};`);
      }
      
      // Stroke cap and join (for SVG paths, not applicable to CSS borders)
      // Dashes
      if (stroke.dashes && stroke.dashes.length > 0) {
        css.push(`border-style: dashed;`);
        css.push(`border-image: repeating-linear-gradient(90deg, ${stroke.color} 0, ${stroke.color} ${stroke.dashes[0]}px, transparent ${stroke.dashes[0]}px, transparent ${(stroke.dashes[0] + (stroke.dashes[1] || 0))}px) 1;`);
      }
    }
  }
  
  // Effects (shadows, blurs)
  const shadows: string[] = [];
  const blurs: string[] = [];
  
  for (const effect of props.effects) {
    if (effect.type === 'DROP_SHADOW' || effect.type === 'INNER_SHADOW') {
      const offsetX = effect.offset?.x || 0;
      const offsetY = effect.offset?.y || 0;
      const blur = effect.radius || 0;
      const spread = effect.spread || 0;
      const color = effect.color || 'rgba(0, 0, 0, 0.25)';
      const inset = effect.type === 'INNER_SHADOW' ? 'inset ' : '';
      
      shadows.push(`${inset}${offsetX}px ${offsetY}px ${blur}px ${spread}px ${color}`);
    } else if (effect.type === 'LAYER_BLUR' || effect.type === 'BACKGROUND_BLUR') {
      blurs.push(`blur(${effect.radius}px)`);
    }
  }
  
  if (shadows.length > 0) {
    css.push(`box-shadow: ${shadows.join(', ')};`);
  }
  
  if (blurs.length > 0) {
    css.push(`filter: ${blurs.join(' ')};`);
  }
  
  // Layout (Auto Layout)
  if (props.layout.layoutMode) {
    css.push(`display: flex;`);
    css.push(`flex-direction: ${props.layout.layoutMode === 'HORIZONTAL' ? 'row' : 'column'};`);
    
    if (props.layout.paddingLeft || props.layout.paddingRight || props.layout.paddingTop || props.layout.paddingBottom) {
      css.push(`padding: ${props.layout.paddingTop}px ${props.layout.paddingRight}px ${props.layout.paddingBottom}px ${props.layout.paddingLeft}px;`);
    }
    
    if (props.layout.itemSpacing > 0) {
      css.push(`gap: ${props.layout.itemSpacing}px;`);
    }
    
    if (props.layout.layoutWrap === 'WRAP') {
      css.push(`flex-wrap: wrap;`);
    }
    
    // Alignment
    if (props.layout.primaryAxisAlignItems === 'CENTER') {
      css.push(`justify-content: center;`);
    } else if (props.layout.primaryAxisAlignItems === 'MAX') {
      css.push(`justify-content: flex-end;`);
    } else if (props.layout.primaryAxisAlignItems === 'SPACE_BETWEEN') {
      css.push(`justify-content: space-between;`);
    }
    
    if (props.layout.counterAxisAlignItems === 'CENTER') {
      css.push(`align-items: center;`);
    } else if (props.layout.counterAxisAlignItems === 'STRETCH') {
      css.push(`align-items: stretch;`);
    }
  }
  
  // Dimensions
  if (props.dimensions.width > 0) {
    css.push(`width: ${props.dimensions.width}px;`);
  }
  if (props.dimensions.height > 0) {
    css.push(`height: ${props.dimensions.height}px;`);
  }
  if (props.dimensions.minWidth) {
    css.push(`min-width: ${props.dimensions.minWidth}px;`);
  }
  if (props.dimensions.maxWidth) {
    css.push(`max-width: ${props.dimensions.maxWidth}px;`);
  }
  if (props.dimensions.minHeight) {
    css.push(`min-height: ${props.dimensions.minHeight}px;`);
  }
  if (props.dimensions.maxHeight) {
    css.push(`max-height: ${props.dimensions.maxHeight}px;`);
  }
  
  // Typography
  if (props.typography) {
    const typo = props.typography;
    css.push(`font-family: '${typo.fontFamily}', sans-serif;`);
    css.push(`font-size: ${typo.fontSize}px;`);
    css.push(`font-weight: ${typo.fontWeight};`);
    
    if (typeof typo.lineHeight === 'number') {
      css.push(`line-height: ${typo.lineHeight}px;`);
    } else if (typo.lineHeight) {
      css.push(`line-height: ${typo.lineHeight.value}${typo.lineHeight.unit === 'PERCENT' ? '%' : 'px'};`);
    }
    
    if (typeof typo.letterSpacing === 'number') {
      css.push(`letter-spacing: ${typo.letterSpacing}px;`);
    } else if (typo.letterSpacing) {
      css.push(`letter-spacing: ${typo.letterSpacing.value}${typo.letterSpacing.unit === 'PERCENT' ? '%' : 'px'};`);
    }
    
    css.push(`text-align: ${typo.textAlignHorizontal.toLowerCase()};`);
    
    if (typo.textDecoration !== 'NONE') {
      css.push(`text-decoration: ${typo.textDecoration.toLowerCase()};`);
    }
    
    if (typo.textCase === 'UPPER') {
      css.push(`text-transform: uppercase;`);
    } else if (typo.textCase === 'LOWER') {
      css.push(`text-transform: lowercase;`);
    } else if (typo.textCase === 'TITLE') {
      css.push(`text-transform: capitalize;`);
    }
  }
  
  // Transform
  if (props.transform) {
    const transforms: string[] = [];
    if (props.transform.rotation !== 0) {
      transforms.push(`rotate(${props.transform.rotation}deg)`);
    }
    if (props.transform.scaleX !== undefined && props.transform.scaleX !== 1) {
      transforms.push(`scaleX(${props.transform.scaleX})`);
    }
    if (props.transform.scaleY !== undefined && props.transform.scaleY !== 1) {
      transforms.push(`scaleY(${props.transform.scaleY})`);
    }
    if (transforms.length > 0) {
      css.push(`transform: ${transforms.join(' ')};`);
    }
  }
  
  // Corner radius
  if (props.cornerRadii) {
    const [topLeft, topRight, bottomRight, bottomLeft] = props.cornerRadii;
    css.push(`border-radius: ${topLeft}px ${topRight}px ${bottomRight}px ${bottomLeft}px;`);
  } else if (props.cornerRadius !== undefined) {
    css.push(`border-radius: ${props.cornerRadius}px;`);
  }
  
  return css.join('\n  ');
}

