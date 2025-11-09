import type { Preview } from '@storybook/react-vite';
// Import generated tokens CSS
import '@org/themes/dist/tokens.css';
// Import UI package CSS
import '@org/ui/index.css';
// Import Patterns package CSS
import '@org/patterns/index.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo'
    }
  },
};

export const globalTypes = {
  brand: {
    name: 'Brand',
    description: 'Brand pack',
    toolbar: {
      icon: 'paintbrush',
      items: [
        { value: 'default', title: 'Default' },
        { value: 'figjam', title: 'FigJam' },
        { value: 'devmode', title: 'DevMode' },
        { value: 'slides', title: 'Slides' }
      ]
    }
  },
  theme: {
    name: 'Theme',
    description: 'Color mode',
    toolbar: {
      icon: 'mirror',
      items: [
        { value: 'light', title: 'Light' },
        { value: 'dark', title: 'Dark' }
      ]
    }
  }
};

export const decorators = [
  (Story, ctx) => {
    const brand = ctx.globals.brand || 'default';
    const theme = ctx.globals.theme || 'light';
    document.documentElement.setAttribute('data-brand', brand);
    document.documentElement.setAttribute('data-theme', theme);
    return Story();
  }
];