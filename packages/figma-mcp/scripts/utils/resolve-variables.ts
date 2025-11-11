// packages/figma-mcp/scripts/utils/resolve-variables.ts
import axios from 'axios';
import 'dotenv/config';
import { rgbaToHex } from './extract-colors.js';

/**
 * Resolve bound variables from Figma to get actual color values
 */
export async function resolveBoundVariable(
  fileKey: string,
  variableId: string,
  modeId?: string
): Promise<string | null> {
  const pat = process.env.FIGMA_PAT;
  if (!pat) return null;

  try {
    // Fetch variables from the file
    const { data } = await axios.get(
      `https://api.figma.com/v1/files/${fileKey}/variables`,
      {
        headers: { 'X-Figma-Token': pat },
      }
    );

    // Find the variable by ID
    const variable = data?.meta?.variables?.find((v: any) => v.id === variableId);
    if (!variable) {
      // Try alternative API structure
      const altVariable = data?.variables?.find((v: any) => v.id === variableId);
      if (!altVariable) return null;
      
      // Get value for the mode
      const valuesByMode = altVariable.valuesByMode || altVariable.valuesByModeMap || {};
      const value = modeId ? valuesByMode[modeId] : Object.values(valuesByMode)[0];
      
      if (value && typeof value === 'object' && value.r !== undefined) {
        return rgbaToHex(value);
      }
      return null;
    }

    // Get value for the mode
    const valuesByMode = variable.valuesByMode || variable.valuesByModeMap || {};
    const value = modeId ? valuesByMode[modeId] : Object.values(valuesByMode)[0];
    
    if (value && typeof value === 'object' && value.r !== undefined) {
      return rgbaToHex(value);
    }
    
    // If it's an alias, resolve recursively
    if (value && typeof value === 'object' && value.type === 'VARIABLE_ALIAS') {
      return resolveBoundVariable(fileKey, value.id, modeId);
    }
    
    return null;
  } catch (error) {
    console.warn(`⚠️  Could not resolve variable ${variableId}:`, error);
    return null;
  }
}

