import React from 'react';
import ReactDOM from 'react-dom/client';
import PageActions from './PageActions';

export default function injectPageActions() {
  // Wait for DOM to be ready
  if (typeof window === 'undefined') {
    console.log('[PageActions] Window is undefined, skipping');
    return;
  }

  console.log('[PageActions] Module loaded and executing');

  function inject() {
    console.log('[PageActions] ===== INJECT ATTEMPT =====');
    console.log('[PageActions] Document ready state:', document.readyState);
    console.log('[PageActions] Body exists:', !!document.body);
    
    // Try multiple selectors for breadcrumbs
    const breadcrumbs = document.querySelector('nav[aria-label="breadcrumbs"]') 
      || document.querySelector('.breadcrumbs') 
      || document.querySelector('[class*="breadcrumb"]')
      || document.querySelector('.theme-doc-breadcrumbs');
    
    console.log('[PageActions] Breadcrumbs found:', breadcrumbs);
    console.log('[PageActions] Breadcrumbs HTML:', breadcrumbs?.outerHTML?.substring(0, 200));
    
    const existingActions = document.querySelector('.page-actions-container');
    console.log('[PageActions] Existing actions:', existingActions);
    
    // Try to find ANY element we can attach to
    const navbar = document.querySelector('.navbar');
    const docPage = document.querySelector('.theme-doc-page');
    console.log('[PageActions] Navbar found:', !!navbar);
    console.log('[PageActions] Doc page found:', !!docPage);
    
    if (breadcrumbs && !existingActions) {
      // Find the parent container that holds the breadcrumbs
      const parentContainer = breadcrumbs.parentElement;
      console.log('[PageActions] Parent container:', parentContainer);
      console.log('[PageActions] Parent container class:', parentContainer?.className);
      
      if (parentContainer) {
        const container = document.createElement('div');
        container.className = 'page-actions-container';
        
        // Insert right after the breadcrumbs nav element
        parentContainer.insertBefore(container, breadcrumbs.nextSibling);
        
        console.log('[PageActions] Container inserted:', container);
        console.log('[PageActions] Container parent:', container.parentElement);
        
        const pageTitle = document.querySelector('article h1, h1')?.textContent || '';
        const pagePath = window.location.pathname;
        
        console.log('[PageActions] Creating React root...');
        const root = ReactDOM.createRoot(container);
        root.render(<PageActions pagePath={pagePath} pageTitle={pageTitle} />);
        
        console.log('[PageActions] ✅ PageActions component rendered!');
      } else {
        console.error('[PageActions] ❌ No parent container found');
      }
    } else if (!breadcrumbs) {
      console.warn('[PageActions] ❌ Breadcrumbs not found in DOM');
      console.log('[PageActions] Available nav elements:', document.querySelectorAll('nav').length);
      console.log('[PageActions] All nav elements:', Array.from(document.querySelectorAll('nav')).map(n => n.className));
    } else if (existingActions) {
      console.log('[PageActions] ℹ️  Actions already injected');
    }
  }

  // Try immediately
  console.log('[PageActions] Starting injection attempts...');
  inject();
  
  // Try multiple times with different delays
  setTimeout(() => { console.log('[PageActions] 100ms attempt'); inject(); }, 100);
  setTimeout(() => { console.log('[PageActions] 500ms attempt'); inject(); }, 500);
  setTimeout(() => { console.log('[PageActions] 1000ms attempt'); inject(); }, 1000);
  setTimeout(() => { console.log('[PageActions] 2000ms attempt'); inject(); }, 2000);

  // Try on load
  if (document.readyState === 'complete') {
    inject();
  } else {
    window.addEventListener('load', () => {
      console.log('[PageActions] Load event triggered');
      inject();
    });
  }

  // Also observe DOM changes
  const observer = new MutationObserver(() => {
    if (!document.querySelector('.page-actions-container')) {
      console.log('[PageActions] DOM mutation detected, re-injecting');
      inject();
    }
  });

  if (document.body) {
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  } else {
    setTimeout(() => {
      if (document.body) {
        observer.observe(document.body, {
          childList: true,
          subtree: true,
        });
      }
    }, 100);
  }
  
  // Expose manual injection for debugging
  (window as any).injectPageActions = inject;
  console.log('[PageActions] Manual injection available as window.injectPageActions()');
}
