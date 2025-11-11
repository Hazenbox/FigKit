// packages/figma-mcp/scripts/utils/token-map.ts
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '../../../../');
const MAP_PATH = join(rootDir, 'packages/figma-mcp/config/mapping.json');

type Mapping = { mappings?: Record<string, string>; variables?: Record<string, string> };

let mapCache: Mapping | null = null;

function loadMapping(): Mapping {
  if (mapCache) return mapCache;
  try {
    mapCache = JSON.parse(readFileSync(MAP_PATH, 'utf8'));
    return mapCache!;
  } catch (error) {
    console.warn(`⚠️  Could not load mapping.json: ${error}`);
    return { mappings: {}, variables: {} };
  }
}

export function mapFigmaKeyToSemantic(figmaKey: string): string | null {
  const map = loadMapping();
  const mappings = map.mappings || map.variables || {};
  
  // Try direct match
  if (mappings[figmaKey]) {
    return mappings[figmaKey];
  }
  
  // Try endsWith match (for partial keys)
  const found = Object.keys(mappings).find((k) => figmaKey.endsWith(k));
  if (found) {
    return mappings[found];
  }
  
  // Try startsWith match (for prefixed keys)
  const foundPrefix = Object.keys(mappings).find((k) => figmaKey.startsWith(k));
  if (foundPrefix) {
    return mappings[foundPrefix];
  }
  
  return null;
}

export function cssVar(path: string): string {
  // Convert "color.bg.brand.primary" → "--color-bg-brand-primary"
  return `var(--${path.replace(/\./g, '-')})`;
}

export function getTokenFallback(category: 'bg' | 'text' | 'border', variant: string = 'default'): string {
  const fallbacks: Record<string, Record<string, string>> = {
    bg: {
      default: 'color.bg.brand',
      primary: 'color.bg.brand.default',
      secondary: 'color.bg.component.default',
    },
    text: {
      default: 'color.text.component.oncomponent',
      onbrand: 'color.text.onbrand',
    },
    border: {
      default: 'color.border.component.default',
    },
  };
  
  return fallbacks[category]?.[variant] || fallbacks[category]?.default || `color.${category}.default`;
}

