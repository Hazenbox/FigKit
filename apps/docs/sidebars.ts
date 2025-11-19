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
      id: 'guides/installation',
      label: 'Installation',
    },
    {
      type: 'doc',
      id: 'guides/theming',
      label: 'Theming',
    },
    {
      type: 'doc',
      id: 'guides/contributing',
      label: 'Contributing',
    },
    {
      type: 'category',
      label: 'Components',
      items: [
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
  ],
};

export default sidebars;
