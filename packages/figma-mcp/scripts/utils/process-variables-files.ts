import { readJSON } from './fs.js';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readdir, readFile } from 'fs/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '../../../../');

type ColorTokenFile = {
  brand: string;
  theme: string;
  modeName: string;
  modeId: string;
  tokens: Record<string, string>;
};

type TypographyToken = {
  id: string;
  name: string;
  type: string;
  valuesByMode: Record<string, any>;
  resolvedValuesByMode: Record<string, { resolvedValue: any; alias?: string; aliasName?: string }>;
};

type TypographyFile = {
  id: string;
  name: string;
  modes: Record<string, string>;
  variableIds: string[];
  variables: TypographyToken[];
};

type SizingToken = {
  id: string;
  name: string;
  type: string;
  valuesByMode: Record<string, any>;
  resolvedValuesByMode: Record<string, { resolvedValue: any; alias?: string; aliasName?: string }>;
};

type SizingFile = {
  id: string;
  name: string;
  modes: Record<string, string>;
  variableIds: string[];
  variables: SizingToken[];
};

type Mapping = {
  mappings: Record<string, string>;
};

type SDTree = Record<string, any>;

/**
 * Set a value in a nested object using a path like "color/text/default"
 */
function setDeep(obj: SDTree, path: string, value: any) {
  const parts = path.split('/');
  let cur = obj;
  for (let i = 0; i < parts.length - 1; i++) {
    cur = cur[parts[i]] = cur[parts[i]] || {};
  }
  cur[parts[parts.length - 1]] = { value };
}

/**
 * Convert Figma token name to semantic path using mapping.json
 * Handles both formats: ✦/_text/text-default and ✦._text.text-default
 */
