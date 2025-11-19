import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  docsSidebar: [
    {
      type: 'doc',
      id: 'overview',
      label: 'Overview',
    },
    {
      type: 'category',
      label: 'Getting Started',
      items: [
        'getting-started',
        'guides/installation',
        'guides/theming',
        'guides/contributing',
      ],
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
