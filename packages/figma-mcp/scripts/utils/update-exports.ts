// packages/figma-mcp/scripts/utils/update-exports.ts
import { readdirSync, readFileSync, writeFileSync, statSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '../../../../');
const componentsDir = join(rootDir, 'packages/ui/src');
const componentsFile = join(componentsDir, 'components.ts');

export function updateComponentExports() {
  // Find all component directories
  const entries = readdirSync(componentsDir, { withFileTypes: true });
  const componentDirs = entries
    .filter(entry => entry.isDirectory() && entry.name !== 'components')
    .map(entry => entry.name);

  // Also check for direct component files in components/ directory
  const componentsSubDir = join(componentsDir, 'components');
  let directComponents: string[] = [];
  try {
    const subEntries = readdirSync(componentsSubDir, { withFileTypes: true });
    directComponents = subEntries
      .filter(entry => entry.isFile() && entry.name.endsWith('.tsx') && !entry.name.endsWith('.stories.tsx'))
      .map(entry => entry.name.replace('.tsx', ''));
  } catch {
    // components/ directory might not exist
  }

  // Generate export statements
  const exports: string[] = [];

  // Export from component directories (e.g., button/Button.tsx)
  for (const dir of componentDirs) {
    const indexPath = join(componentsDir, dir, 'index.ts');
    try {
      if (statSync(indexPath).isFile()) {
        const indexContent = readFileSync(indexPath, 'utf8');
        // Extract component name from index.ts exports
        const exportMatch = indexContent.match(/export\s+\*\s+from\s+['"]\.\/([^'"]+)['"]/);
        if (exportMatch) {
          const compName = exportMatch[1];
          exports.push(`export { ${compName} } from './${dir}/${compName}';`);
          exports.push(`export type { ${compName}Props } from './${dir}/${compName}';`);
        }
      }
    } catch {
      // Skip if index.ts doesn't exist
    }
  }

  // Export from direct components (e.g., components/Button.tsx)
  for (const comp of directComponents) {
    exports.push(`export { ${comp} } from './components/${comp}';`);
    exports.push(`export type { ${comp}Props } from './components/${comp}';`);
  }

  // Write components.ts
  const content = exports.length > 0 
    ? exports.join('\n') + '\n'
    : '// No components exported yet\n';

  writeFileSync(componentsFile, content);
  console.log(`✅ Updated ${componentsFile}`);
  console.log(`   Exported ${exports.length / 2} component(s)`);
}

