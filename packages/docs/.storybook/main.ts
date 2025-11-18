import type { StorybookConfig } from '@storybook/react-vite';
import path from 'path';
import { fileURLToPath } from 'url';

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
    return mergeConfig(config, {
      resolve: {
        alias: {
          '@figkit/ui': path.resolve(__dirname, '../../ui/dist/index.js'),
          '@figkit/themes': path.resolve(__dirname, '../../themes/dist'),
          '@figkit/tokens': path.resolve(__dirname, '../../tokens/dist'),
          '@figkit/patterns': path.resolve(__dirname, '../../patterns/dist/index.js'),
        }
      },
      // Ensure JSON imports work
      assetsInclude: ['**/*.json'],
    });
  }
};

export default config;
