import type { Plugin } from '@docusaurus/types';

export default function pageActionsPlugin(): Plugin {
  return {
    name: 'page-actions-plugin',
    
    // Inject client module
    getClientModules() {
      return [require.resolve('../client-modules.ts')];
    },
  };
}

