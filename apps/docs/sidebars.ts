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
      type: 'category',
      label: 'Components',
      items: [
        'components',
        'components/button',
        'components/badge',
        'components/avatar',
        'components/checkbox',
        'components/tabs',
        'components/text-input',
      ],
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
