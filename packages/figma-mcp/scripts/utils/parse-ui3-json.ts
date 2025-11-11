// packages/figma-mcp/scripts/utils/parse-ui3-json.ts
/**
 * Parse UI3_Variables.json (Token Studio format) into our expected format
 * Handles: Colors, Sizing (Spacers, Radius), Typography
 */
import { readJSON } from './fs.js';

interface UI3Token {
  $value?: string | number | { r: number; g: number; b: number; a?: number };
  $type?: string;
  $codeSyntax?: { WEB?: string };
  $description?: string;
}

interface UI3Collection {
  Colors?: {
    modes?: {
      [modeName: string]: any;
    };
  };
  Sizing?: {
    modes?: {
      [modeName: string]: {
        Spacers?: any;
        Radius?: any;
      };
    };
  };
  Typography?: {
    modes?: {
      [modeName: string]: any;
    };
  };
}

/**
 * Convert RGBA object to hex/rgba string
 */
function rgbaToHex(rgba: { r: number; g: number; b: number; a?: number }): string {
  const r = Math.round(rgba.r * 255);
  const g = Math.round(rgba.g * 255);
  const b = Math.round(rgba.b * 255);
  const a = rgba.a !== undefined ? rgba.a : 1;
  if (a < 1) {
    return `rgba(${r}, ${g}, ${b}, ${a})`;
  }
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

/**
 * Convert numeric value to string with unit (px for spacing/radius, or as-is for typography)
 */
function formatValue(value: number | string, type: string): string {
  if (typeof value === 'string') return value;
  if (typeof value === 'number') {
    if (type === 'FLOAT' || type === 'float') {
      return `${value}px`; // Spacing and radius use px
    }
    return String(value); // Typography weights are unitless
  }
  return String(value);
}

/**
 * Resolve token value - handles references and converts types
 */
function resolveValue(
  value: any,
  allCollections: UI3Collection[],
  collectionName: string,
  mode: string,
  visited = new Set<string>()
): string | null {
  if (!value) return null;
  
  // If it's a direct color object
  if (typeof value === 'object' && value.r !== undefined) {
    return rgbaToHex(value);
  }
  
  // If it's a string reference like "{✦.text.default.default}" or "{font.family.default}"
  if (typeof value === 'string' && value.startsWith('{') && value.endsWith('}')) {
    const refPath = value.slice(1, -1); // Remove { }
    if (visited.has(refPath)) {
      console.warn(`⚠️  Circular reference detected: ${refPath}`);
      return null;
    }
    visited.add(refPath);
    
    // Try to resolve from all collections
    for (const coll of allCollections) {
      // Check Colors collection
      if (coll.Colors?.modes?.[mode]) {
        const parts = refPath.split('.');
        let current: any = coll.Colors.modes[mode];
        for (const part of parts) {
          if (current && typeof current === 'object') {
            current = current[part];
          } else {
            break;
          }
        }
        if (current && current.$value) {
          const resolved = resolveValue(current.$value, allCollections, collectionName, mode, visited);
          if (resolved) return resolved;
        }
      }
      
      // Check Typography collection for font references
      if (coll.Typography?.modes?.[mode]) {
        const parts = refPath.split('.');
        let current: any = coll.Typography.modes[mode];
        for (const part of parts) {
          if (current && typeof current === 'object') {
            current = current[part];
          } else {
            break;
          }
        }
        if (current && current.$value !== undefined) {
          return resolveValue(current.$value, allCollections, collectionName, mode, visited);
        }
      }
    }
    
    // If we can't resolve, return null
    return null;
  }
  
  // If it's a plain string or number
  if (typeof value === 'string' || typeof value === 'number') {
    return String(value);
  }
  
  return null;
}

/**
 * Flatten nested token structure into flat paths
 */
function flattenTokens(
  obj: any,
  prefix: string = '',
  mode: string,
  collectionName: string,
  allCollections: UI3Collection[],
  result: Array<{ name: string; value: string; type: string }> = []
): Array<{ name: string; value: string; type: string }> {
  for (const [key, val] of Object.entries(obj)) {
    if (key.startsWith('$')) continue; // Skip metadata
    
    const fullPath = prefix ? `${prefix}.${key}` : key;
    
    if (val && typeof val === 'object' && '$value' in val) {
      // This is a token
      const token = val as UI3Token;
      const resolved = resolveValue(token.$value, allCollections, collectionName, mode);
      if (resolved !== null) {
        const formatted = formatValue(resolved, token.$type || 'COLOR', fullPath);
        result.push({
          name: fullPath,
          value: formatted,
          type: token.$type || 'COLOR',
        });
      }
    } else if (val && typeof val === 'object' && !Array.isArray(val)) {
      // Nested object, recurse
      flattenTokens(val, fullPath, mode, collectionName, allCollections, result);
    }
  }
  
  return result;
}

/**
 * Parse UI3_Variables.json into our expected format
 */
export async function parseUI3Variables(): Promise<{
  variables: Array<{
    name: string;
    type: string;
    resolvedValues: Record<string, string>;
  }>;
  collections: Array<{
    name: string;
    modes: string[];
  }>;
}> {
  const ui3Data = await readJSON<UI3Collection[]>('packages/figma-mcp/config/data/UI3_Variables.json');
  
  const collections: Array<{ name: string; modes: string[] }> = [];
  const variablesMap = new Map<string, Map<string, string>>(); // name -> mode -> value
  
  // Process each collection
  for (const collection of ui3Data) {
    // Process Colors collection
    if (collection.Colors?.modes) {
      const modeNames = Object.keys(collection.Colors.modes);
      const collectionName = 'Colors';
      
      if (!collections.find(c => c.name === collectionName)) {
        collections.push({ name: collectionName, modes: modeNames });
      }
      
      for (const [modeName, modeData] of Object.entries(collection.Colors.modes)) {
        const tokens = flattenTokens(modeData, '', modeName, collectionName, ui3Data);
        
        for (const token of tokens) {
          // Token name already includes ✦. from the flattening, so don't double-prefix
          const tokenName = token.name.startsWith('✦.') ? token.name : `✦.${token.name}`;
          if (!variablesMap.has(tokenName)) {
            variablesMap.set(tokenName, new Map());
          }
          variablesMap.get(tokenName)!.set(modeName, token.value);
        }
      }
    }
    
    // Process Sizing collection (Spacers and Radius)
    if (collection.Sizing?.modes) {
      const modeNames = Object.keys(collection.Sizing.modes);
      const collectionName = 'Sizing';
      
      if (!collections.find(c => c.name === collectionName)) {
        collections.push({ name: collectionName, modes: modeNames });
      }
      
      for (const [modeName, modeData] of Object.entries(collection.Sizing.modes)) {
        // Process Spacers
        if (modeData.Spacers) {
          const tokens = flattenTokens(modeData.Spacers, 'Spacers', modeName, collectionName, ui3Data);
          for (const token of tokens) {
            // Map spacer-X to space.X format
            const tokenName = token.name.replace('Spacers.spacer-', 'space.');
            if (!variablesMap.has(tokenName)) {
              variablesMap.set(tokenName, new Map());
            }
            variablesMap.get(tokenName)!.set(modeName, token.value);
          }
        }
        
        // Process Radius
        if (modeData.Radius) {
          const tokens = flattenTokens(modeData.Radius, 'Radius', modeName, collectionName, ui3Data);
          for (const token of tokens) {
            // Map radius-X to radius.X format
            let tokenName = token.name.replace('Radius.radius-', 'radius.');
            // Handle special cases
            tokenName = tokenName.replace('radius.small', 'radius.sm');
            tokenName = tokenName.replace('radius.medium', 'radius.md');
            tokenName = tokenName.replace('radius.large', 'radius.lg');
            tokenName = tokenName.replace('radius.none', 'radius.none');
            tokenName = tokenName.replace('radius.full', 'radius.full');
            
            if (!variablesMap.has(tokenName)) {
              variablesMap.set(tokenName, new Map());
            }
            variablesMap.get(tokenName)!.set(modeName, token.value);
          }
        }
      }
    }
    
    // Process Typography collection
    if (collection.Typography?.modes) {
      const modeNames = Object.keys(collection.Typography.modes);
      const collectionName = 'Typography';
      
      if (!collections.find(c => c.name === collectionName)) {
        collections.push({ name: collectionName, modes: modeNames });
      }
      
      for (const [modeName, modeData] of Object.entries(collection.Typography.modes)) {
        const tokens = flattenTokens(modeData, '', modeName, collectionName, ui3Data);
        
        for (const token of tokens) {
          // Format: font.family.default, font.weight.medium, body.medium.fontSize, etc.
          const tokenName = token.name;
          if (!variablesMap.has(tokenName)) {
            variablesMap.set(tokenName, new Map());
          }
          variablesMap.get(tokenName)!.set(modeName, token.value);
        }
      }
    }
  }
  
  // Convert to expected format
  const variables = Array.from(variablesMap.entries()).map(([name, modeMap]) => {
    const resolvedValues: Record<string, string> = {};
    
    // Determine collection name from token name
    let collName = 'Colors';
    if (name.startsWith('space.') || name.startsWith('radius.')) {
      collName = 'Sizing';
    } else if (name.startsWith('font.') || name.startsWith('body.')) {
      collName = 'Typography';
    }
    
    for (const [modeName, value] of modeMap.entries()) {
      // Format: "CollectionName/ModeName"
      resolvedValues[`${collName}/${modeName}`] = value;
    }
    
    // Determine type
    let type = 'COLOR';
    if (name.startsWith('space.') || name.startsWith('radius.')) {
      type = 'FLOAT';
    } else if (name.startsWith('font.') || name.startsWith('body.')) {
      type = name.includes('fontSize') || name.includes('lineHeight') || name.includes('letterSpacing') 
        ? 'FLOAT' 
        : name.includes('fontWeight') 
        ? 'FLOAT' 
        : 'STRING';
    }
    
    return {
      name,
      type,
      resolvedValues,
    };
  });
  
  return {
    variables,
    collections: collections.length > 0 ? collections : [{ name: 'Colors', modes: ['Light', 'Dark'] }],
  };
}
