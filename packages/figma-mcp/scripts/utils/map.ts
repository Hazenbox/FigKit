import { readJSON } from './fs.js';

type RawVar = {
  name: string;
  type: 'COLOR' | 'FLOAT' | 'STRING' | 'BOOLEAN' | 'ALIAS';
  resolvedValues: Record<string, string | number | boolean>;
};

type Mapping = {
  mappings?: Record<string, string>;
  variables?: Record<string, string>;
};

export type SDTree = Record<string, any>;

function setDeep(obj: SDTree, path: string, value: any) {
  const parts = path.split('/');
  let cur = obj;
  for (let i = 0; i < parts.length - 1; i++) cur = cur[parts[i]] = cur[parts[i]] || {};
  cur[parts[parts.length - 1]] = value;
}

export async function mapToStyleDictionary(
  raw: { variables: RawVar[]; collections: any[] },
  modeKey?: string
) {
  const mapping = await readJSON<Mapping>('packages/figma-mcp/config/mapping.json');
  const out: SDTree = {};

  // If modeKey is provided, use it; otherwise default to "Core/Light"
  const targetModeKey = modeKey || 'Core/Light';

  for (const v of raw.variables) {
    const targetPath = mapping.mappings?.[v.name] || mapping.variables?.[v.name];
    if (!targetPath) continue;

    // Get value for the specified mode
    let value = v.resolvedValues[targetModeKey];
    
    // If value not found for this mode, skip this variable
    if (value === undefined) continue;

    // Normalize types to SD value strings
    if (v.type === 'FLOAT' && typeof value === 'number') value = `${value}px`;
    if (v.type === 'BOOLEAN') value = String(value);
    if (typeof value !== 'string') value = String(value);

    setDeep(out, targetPath, { value });
  }

  return out;
}
