// packages/figma-mcp/scripts/pull-tokens-from-files.ts
import { writeJSON } from './utils/fs.js';
import { processVariableFiles } from './utils/process-variables-files.js';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
// Script is in packages/figma-mcp/scripts/, so go up 3 levels to project root
const rootDir = join(__dirname, '../../../');

/**
 * Pull tokens from the variables/ folder and generate Style Dictionary files
 */
export async function pullTokensFromFiles() {
  console.log('📦 Processing token files from variables/ folder...');
  
  const { brandThemeTokens, typographyTokens, sizingTokens } = await processVariableFiles();
  
  const filesWritten: string[] = [];
  const tokensDistDir = join(rootDir, 'packages/tokens/dist');
  
  // Write individual brand/theme files
  for (const [key, tokens] of brandThemeTokens.entries()) {
    const filename = join(tokensDistDir, `${key}.json`);
    try {
      await writeJSON(filename, tokens);
      filesWritten.push(filename);
      console.log(`  ✅ Generated ${key}.json`);
    } catch (error) {
      console.error(`  ❌ Failed to write ${key}.json:`, error);
    }
  }
  
  // Also write a default tokens.json for backward compatibility (default.light)
  const defaultTokens = brandThemeTokens.get('default.light') || {};
  await writeJSON(join(rootDir, 'packages/tokens/src/tokens.json'), defaultTokens);
  filesWritten.push(join(rootDir, 'packages/tokens/src/tokens.json'));
  
  console.log(`\n✅ Generated ${filesWritten.length} token files`);
  console.log(`   - ${brandThemeTokens.size} brand/theme combinations`);
  console.log(`   - Typography tokens: ${Object.keys(typographyTokens).length} tokens`);
  console.log(`   - Sizing tokens: ${Object.keys(sizingTokens).length} tokens`);
  console.log('\n👉 Next: pnpm build:tokens');
  
  return {
    success: true,
    filesWritten,
    message: `✅ Token files generated: ${filesWritten.length} files`,
  };
}

async function main() {
  try {
    await pullTokensFromFiles();
  } catch (error) {
    console.error('❌ pull-tokens-from-files failed:', error);
    process.exit(1);
  }
}

// Only run main if this is the entry point
if (import.meta.url.endsWith(process.argv[1]) || process.argv[1]?.includes('pull-tokens-from-files.ts')) {
  main();
}

