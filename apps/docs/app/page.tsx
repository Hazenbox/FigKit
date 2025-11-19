import Link from 'next/link';
import { Button } from '@figkit/ui';

export default function Home() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      padding: 'var(--space-6, 24px)',
      maxWidth: '1200px',
      margin: '0 auto'
    }}>
      <h1 style={{
        fontSize: '48px',
        fontWeight: 700,
        marginBottom: 'var(--space-4, 16px)',
        color: 'var(--color-text-default, rgba(0, 0, 0, 0.9))',
      }}>
        FigKit Documentation
      </h1>
      <p style={{
        fontSize: '20px',
        marginBottom: 'var(--space-6, 24px)',
        color: 'var(--color-text-secondary, rgba(0, 0, 0, 0.6))',
      }}>
        Comprehensive documentation for the FigKit Design System
      </p>
      <div style={{ display: 'flex', gap: 'var(--space-3, 12px)', flexWrap: 'wrap' }}>
        <Link href="/docs/getting-started">
          <Button variant="primary">Get Started</Button>
        </Link>
        <Link href="/docs/components">
          <Button variant="secondary">Components</Button>
        </Link>
      </div>
    </div>
  );
}

