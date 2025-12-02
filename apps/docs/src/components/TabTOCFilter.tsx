export default function setupTabTOCFilter() {
  if (typeof window === 'undefined') return;
  
  console.log('[TabTOCFilter] Script loaded and initializing...');

  function getActiveTabPanel(): Element | null {
    const tabPanels = document.querySelectorAll('[role="tabpanel"]');
    console.log('[TabTOCFilter] Found', tabPanels.length, 'tab panels');
    
    for (const panel of tabPanels) {
      const isHidden = panel.getAttribute('aria-hidden') === 'true' || 
                     panel.hasAttribute('hidden') ||
                     (panel as HTMLElement).style.display === 'none';
      
      if (!isHidden) {
        const computedStyle = window.getComputedStyle(panel as HTMLElement);
        if (computedStyle.display !== 'none' && computedStyle.visibility !== 'hidden') {
          console.log('[TabTOCFilter] Active panel found');
          return panel;
        }
      }
    }
    
    console.log('[TabTOCFilter] No active panel found');
    return null;
  }

  function getAllHeadingsInPanel(panel: Element): Set<string> {
    const headingIds = new Set<string>();
    
    // Query all headings with IDs within the panel
    const headings = panel.querySelectorAll('h2[id], h3[id], h4[id], h5[id], h6[id]');
    console.log('[TabTOCFilter] Found', headings.length, 'headings in panel');
    
    headings.forEach(heading => {
      if (heading.id) {
        headingIds.add(heading.id);
        console.log('[TabTOCFilter] Heading:', heading.id, heading.textContent?.trim());
      }
    });
    
    // Also check if headings are contained in panel (in case of nested structures)
    const allHeadings = document.querySelectorAll('h2[id], h3[id], h4[id], h5[id], h6[id]');
    allHeadings.forEach(heading => {
      if (panel.contains(heading) && heading.id && !headingIds.has(heading.id)) {
        headingIds.add(heading.id);
      }
    });
    
    console.log('[TabTOCFilter] Total headings:', headingIds.size, Array.from(headingIds));
    return headingIds;
  }

  function updateTOCForActiveTab() {
    const toc = document.querySelector('.table-of-contents');
    if (!toc) {
      console.log('[TabTOCFilter] No TOC found');
      return;
    }
    console.log('[TabTOCFilter] Updating TOC for active tab...');

    const tabList = document.querySelector('[role="tablist"]');
    if (!tabList) {
      console.log('[TabTOCFilter] No tabs found, showing all TOC items');
      const tocLinks = toc.querySelectorAll('li');
      tocLinks.forEach(item => {
        item.style.display = '';
      });
      return;
    }

    const activePanel = getActiveTabPanel();
    
    if (!activePanel) {
      console.log('[TabTOCFilter] No active panel, hiding all TOC items');
      const tocLinks = toc.querySelectorAll('li');
      tocLinks.forEach(item => {
        item.style.display = 'none';
      });
      return;
    }

    const activeHeadings = getAllHeadingsInPanel(activePanel);
    
    console.log('[TabTOCFilter] Active headings:', Array.from(activeHeadings));
    
    if (activeHeadings.size === 0) {
      console.log('[TabTOCFilter] No headings found in active panel, skipping update');
      return;
    }

    const tocLinks = toc.querySelectorAll('a[href^="#"]');
    console.log('[TabTOCFilter] TOC links found:', tocLinks.length);
    
    let visibleCount = 0;
    let hiddenCount = 0;

    tocLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (!href || !href.startsWith('#')) return;
      
      const headingId = href.replace('#', '');
      const listItem = link.closest('li');
      
      if (listItem && headingId) {
        const isInActiveTab = activeHeadings.has(headingId);
        
        // Also check if heading element exists and is in active panel
        const headingElement = document.getElementById(headingId);
        let isActuallyInActivePanel = false;
        
        if (headingElement) {
          isActuallyInActivePanel = activePanel.contains(headingElement);
        }
        
        const shouldShow = isInActiveTab || isActuallyInActivePanel;
        
        if (shouldShow) {
          listItem.style.display = '';
          visibleCount++;
          console.log('[TabTOCFilter] Showing:', headingId);
        } else {
          listItem.style.display = 'none';
          hiddenCount++;
          console.log('[TabTOCFilter] Hiding:', headingId);
        }
      }
    });
    
    console.log(`[TabTOCFilter] TOC updated: ${visibleCount} visible, ${hiddenCount} hidden`);
  }

  function setupTabWatcher() {
    const tabList = document.querySelector('[role="tablist"]');
    if (!tabList) {
      console.log('[TabTOCFilter] No tab list found');
      updateTOCForActiveTab();
      return;
    }

    if (tabList.hasAttribute('data-toc-watcher-setup')) {
      console.log('[TabTOCFilter] Tab watcher already setup');
      return;
    }
    
    tabList.setAttribute('data-toc-watcher-setup', 'true');
    console.log('[TabTOCFilter] Setting up tab watcher');

    const handleTabChange = () => {
      console.log('[TabTOCFilter] Tab changed, updating TOC');
      setTimeout(() => {
        updateTOCForActiveTab();
      }, 300);
    };

    // Listen for clicks on tabs
    tabList.addEventListener('click', (e) => {
      const target = (e.target as HTMLElement).closest('[role="tab"]');
      if (target) {
        console.log('[TabTOCFilter] Tab clicked:', target.textContent);
        handleTabChange();
      }
    });

    // Listen for keyboard navigation
    tabList.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        handleTabChange();
      }
    });

    // Watch for aria-selected changes
    const tabObserver = new MutationObserver((mutations) => {
      let shouldUpdate = false;
      mutations.forEach(mutation => {
        if (mutation.type === 'attributes') {
          const target = mutation.target as HTMLElement;
          if (target.getAttribute('role') === 'tab' && 
              (mutation.attributeName === 'aria-selected' || mutation.attributeName === 'aria-hidden')) {
            shouldUpdate = true;
            console.log('[TabTOCFilter] Tab attribute changed:', mutation.attributeName);
          }
        }
      });
      if (shouldUpdate) {
        handleTabChange();
      }
    });

    tabObserver.observe(tabList, {
      attributes: true,
      attributeFilter: ['aria-selected', 'aria-hidden'],
      subtree: true,
    });

    // Watch tab panels for visibility changes
    const panelObserver = new MutationObserver(() => {
      console.log('[TabTOCFilter] Panel changed');
      handleTabChange();
    });

    const tabPanels = document.querySelectorAll('[role="tabpanel"]');
    console.log('[TabTOCFilter] Watching', tabPanels.length, 'tab panels');
    
    tabPanels.forEach(panel => {
      panelObserver.observe(panel, {
        attributes: true,
        attributeFilter: ['aria-hidden', 'hidden', 'style'],
        childList: true,
        subtree: true,
      });
    });

    // Initial update with multiple attempts to catch different render timings
    setTimeout(() => {
      console.log('[TabTOCFilter] Initial TOC update (800ms)');
      updateTOCForActiveTab();
    }, 800);
    
    setTimeout(() => {
      console.log('[TabTOCFilter] Delayed TOC update (1500ms)');
      updateTOCForActiveTab();
    }, 1500);
    
    setTimeout(() => {
      console.log('[TabTOCFilter] Final TOC update (2500ms)');
      updateTOCForActiveTab();
    }, 2500);
  }

  function init() {
    console.log('[TabTOCFilter] Initializing...');
    setupTabWatcher();
  }

  // Expose functions for manual testing
  (window as any).__tabTOCFilter = {
    update: updateTOCForActiveTab,
    getActivePanel: getActiveTabPanel,
    getAllHeadings: getAllHeadingsInPanel,
    init: init,
  };

  // Multiple initialization strategies
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    setTimeout(init, 200);
  } else {
    window.addEventListener('DOMContentLoaded', () => {
      setTimeout(init, 300);
    });
    window.addEventListener('load', () => {
      setTimeout(init, 500);
    });
  }

  // Watch for dynamic content
  const observer = new MutationObserver(() => {
    const tabList = document.querySelector('[role="tablist"]');
    if (tabList && !tabList.hasAttribute('data-toc-watcher-setup')) {
      console.log('[TabTOCFilter] Tabs appeared, initializing');
      setTimeout(init, 200);
    }
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });

  // Listen for route changes
  if (typeof window !== 'undefined') {
    const originalPushState = history.pushState;
    const originalReplaceState = history.replaceState;

    history.pushState = function(...args) {
      originalPushState.apply(history, args);
      setTimeout(() => {
        const tabList = document.querySelector('[role="tablist"]');
        if (tabList) {
          tabList.removeAttribute('data-toc-watcher-setup');
        }
        init();
      }, 500);
    };

    history.replaceState = function(...args) {
      originalReplaceState.apply(history, args);
      setTimeout(() => {
        const tabList = document.querySelector('[role="tablist"]');
        if (tabList) {
          tabList.removeAttribute('data-toc-watcher-setup');
        }
        init();
      }, 500);
    };

    window.addEventListener('popstate', () => {
      setTimeout(() => {
        const tabList = document.querySelector('[role="tablist"]');
        if (tabList) {
          tabList.removeAttribute('data-toc-watcher-setup');
        }
        init();
      }, 500);
    });
  }
}
