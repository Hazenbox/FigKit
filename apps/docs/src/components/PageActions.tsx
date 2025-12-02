import React, { useState, useRef, useEffect } from 'react';

interface PageActionsProps {
  pagePath?: string;
  pageTitle?: string;
}

export default function PageActions({ pagePath, pageTitle }: PageActionsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
  const relativePath = pagePath || (typeof window !== 'undefined' ? window.location.pathname : '');

  const copyToClipboard = async (text: string, message: string) => {
    try {
      await navigator.clipboard.writeText(text);
      console.log(message);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const viewAsMarkdown = async () => {
    const title = pageTitle || (typeof window !== 'undefined' ? document.title : '');
    const url = currentUrl;
    const markdown = `[${title}](${url})`;
    await copyToClipboard(markdown, '✅ Copied as markdown!');
    setIsOpen(false);
  };

  const copyPage = async () => {
    // Get the page title and URL
    const title = pageTitle || (typeof window !== 'undefined' ? document.title : '');
    const url = currentUrl;
    const text = `${title}\n${url}`;
    await copyToClipboard(text, '✅ Copied page link!');
    setIsOpen(false);
  };

  const openInCursor = () => {
    if (typeof window === 'undefined') return;
    
    // Get the current page path from the docs folder
    const currentPath = window.location.pathname;
    // Convert URL path to file path (e.g., /components/badge -> docs/components/badge.mdx)
    const filePath = currentPath === '/' ? 'docs/overview.mdx' : `docs${currentPath}.mdx`;
    
    // Open in Cursor with the actual file path
    const cursorUrl = `cursor://file${window.location.protocol}//${window.location.host}${window.location.pathname}`;
    
    // Alternative: Try to open the documentation source file
    const workspacePath = '/Users/upen/Desktop/My Hazen/Products/Test_product';
    const fullPath = `${workspacePath}/apps/${filePath}`;
    const cursorFileUrl = `cursor://file/${fullPath}`;
    
    window.open(cursorFileUrl, '_blank');
    setIsOpen(false);
  };

  const openInV0 = () => {
    if (typeof window === 'undefined') return;
    
    // Open v0.dev - user can paste the URL or context manually
    window.open('https://v0.dev', '_blank');
    
    // Copy the current page URL to clipboard so user can paste it in v0
    const title = pageTitle || document.title;
    const context = `Design a component based on this documentation:\n\nPage: ${title}\nURL: ${currentUrl}`;
    copyToClipboard(context, '✅ Copied context for v0! Paste it in v0 chat.');
    
    setIsOpen(false);
  };

  const openInClaude = () => {
    if (typeof window === 'undefined') return;
    
    // Open Claude - user can paste the URL or context manually
    window.open('https://claude.ai/new', '_blank');
    
    // Copy context to clipboard so user can paste it in Claude
    const title = pageTitle || document.title;
    const context = `I'm looking at this documentation page:\n\nPage: ${title}\nURL: ${currentUrl}\n\nCan you help me with this?`;
    copyToClipboard(context, '✅ Copied context for Claude! Paste it in the chat.');
    
    setIsOpen(false);
  };

  return (
    <div style={{ position: 'relative', display: 'inline-block' }} ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          padding: '4px 12px',
          fontSize: '14px',
          fontWeight: '500',
          color: 'var(--ifm-font-color-base)',
          backgroundColor: 'var(--ifm-background-surface-color)',
          border: '1px solid var(--ifm-color-emphasis-300)',
          borderRadius: '6px',
          cursor: 'pointer',
          transition: 'all 0.2s',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = 'var(--ifm-color-emphasis-100)';
          e.currentTarget.style.borderColor = 'var(--ifm-color-emphasis-400)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'var(--ifm-background-surface-color)';
          e.currentTarget.style.borderColor = 'var(--ifm-color-emphasis-300)';
        }}
        aria-label="Page actions"
        aria-expanded={isOpen}
      >
        Actions
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </button>

      {isOpen && (
        <div
          style={{
            position: 'absolute',
            right: '0',
            top: 'calc(100% + 4px)',
            minWidth: '200px',
            backgroundColor: 'var(--ifm-background-surface-color)',
            border: '1px solid var(--ifm-color-emphasis-200)',
            borderRadius: '6px',
            boxShadow: 'var(--ifm-global-shadow-lw)',
            zIndex: 1000,
            overflow: 'hidden',
          }}
        >
          <div style={{ padding: '4px 0' }}>
            <button
              onClick={copyPage}
              style={{
                width: '100%',
                textAlign: 'left',
                padding: '8px 16px',
                fontSize: '14px',
                color: 'var(--ifm-font-color-base)',
                backgroundColor: 'transparent',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--ifm-color-emphasis-100)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              📋 Copy page
            </button>
            <button
              onClick={viewAsMarkdown}
              style={{
                width: '100%',
                textAlign: 'left',
                padding: '8px 16px',
                fontSize: '14px',
                color: 'var(--ifm-font-color-base)',
                backgroundColor: 'transparent',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--ifm-color-emphasis-100)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              📝 View as markdown
            </button>
            <div style={{ height: '1px', backgroundColor: 'var(--ifm-color-emphasis-200)', margin: '4px 0' }}></div>
            <button
              onClick={openInCursor}
              style={{
                width: '100%',
                textAlign: 'left',
                padding: '8px 16px',
                fontSize: '14px',
                color: 'var(--ifm-font-color-base)',
                backgroundColor: 'transparent',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--ifm-color-emphasis-100)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              ↗ Open in Cursor
            </button>
            <button
              onClick={openInV0}
              style={{
                width: '100%',
                textAlign: 'left',
                padding: '8px 16px',
                fontSize: '14px',
                color: 'var(--ifm-font-color-base)',
                backgroundColor: 'transparent',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--ifm-color-emphasis-100)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              ↗ Open in v0
            </button>
            <button
              onClick={openInClaude}
              style={{
                width: '100%',
                textAlign: 'left',
                padding: '8px 16px',
                fontSize: '14px',
                color: 'var(--ifm-font-color-base)',
                backgroundColor: 'transparent',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--ifm-color-emphasis-100)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              ↗ Open in Claude
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

