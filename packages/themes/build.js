import StyleDictionary from 'style-dictionary';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readdir, readFile } from 'fs/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '../..');
const tokensDistDir = join(rootDir, 'packages/tokens/dist');
const themesDistDir = join(rootDir, 'packages/themes/dist');

/**
 * Convert Style Dictionary token tree to CSS variables string
 */
function tokensToCSS(tokens, prefix = '') {
  let css = '';
  for (const [key, value] of Object.entries(tokens)) {
    // Convert dots to dashes for CSS variable names
    const normalizedKey = key.replace(/\./g, '-');
    const fullKey = prefix ? `${prefix}-${normalizedKey}` : normalizedKey;
    if (value && typeof value === 'object' && 'value' in value) {
      // Token with value
      css += `  --${fullKey}: ${value.value};\n`;
    } else if (value && typeof value === 'object') {
      // Nested object, recurse
      css += tokensToCSS(value, fullKey);
    }
  }
  return css;
}

/**
 * Build CSS file with attribute selectors for each brand+theme combination
 */
async function buildThemesCSS() {
  // Read all token files from dist
  const files = await readdir(tokensDistDir);
  const tokenFiles = files.filter(f => f.endsWith('.json') && f !== 'tokens.js');
  
  // Parse brand.theme.json files
  const brandThemeMap = new Map();
  
  for (const file of tokenFiles) {
    const match = file.match(/^(.+)\.(.+)\.json$/);
    if (!match) continue;
    
    const [, brand, theme] = match;
    const content = await readFile(join(tokensDistDir, file), 'utf-8');
    const tokens = JSON.parse(content);
    
    if (!brandThemeMap.has(brand)) {
      brandThemeMap.set(brand, new Map());
    }
    brandThemeMap.get(brand).set(theme, tokens);
  }
  
  // Generate CSS with attribute selectors
  let css = '/**\n * Do not edit directly, this file was auto-generated.\n */\n\n';
  
  for (const [brand, themeMap] of brandThemeMap) {
    for (const [theme, tokens] of themeMap) {
      const selector = `:root[data-brand="${brand}"][data-theme="${theme}"]`;
      css += `${selector} {\n`;
      css += tokensToCSS(tokens);
      css += `}\n\n`;
    }
  }
  
  // Write to themes/dist/tokens.css
  const { writeFile, mkdir } = await import('fs/promises');
  await mkdir(themesDistDir, { recursive: true });
  await writeFile(join(themesDistDir, 'tokens.css'), css, 'utf-8');
  
  console.log(`✅ Generated tokens.css with ${brandThemeMap.size} brand(s) and ${Array.from(brandThemeMap.values()).reduce((sum, m) => sum + m.size, 0)} theme combinations`);
}

buildThemesCSS().catch(console.error);

