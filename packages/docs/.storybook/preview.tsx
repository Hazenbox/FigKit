import type { Preview } from '@storybook/react-vite';
import React, { useEffect } from 'react';
// Import generated tokens CSS
import '../../themes/dist/tokens.css';
// Import UI package CSS
import '../../ui/dist/index.css';
// Import Patterns package CSS (optional - only if it exists)
// Note: Patterns package may not have CSS, so we make this optional
// @ts-ignore - CSS import may not exist
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
    },

    options: {
        storySort: {
          order: [
            'Foundations',
            ['Colors', 'Typography', 'Spacing', 'Border Radius', 'Shadows', 'Layout', 'Dimensions', 'Icons'],
            'Components',
            ['Avatar', 'Badge', 'Button', 'Checkbox', 'RadioButton', 'SegmentedControl', 'Tab', 'Tabs', 'TextInput'],
          ],
        },
    },
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
    
    // Inject Inter font from Google Fonts (non-blocking)
    // Use preconnect for better performance
    let preconnect1 = document.getElementById('fonts-googleapis-preconnect');
    if (!preconnect1) {
      preconnect1 = document.createElement('link');
      preconnect1.id = 'fonts-googleapis-preconnect';
      preconnect1.rel = 'preconnect';
      preconnect1.href = 'https://fonts.googleapis.com';
      document.head.appendChild(preconnect1);
    }
    
    let preconnect2 = document.getElementById('fonts-gstatic-preconnect');
    if (!preconnect2) {
      preconnect2 = document.createElement('link');
      preconnect2.id = 'fonts-gstatic-preconnect';
      preconnect2.rel = 'preconnect';
      preconnect2.href = 'https://fonts.gstatic.com';
      preconnect2.crossOrigin = 'anonymous';
      document.head.appendChild(preconnect2);
    }
    
    let fontLink = document.getElementById('inter-font-link');
    if (!fontLink) {
      fontLink = document.createElement('link');
      fontLink.id = 'inter-font-link';
      fontLink.rel = 'stylesheet';
      fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap';
      fontLink.crossOrigin = 'anonymous';
      // Add error handling
      fontLink.onerror = () => {
        console.warn('Failed to load Inter font from Google Fonts, using fallback');
      };
      document.head.appendChild(fontLink);
    }
    
    // Inject global styles for Storybook UI and background
    let styleElement = document.getElementById('storybook-theme-style');
    if (!styleElement) {
      styleElement = document.createElement('style');
      styleElement.id = 'storybook-theme-style';
      document.head.appendChild(styleElement);
    }
    
    const setAttributes = () => {
      try {
        // Set data attributes on document element
        document.documentElement.setAttribute('data-brand', brand);
        document.documentElement.setAttribute('data-theme', theme);
        
        // Get computed CSS variables for current theme (with safe fallbacks)
        const computedStyle = getComputedStyle(document.documentElement);
        const bgDefault = computedStyle.getPropertyValue('--color-bg-default').trim() || (theme === 'dark' ? '#1e1e1e' : '#ffffff');
        const textDefault = computedStyle.getPropertyValue('--color-text-default').trim() || (theme === 'dark' ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.9)');
        const bgSecondary = computedStyle.getPropertyValue('--color-bg-secondary').trim() || (theme === 'dark' ? '#2c2c2c' : '#f5f5f5');
        const borderDefault = computedStyle.getPropertyValue('--color-border-component-default').trim() || (theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)');
        
        // Update Storybook UI and component area with comprehensive styling
        if (styleElement) {
          styleElement.textContent = `
            /* Apply Inter font to Storybook and all components */
            *,
            *::before,
            *::after {
              font-family: 'Inter', var(--font-family-default, 'Inter'), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif !important;
            }
            
            /* Ensure Storybook UI uses Inter */
            body,
            #storybook-root,
            .sb-wrapper,
            .sb-main-padded,
            .sb-show-main,
            .sidebar-container,
            .sidebar-header,
            .sb-bar,
            .toolbar,
            .toolbar-wrapper,
            .panel-container,
            .panel-wrapper,
            input,
            select,
            textarea,
            button,
            pre,
            code,
            a,
            h1, h2, h3, h4, h5, h6,
            p,
            span,
            div {
              font-family: 'Inter', var(--font-family-default, 'Inter'), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif !important;
            }
            
            /* Storybook component area background */
            body,
            #storybook-root,
            .sb-wrapper,
            .sb-main-padded,
            .sb-show-main {
              background-color: ${bgDefault} !important;
              color: ${textDefault} !important;
              transition: background-color 0.2s ease, color 0.2s ease;
            }
            
            /* Storybook sidebar */
            .sidebar-container,
            .sidebar-header {
              background-color: ${bgSecondary} !important;
              border-color: ${borderDefault} !important;
            }
            
            /* Storybook toolbar */
            .sb-bar,
            .toolbar,
            .toolbar-wrapper {
              background-color: ${bgSecondary} !important;
              border-color: ${borderDefault} !important;
            }
            
            /* Storybook panels */
            .panel-container,
            .panel-wrapper {
              background-color: ${bgDefault} !important;
              color: ${textDefault} !important;
            }
            
            /* Storybook inputs and controls */
            input,
            select,
            textarea {
              background-color: ${bgDefault} !important;
              color: ${textDefault} !important;
              border-color: ${borderDefault} !important;
            }
            
            /* Storybook code blocks */
            pre,
            code {
              background-color: ${bgSecondary} !important;
              color: ${textDefault} !important;
            }
            
            /* Storybook links */
            a {
              color: var(--color-text-brand, #007be5) !important;
            }
          `;
        }
        
        // Also set body background directly as fallback
        if (document.body) {
          document.body.style.backgroundColor = bgDefault;
          document.body.style.color = textDefault;
        }
      } catch (error) {
        console.warn('Error setting theme attributes:', error);
      }
    };
    
    // Set with a delay to ensure DOM is ready
    const timeoutId = setTimeout(() => {
      setAttributes();
    }, 50);
    
    // Also set on next frame
    requestAnimationFrame(() => {
      setAttributes();
    });
    
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
