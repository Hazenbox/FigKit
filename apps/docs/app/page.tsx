import Link from 'next/link';

export default function Home() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      padding: '24px',
      maxWidth: '1200px',
      margin: '0 auto'
    }}>
      <h1 style={{
        fontSize: '48px',
        fontWeight: 700,
        marginBottom: '16px',
        color: 'rgb(var(--foreground-rgb))',
      }}>
        FigKit Documentation
      </h1>
      <p style={{
        fontSize: '20px',
        marginBottom: '24px',
        color: '#6b7280',
      }}>
        Comprehensive documentation for the FigKit Design System
      </p>
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
        <Link 
          href="/docs/getting-started"
          style={{
            display: 'inline-block',
            padding: '12px 24px',
            backgroundColor: '#2563eb',
            color: '#ffffff',
            borderRadius: '8px',
            textDecoration: 'none',
            fontWeight: 500,
          }}
        >
          Get Started
        </Link>
        <Link 
          href="/docs/components"
          style={{
            display: 'inline-block',
            padding: '12px 24px',
            backgroundColor: '#f3f4f6',
            color: 'rgb(var(--foreground-rgb))',
            borderRadius: '8px',
            textDecoration: 'none',
            fontWeight: 500,
          }}
        >
          Components
        </Link>
      </div>
    </div>
  );
}

