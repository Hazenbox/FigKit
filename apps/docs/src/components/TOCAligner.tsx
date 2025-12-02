import { useEffect } from 'react';

export default function TOCAligner() {
  useEffect(() => {
    const alignTOC = () => {
      const tabsContainer = document.querySelector('.tabs-container, .tabs');
      const tocDesktop = document.querySelector('.theme-doc-toc-desktop');
      
      if (tabsContainer && tocDesktop) {
        // Get the Y position of the tab bar relative to the viewport when page loads
        const tabsRect = tabsContainer.getBoundingClientRect();
        const tabsOffsetTop = tabsRect.top + window.scrollY;
        
        // Set TOC to start at the same Y position
        const tocElement = tocDesktop as HTMLElement;
        tocElement.style.position = 'sticky';
        tocElement.style.top = `${Math.max(60, tabsRect.top)}px`; // 60px is navbar height
        tocElement.style.alignSelf = 'flex-start';
        
        console.log('[TOC Aligner] Tabs Y position:', tabsRect.top);
        console.log('[TOC Aligner] Set TOC top to:', Math.max(60, tabsRect.top));
      }
    };

    // Run alignment after a short delay to ensure DOM is ready
    setTimeout(alignTOC, 100);
    setTimeout(alignTOC, 500);
    
    // Re-align on window resize
    window.addEventListener('resize', alignTOC);
    
    return () => {
      window.removeEventListener('resize', alignTOC);
    };
  }, []);

  return null;
}

