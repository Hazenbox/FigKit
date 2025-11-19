import type { StorybookConfig } from '@storybook/react-vite';
import path from 'path';
import { fileURLToPath } from 'url';
import { readFileSync, existsSync } from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const config: StorybookConfig = {
  stories: [
    '../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)',
    '../stories/**/*.mdx',
  ],
  addons: [
    '@chromatic-com/storybook',
    '@storybook/addon-docs',
    '@storybook/addon-a11y',
    '@storybook/addon-vitest'
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {}
  },
  async viteFinal(config, { configType }) {
    // Use the vite instance that Storybook provides
    const { mergeConfig } = await import('vite');
    const tokensDir = path.resolve(__dirname, '../../tokens/dist');
    
    // Only use base path for production builds, not for dev server
    // In dev, Storybook runs on its own port and doesn't need base path
    // In production, it's served from /storybook/ subdirectory
    const basePath = configType === 'PRODUCTION' ? '/storybook/' : '/';
    
    return mergeConfig(config, {
      base: basePath,
      resolve: {
        alias: {
          '@figkit/ui': path.resolve(__dirname, '../../ui/dist/index.js'),
          '@figkit/themes': path.resolve(__dirname, '../../themes/dist'),
          '@figkit/tokens': tokensDir,
          '@figkit/patterns': path.resolve(__dirname, '../../patterns/dist/index.js'),
        }
      },
      // Ensure JSON imports work - treat as assets and allow large files
      assetsInclude: ['**/*.json'],
      optimizeDeps: {
        exclude: ['**/*.json'],
      },
      server: {
        fs: {
          allow: [path.resolve(__dirname, '../..')],
        },
        // Serve tokens directory as static files
        middlewareMode: false,
      },
      plugins: [
        // Plugin to serve JSON files from tokens directory
        {
          name: 'serve-tokens-json',
          configureServer(server) {
            server.middlewares.use('/packages/tokens/dist', (req, res, next) => {
              if (req.url?.endsWith('.json')) {
                const filePath = path.join(tokensDir, path.basename(req.url));
                if (existsSync(filePath)) {
                  res.setHeader('Content-Type', 'application/json');
                  res.end(readFileSync(filePath, 'utf-8'));
                  return;
                }
              }
              next();
            });
          },
        },
      ],
      build: {
        commonjsOptions: {
          include: [/node_modules/],
        },
      },
    });
  }
};

export default config;