function mapTokenName(figmaName: string, mapping: Mapping): string | null {
  // Try exact match first
  if (mapping.mappings[figmaName]) {
    return mapping.mappings[figmaName];
  }
  
  // Normalize forward slashes to dots (✦/_text/text-default -> ✦._text.text-default)
  const normalized = figmaName.replace(/\//g, '.');
  if (mapping.mappings[normalized]) {
    return mapping.mappings[normalized];
  }
  
  return null;
}

/**
 * Process typography tokens from typography.json
 */
function processTypographyTokens(typographyFile: TypographyFile, mapping: Mapping): SDTree {
  const tokens: SDTree = {};
  const modeId = Object.keys(typographyFile.modes)[0]; // Get first mode
  
  for (const variable of typographyFile.variables) {
    const resolved = variable.resolvedValuesByMode[modeId];
    if (!resolved) continue;
    
    let value: string | number = resolved.resolvedValue;
    const name = variable.name;
    
    // Try to map using mapping.json first
    // Convert forward slashes to dots for lookup: font/family/default -> font.family.default
    const normalizedName = name.replace(/\//g, '.');
    const semanticPath = mapping.mappings[normalizedName];
    
    if (semanticPath) {
      // Add units for fontSize, lineHeight, letterSpacing
      if (name.includes('fontSize') || name.includes('lineHeight') || name.includes('letterSpacing')) {
        if (typeof value === 'number') {
          value = `${value}px`;
        }
      }
      setDeep(tokens, semanticPath, value);
    } else {
      // Fallback: use the name directly with forward slashes converted to dots
      const path = normalizedName;
      // Add units for fontSize, lineHeight, letterSpacing
      if (name.includes('fontSize') || name.includes('lineHeight') || name.includes('letterSpacing')) {
        if (typeof value === 'number') {
          value = `${value}px`;
        }
      }
      setDeep(tokens, path, value);
    }
  }
  
  return tokens;
}

/**
 * Process sizing tokens from sizing.json
 */
function processSizingTokens(sizingFile: SizingFile, mapping: Mapping): SDTree {
  const tokens: SDTree = {};
  const modeId = Object.keys(sizingFile.modes)[0]; // Get first mode
  
  for (const variable of sizingFile.variables) {
    const resolved = variable.resolvedValuesByMode[modeId];
    if (!resolved) continue;
    
    let value: string | number = resolved.resolvedValue;
    const name = variable.name;
    
    // Try to map using mapping.json first
    // Convert forward slashes to dots: Spacers/spacer-1 -> Spacers.spacer-1
    const normalizedName = name.replace(/\//g, '.');
    let semanticPath = mapping.mappings[normalizedName];
    
    // If not found, try to map manually
    if (!semanticPath) {
      if (name.startsWith('Spacers/')) {
        // Format: Spacers/spacer-1 -> space.1
        const match = name.match(/spacer-(\d+)/);
        if (match) {
          const num = match[1];
          semanticPath = `space.${num}`;
        }
      } else if (name.startsWith('Radius/')) {
        // Format: Radius/radius-small -> radius.sm
        if (name.includes('radius-small')) {
          semanticPath = 'radius.sm';
        } else if (name.includes('radius-medium')) {
          semanticPath = 'radius.md';
        } else if (name.includes('radius-large')) {
          semanticPath = 'radius.lg';
        } else if (name.includes('radius-none')) {
          semanticPath = 'radius.none';
        } else if (name.includes('radius-full')) {
          semanticPath = 'radius.full';
        }
      }
    }
    
    if (semanticPath) {
      // Add px unit if it's a number (except for radius-full which is 9999px)
      if (typeof value === 'number') {
        if (semanticPath === 'radius.full') {
          value = '9999px';
        } else {
          value = `${value}px`;
        }
      }
      // Convert dots to slashes for setDeep
      const path = semanticPath.replace(/\./g, '/');
      setDeep(tokens, path, value);
    }
  }
  
  return tokens;
}

/**
 * Process color tokens from a color file
 */
function processColorTokens(
  colorFile: ColorTokenFile,
  mapping: Mapping
): SDTree {
  const tokens: SDTree = {};
  
  for (const [figmaName, value] of Object.entries(colorFile.tokens)) {
    const semanticPath = mapTokenName(figmaName, mapping);
    if (!semanticPath) {
      // Skip unmapped tokens (they might be new or not needed)
      continue;
    }
    
    setDeep(tokens, semanticPath, value);
  }
  
  return tokens;
}

/**
 * Main function to process all variable files
 */
export async function processVariableFiles(): Promise<{
  brandThemeTokens: Map<string, SDTree>;
  typographyTokens: SDTree;
  sizingTokens: SDTree;
}> {
  const variablesDir = join(rootDir, 'variables');
  const mapping = await readJSON<Mapping>('packages/figma-mcp/config/mapping.json');
  
  // Read typography and sizing (universal tokens)
  const typographyPath = join(variablesDir, 'typography.json');
  const sizingPath = join(variablesDir, 'sizing.json');
  const typographyContent = await readFile(typographyPath, 'utf-8');
  const sizingContent = await readFile(sizingPath, 'utf-8');
  const typographyFile = JSON.parse(typographyContent) as TypographyFile;
  const sizingFile = JSON.parse(sizingContent) as SizingFile;
  
  const typographyTokens = processTypographyTokens(typographyFile, mapping);
  const sizingTokens = processSizingTokens(sizingFile, mapping);
  
  // Read all color files
  const files = await readdir(variablesDir);
  const colorFiles = files.filter(f => f.startsWith('colors.') && f.endsWith('.json'));
  
  const brandThemeTokens = new Map<string, SDTree>();
  
  for (const colorFile of colorFiles) {
    const colorPath = join(variablesDir, colorFile);
    const colorContent = await readFile(colorPath, 'utf-8');
    const colorData = JSON.parse(colorContent) as ColorTokenFile;
    
    // Extract brand and theme from filename: colors.{brand}.{theme}.json
    const match = colorFile.match(/^colors\.(.+)\.(.+)\.json$/);
    if (!match) continue;
    
    const [, brand, theme] = match;
    const key = `${brand}.${theme}`;
    
    // Process color tokens
    const colorTokens = processColorTokens(colorData, mapping);
    
    // Merge with typography and sizing
    const allTokens: SDTree = {
      ...colorTokens,
      ...typographyTokens,
      ...sizingTokens,
    };
    
    brandThemeTokens.set(key, allTokens);
  }
  
  return {
    brandThemeTokens,
    typographyTokens,
    sizingTokens,
  };
}

