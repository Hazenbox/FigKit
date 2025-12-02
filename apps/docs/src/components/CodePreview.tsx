import React, { ReactNode } from 'react';
import CodeBlock from '@theme/CodeBlock';

interface CodePreviewProps {
  children: ReactNode;
  code?: string;
  title?: string;
  language?: string;
}

export default function CodePreview({ children, code, title, language = 'tsx' }: CodePreviewProps) {
  return (
    <div style={{ margin: '1.5rem 0' }}>
      {title && (
        <h4 style={{
          fontSize: '0.75rem',
          fontWeight: 600,
          color: 'var(--color-text-secondary, rgba(0, 0, 0, 0.5))',
          marginBottom: '0.5rem',
          textTransform: 'uppercase',
          letterSpacing: '0.05em'
        }}>
          {title}
        </h4>
      )}
      <div style={{
        background: 'var(--ifm-background-color)',
        border: '1px solid var(--ifm-color-emphasis-200)',
        borderRadius: '12px',
        padding: '1.25rem',
        marginBottom: code ? '1rem' : '0',
        display: 'flex',
        flexWrap: 'wrap',
        gap: '12px',
        alignItems: 'center',
        minHeight: '60px'
      }}>
        {children}
      </div>
      {code && (
        <CodeBlock language={language}>
          {code}
        </CodeBlock>
      )}
    </div>
  );
}

