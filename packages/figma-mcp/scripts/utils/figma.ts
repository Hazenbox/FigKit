import axios from 'axios';
import { readJSON } from './fs.js';

const BASE = 'https://api.figma.com/v1';

export async function fetchVariables(fileKey: string) {
  // Check if UI3_Variables.json exists - use it if available
  try {
    const { parseUI3Variables } = await import('./parse-ui3-json.js');
    const ui3Data = await parseUI3Variables();
    console.log('✅ Using UI3_Variables.json file');
    return ui3Data;
  } catch (err: any) {
    // If UI3 file doesn't exist or parsing fails, continue with API/mock
    if (err.code !== 'ENOENT') {
      console.warn('⚠️  Could not parse UI3_Variables.json, falling back to API/mock:', err.message);
    }
  }
  
  if (process.env.USE_MOCK === 'true') {
    return readJSON<any>('packages/figma-mcp/config/mock-variables.json');
  }

  const pat = process.env.FIGMA_PAT;
  if (!pat) throw new Error('FIGMA_PAT missing');

  // 1) Get variable collections + variables with modes & values
  // NOTE: API object shapes can evolve; keep this tolerant and map by name.
  const headers = { 'X-Figma-Token': pat };

  // Variables endpoint: try different endpoints
  let data: any;
  try {
    // Try the variables endpoint (without /local)
    const response = await axios.get(`${BASE}/files/${fileKey}/variables`, { headers });
    data = response.data;
  } catch (err: any) {
    if (err.response?.status === 404 || err.response?.status === 403) {
      // Try the local variables endpoint
      try {
        console.log('⚠️  /variables endpoint not available, trying /variables/local...');
        const localResponse = await axios.get(`${BASE}/files/${fileKey}/variables/local`, { headers });
        data = localResponse.data;
      } catch (localErr: any) {
        if (localErr.response?.status === 404 || localErr.response?.status === 403) {
          console.error('❌ Both /variables and /variables/local endpoints returned 404/403.');
          console.error('   This might mean:');
          console.error('   1. The file does not have variables defined');
          console.error('   2. Your token does not have access to variables');
          console.error('   3. Variables might need to be exported via a Figma plugin');
          console.error('\n   For now, use USE_MOCK=true to test with mock data.');
          throw new Error('Variables endpoint not accessible. Use USE_MOCK=true for testing.');
        }
        throw localErr;
      }
    } else {
      throw err;
    }
  }

  // Temporary: log the response structure to understand the API shape
  console.log('📦 Figma API response structure:');
  console.dir(data, { depth: 4 });

  // Expect a shape: { variableCollections: [...], variables: [...] }
  // Normalize into the shape our mapper expects:
  const collections = (data.variableCollections || data.meta?.variableCollections || []).map((c: any) => ({
    name: c.name, 
    id: c.id,
    modes: c.modes?.map((m: any) => ({ name: m.name, id: m.modeId || m.id })) ?? []
  }));

  // Helper to resolve alias values
  const resolveAlias = (value: any, variablesMap: Map<string, any>, visited = new Set<string>()): any => {
    if (typeof value !== 'object' || !value) return value;
    if (value.type === 'VARIABLE_ALIAS' && value.id) {
      if (visited.has(value.id)) {
        console.warn(`⚠️  Circular alias detected for variable ID: ${value.id}`);
        return value;
      }
      visited.add(value.id);
      const aliasedVar = variablesMap.get(value.id);
      if (aliasedVar) {
        // Resolve the first mode value as default
        const firstModeValue = Object.values(aliasedVar.valuesByMode || aliasedVar.valuesByModeMap || {})[0];
        return resolveAlias(firstModeValue, variablesMap, visited);
      }
    }
    return value;
  };

  // Helper to convert RGBA object to hex string
  const rgbaToHex = (rgba: any): string => {
    if (typeof rgba === 'string') return rgba;
    if (typeof rgba !== 'object' || !rgba) return String(rgba);
    
    if (rgba.r !== undefined && rgba.g !== undefined && rgba.b !== undefined) {
      const a = rgba.a !== undefined ? rgba.a : 1;
      const r = Math.round(rgba.r * 255);
      const g = Math.round(rgba.g * 255);
      const b = Math.round(rgba.b * 255);
      return a < 1 ? `rgba(${r},${g},${b},${a})` : `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
    }
    return String(rgba);
  };

  const variablesList = data.variables || data.meta?.variables || [];
  const variablesMap = new Map(variablesList.map((v: any) => [v.id, v]));

  const variables = variablesList.map((v: any) => {
    // Build resolvedValues as "<CollectionName>/<ModeName>" → value
    const resolvedValues: Record<string, string | number | boolean> = {};
    
    // Handle different API response shapes
    const valuesByMode = v.valuesByMode || v.valuesByModeMap || {};
    
    for (const [modeId, rawValue] of Object.entries(valuesByMode)) {
      // Find collection and mode by ID
      let coll: any = null;
      let mode: any = null;
      
      // Try to find collection by checking if modeId matches any mode in collections
      for (const c of collections) {
        const foundMode = c.modes?.find((m: any) => m.id === modeId || m.modeId === modeId);
        if (foundMode) {
          coll = c;
          mode = foundMode;
          break;
        }
      }
      
      // Fallback: try to find by collection ID if variable has it
      if (!coll && (v.variableCollectionId || v.collectionId)) {
        const collId = v.variableCollectionId || v.collectionId;
        const foundColl = collections.find((c: any) => c.id === collId);
        if (foundColl) {
          coll = foundColl;
          mode = foundColl.modes?.find((m: any) => m.id === modeId || m.modeId === modeId);
        }
      }
      
      if (!coll || !mode) {
        console.warn(`⚠️  Could not find collection/mode for variable ${v.name}, modeId: ${modeId}`);
        continue;
      }
      
      const collName = coll.name || 'Core';
      const modeName = mode.name || 'Light';
      
      // Resolve alias if needed
      const resolved = resolveAlias(rawValue, variablesMap);
      
      // Extract and convert value
      let finalValue: string | number | boolean = resolved;
      if (typeof resolved === 'object' && resolved !== null) {
        // Handle color objects
        if (resolved.r !== undefined || resolved.type === 'VARIABLE_ALIAS') {
          finalValue = rgbaToHex(resolved);
        } else {
          finalValue = String(resolved);
        }
      }
      
      resolvedValues[`${collName}/${modeName}`] = finalValue;
    }
    
    return {
      name: v.name,
      type: v.resolvedType || v.type || 'COLOR',
      resolvedValues
    };
  });

  return { variables, collections };
}
