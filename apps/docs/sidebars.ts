import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  docsSidebar: [
    {
      type: 'doc',
      id: 'overview',
      label: 'Overview',
    },
    {
      type: 'doc',
      id: 'getting-started',
      label: 'Getting Started',
    },
    {
      type: 'doc',
      id: 'components',
      label: 'Components',
    },
    {
      type: 'doc',
      id: 'tokens',
      label: 'Design Tokens',
    },
    {
      type: 'category',
      label: 'Guides',
      items: [
        'guides/installation',
        'guides/theming',
        'guides/contributing',
      ],
    },
  ],
};

export default sidebars;
