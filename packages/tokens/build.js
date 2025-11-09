import StyleDictionary from 'style-dictionary';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '../..');

const sd = new StyleDictionary({
  source: [join(rootDir, 'packages/tokens/src/tokens.json')],
  platforms: {
    css: {
      transformGroup: 'css',
      buildPath: join(rootDir, 'packages/themes/dist/'),
      files: [{ destination: 'tokens.css', format: 'css/variables' }]
    },
    js: {
      transformGroup: 'js',
      buildPath: join(rootDir, 'packages/tokens/dist/'),
      files: [{ destination: 'tokens.js', format: 'javascript/es6' }]
    }
  }
});

sd.buildAllPlatforms();
