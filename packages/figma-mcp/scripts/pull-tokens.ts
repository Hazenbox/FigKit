// packages/figma-mcp/scripts/pull-tokens.ts
import 'dotenv/config';
import { fetchVariables } from './utils/figma.js';
import { mapToStyleDictionary } from './utils/map.js';
import { writeJSON } from './utils/fs.js';

export async function pullTokens(options: { mode?: string } = {}) {
  // fileKey is optional if using UI3_Variables.json
  const fileKey = process.env.FIGMA_FILE_KEY;

  const raw = await fetchVariables(fileKey || '');

  // Generate files for each collection/mode combination
  // Format: {brand}.{theme}.json (e.g., default.light.json, figjam.dark.json)
  const filesWritten: string[] = [];

  // Group by brand/theme combinations
  const brandThemeMap = new Map<string, any>();
  
  for (const collection of raw.collections) {
    for (const mode of collection.modes || []) {
      const modeKey = `${collection.name}/${mode}`;
      
      // If a specific mode is requested, skip others
      if (options.mode && modeKey !== options.mode) continue;
      
      const sd = await mapToStyleDictionary(raw, modeKey);

      // Normalize collection name to brand name
      // Colors -> default (UI3 uses "Colors" as the main collection)
      // Sizing and Typography are universal (not brand-specific)
      let brandName: string;
      let themeName: string;
      
      if (collection.name === 'Colors') {
        brandName = 'default';
        themeName = mode.toLowerCase();
      } else if (collection.name === 'Sizing' || collection.name === 'Typography') {
        // Sizing and Typography are universal - merge into all brand/theme files
        // We'll handle this separately
        brandName = 'default';
        themeName = 'light'; // Default, will be merged into all
      } else {
        brandName = collection.name.toLowerCase();
        themeName = mode.toLowerCase();
      }
      
      const key = `${brandName}.${themeName}`;
      
      if (!brandThemeMap.has(key)) {
        brandThemeMap.set(key, {});
      }
      
      // Merge tokens into the brand/theme object
      Object.assign(brandThemeMap.get(key), sd);
    }
  }
  
  // For Sizing and Typography, merge into all brand/theme combinations
  const sizingTokens = brandThemeMap.get('default.light') || {};
  const typographyTokens = brandThemeMap.get('default.light') || {};
  
  // Extract Sizing and Typography tokens
  const sizingOnly: any = {};
  const typographyOnly: any = {};
  
  for (const [key, value] of Object.entries(sizingTokens)) {
    if (key.startsWith('space.') || key.startsWith('radius.')) {
      sizingOnly[key] = value;
    }
  }
  
  for (const [key, value] of Object.entries(typographyTokens)) {
    if (key.startsWith('font.') || key.startsWith('body.')) {
      typographyOnly[key] = value;
    }
  }
  
  // Merge Sizing and Typography into all brand/theme files
  for (const [key, tokens] of brandThemeMap.entries()) {
    if (key.startsWith('default.')) {
      Object.assign(tokens, sizingOnly);
      Object.assign(tokens, typographyOnly);
    }
  }
  
  // Write merged files
  for (const [key, tokens] of brandThemeMap.entries()) {
    const filename = `packages/tokens/dist/${key}.json`;
    await writeJSON(filename, tokens);
    filesWritten.push(filename);
  }

  // Also write a default tokens.json for backward compatibility (Core/Light)
  const defaultSd = await mapToStyleDictionary(raw, 'Core/Light');
  await writeJSON('packages/tokens/src/tokens.json', defaultSd);
  filesWritten.push('packages/tokens/src/tokens.json');

  return {
    success: true,
    filesWritten,
    message: `✅ Token files generated: ${filesWritten.length} files`
  };
}

async function main() {
  const result = await pullTokens();
  console.log(result.message);
  result.filesWritten.forEach(f => console.log(`   - ${f}`));
  console.log('👉 Next: pnpm build:tokens');
}

// Only run main if this is the entry point (not imported)
if (import.meta.url.endsWith(process.argv[1]) || process.argv[1]?.includes('pull-tokens.ts')) {
  main().catch((e) => {
    console.error('pull-tokens failed:', e);
    process.exit(1);
  });
}
