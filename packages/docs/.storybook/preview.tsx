import type { Preview } from '@storybook/react-vite';
import React, { useEffect } from 'react';
// Import generated tokens CSS
import '../../themes/dist/tokens.css';
// Import UI package CSS
import '../../ui/dist/index.css';
// Import Patterns package CSS
import '../../patterns/dist/index.css';

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
      ],
      defaultValue: 'default',
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
      ],
      defaultValue: 'light',
    }
  }
};

// Theme wrapper component that watches for global changes
const ThemeWrapper = ({ children, brand, theme }: { children: React.ReactNode; brand: string; theme: string }) => {
  useEffect(() => {
    if (typeof document === 'undefined') return;
    
    // Inject global styles for background color
    let styleElement = document.getElementById('storybook-theme-bg-style');
    if (!styleElement) {
      styleElement = document.createElement('style');
      styleElement.id = 'storybook-theme-bg-style';
      document.head.appendChild(styleElement);
    }
    
    const setAttributes = () => {
      document.documentElement.setAttribute('data-brand', brand);
      document.documentElement.setAttribute('data-theme', theme);
      
      // Update background color via CSS variable
      if (styleElement) {
        styleElement.textContent = `
          body,
          #storybook-root,
          .sb-wrapper,
          .sb-main-padded,
          .sb-show-main {
            background-color: var(--color-bg-default, #ffffff) !important;
            transition: background-color 0.2s ease;
          }
        `;
      }
    };
    
    // Set immediately
    setAttributes();
    
    // Set on next frame to ensure it happens after any DOM updates
    requestAnimationFrame(setAttributes);
    
    // Also set with a small delay as a fallback
    const timeoutId = setTimeout(setAttributes, 0);
    
    return () => {
      clearTimeout(timeoutId);
    };
  }, [brand, theme]); // Re-run when brand or theme changes
  
  return <>{children}</>;
};

export const decorators = [
  (Story, ctx) => {
    const brand = ctx.globals.brand || 'default';
    const theme = ctx.globals.theme || 'light';
    
    return (
      <ThemeWrapper brand={brand} theme={theme}>
        <Story />
      </ThemeWrapper>
    );
  }
];
