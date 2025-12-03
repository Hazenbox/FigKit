// Import client-side modules
// Note: PageActions is now rendered via DocBreadcrumbs wrapper (src/theme/DocBreadcrumbs/index.tsx)
// No longer using PageActionsInjector to avoid duplicate Actions buttons
import setupTabTOCFilter from './components/TabTOCFilter';

console.log('[ClientModules] ===== CLIENT MODULES LOADED =====');

// Docusaurus client modules - this runs on page load
if (typeof window !== 'undefined') {
  console.log('[ClientModules] Window is available, initializing...');
  
  // Set design system brand and theme attributes (required for design tokens)
  document.documentElement.setAttribute('data-brand', 'default');
  document.documentElement.setAttribute('data-theme', 'light');
  
  console.log('[ClientModules] Calling setupTabTOCFilter...');
  setupTabTOCFilter();
  
  // Align TOC starting position with tabs
  function alignTOCWithTabs() {
    const tabsContainer = document.querySelector('.tabs-container, .tabs');
    const tocDesktop = document.querySelector('.theme-doc-toc-desktop');
    const tocWrapper = tocDesktop?.parentElement;
    
    if (tabsContainer && tocWrapper) {
      // Get positions when page is at scroll 0
      const tabsRect = tabsContainer.getBoundingClientRect();
      const wrapperRect = tocWrapper.getBoundingClientRect();
      
      // Calculate vertical offset between TOC wrapper and tabs
      const verticalOffset = tabsRect.top - wrapperRect.top;
      
      // Apply padding-top to TOC wrapper to push TOC down to align with tabs
      const tocWrapperElement = tocWrapper as HTMLElement;
      if (verticalOffset > 0) {
        tocWrapperElement.style.paddingTop = `${verticalOffset}px`;
      } else {
        tocWrapperElement.style.paddingTop = '0px';
      }
      
      console.log('[TOC Aligner] Tabs Y:', tabsRect.top);
      console.log('[TOC Aligner] TOC wrapper Y:', wrapperRect.top);
      console.log('[TOC Aligner] Set wrapper padding-top:', verticalOffset);
    }
  }
  
  // Run alignment multiple times to catch DOM updates
  setTimeout(alignTOCWithTabs, 100);
  setTimeout(alignTOCWithTabs, 500);
  setTimeout(alignTOCWithTabs, 1000);
  setTimeout(alignTOCWithTabs, 2000);
  
  // Re-align on route changes
  window.addEventListener('popstate', () => {
    setTimeout(alignTOCWithTabs, 100);
    setTimeout(alignTOCWithTabs, 500);
  });
  
  // Watch for history changes (Docusaurus client-side navigation)
  const originalPushState = window.history.pushState;
  const originalReplaceState = window.history.replaceState;
  
  window.history.pushState = function(...args) {
    originalPushState.apply(this, args);
    setTimeout(alignTOCWithTabs, 100);
    setTimeout(alignTOCWithTabs, 500);
  };
  
  window.history.replaceState = function(...args) {
    originalReplaceState.apply(this, args);
    setTimeout(alignTOCWithTabs, 100);
    setTimeout(alignTOCWithTabs, 500);
  };
  
  console.log('[ClientModules] ===== INITIALIZATION COMPLETE =====');
  
  // Expose functions globally for debugging
  (window as any).debugSetupTabTOCFilter = setupTabTOCFilter;
  
  console.log('[ClientModules] Debug functions available:');
  console.log('  - window.debugSetupTabTOCFilter()');
}
