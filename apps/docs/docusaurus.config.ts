import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import { config as appConfig } from './src/config';
import path from 'path';

const config: Config = {
  title: 'FigKit Design System',
  tagline: 'A comprehensive design system with React components, design tokens, and Figma integration',
  favicon: 'img/favicon.ico',
  
  headTags: [
    {
      tagName: 'script',
      attributes: {
        type: 'text/javascript',
      },
      innerHTML: `
        // Set design system attributes BEFORE CSS loads
        document.documentElement.setAttribute('data-brand', 'default');
        document.documentElement.setAttribute('data-theme', 'light');
      `,
    },
    {
      tagName: 'link',
      attributes: {
        rel: 'preconnect',
        href: 'https://fonts.googleapis.com',
      },
    },
    {
      tagName: 'link',
      attributes: {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossOrigin: 'anonymous',
      },
    },
    {
      tagName: 'link',
      attributes: {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Geist+Mono:wght@400;500;600&display=swap',
      },
    },
  ],

  future: {
    v4: true,
  },

  url: 'https://fig-kit.vercel.app',
  baseUrl: '/',

  organizationName: 'Hazenbox',
  projectName: 'FigKit',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl: 'https://github.com/Hazenbox/FigKit/tree/main/apps/docs/',
          routeBasePath: '/',
        },
        blog: false, // Disable blog
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  plugins: [
    './src/plugins/page-actions-plugin.ts',
    function(context, options) {
      return {
        name: 'webpack-config-plugin',
        configureWebpack(config, isServer) {
          return {
            resolve: {
              alias: {
                '@figkit/themes': path.resolve(__dirname, '../../packages/themes'),
                '@figkit/ui': path.resolve(__dirname, '../../packages/ui'),
              },
            },
          };
        },
      };
    },
  ],

  themeConfig: {
    image: 'img/docusaurus-social-card.jpg',
    colorMode: {
      defaultMode: 'light',
      respectPrefersColorScheme: false,
    },
    navbar: {
      title: '',
      logo: {
        alt: 'FigKit Logo',
        src: 'img/logo-light.svg',
        srcDark: 'img/logo-dark.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'docsSidebar',
          position: 'left',
          label: 'Documentation',
        },
        {
          href: 'https://github.com/Hazenbox/FigKit',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Documentation',
          items: [
            {
              label: 'Getting Started',
              to: '/getting-started',
            },
            {
              label: 'Components',
              to: '/components',
            },
            {
              label: 'Design Tokens',
              to: '/tokens',
            },
          ],
        },
        {
          title: 'Resources',
          items: [
            {
              label: 'Storybook',
              href: appConfig.storybookUrl,
            },
            {
              label: 'NPM Package',
              href: 'https://www.npmjs.com/package/@figkit/ui',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/Hazenbox/FigKit',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} FigKit Design System. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
    // Algolia search can be added later when needed
    // algolia: {
    //   appId: 'YOUR_APP_ID',
    //   apiKey: 'YOUR_SEARCH_API_KEY',
    //   indexName: 'YOUR_INDEX_NAME',
    // },
  } satisfies Preset.ThemeConfig,
};

export default config;
