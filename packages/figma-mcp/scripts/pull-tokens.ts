// packages/figma-mcp/scripts/pull-tokens.ts
import 'dotenv/config';
import { fetchVariables } from './utils/figma.js';
import { mapToStyleDictionary } from './utils/map.js';
import { writeJSON } from './utils/fs.js';

export async function pullTokens(options: { mode?: string } = {}) {
  const fileKey = process.env.FIGMA_FILE_KEY!;
  if (!fileKey) throw new Error('FIGMA_FILE_KEY missing');

  const raw = await fetchVariables(fileKey);

  // Generate files for each collection/mode combination
  // Format: {brand}.{theme}.json (e.g., default.light.json, figjam.dark.json)
  const filesWritten: string[] = [];

  for (const collection of raw.collections) {
    for (const mode of collection.modes || []) {
      const modeKey = `${collection.name}/${mode}`;
      
      // If a specific mode is requested, skip others
      if (options.mode && modeKey !== options.mode) continue;
      
      const sd = await mapToStyleDictionary(raw, modeKey);

      // Normalize collection name to brand name
      // Core -> default, Brand -> brand, etc.
      const brandName = collection.name.toLowerCase() === 'core' 
        ? 'default' 
        : collection.name.toLowerCase();
      
      const themeName = mode.toLowerCase();
      const filename = `packages/tokens/dist/${brandName}.${themeName}.json`;

      await writeJSON(filename, sd);
      filesWritten.push(filename);
    }
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
