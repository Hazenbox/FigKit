import { useState, useEffect } from 'react';
import { 
  Avatar, 
  Badge, 
  Button, 
  Checkbox, 
  Tab, 
  Tabs, 
  CheckIcon,
  PlusIcon
} from '@figkit/ui';
import type { TabsItem } from '@figkit/ui';

const BRANDS = ['default', 'figjam', 'devmode', 'slides'] as const;
const THEMES = ['light', 'dark'] as const;

type Brand = typeof BRANDS[number];
type Theme = typeof THEMES[number];

export default function TestNpm() {
  const [brand, setBrand] = useState<Brand>('default');
  const [theme, setTheme] = useState<Theme>('light');
  const [packageInfo, setPackageInfo] = useState<any>(null);

  // Update document attributes when brand/theme changes
  useEffect(() => {
    document.documentElement.setAttribute('data-brand', brand);
    document.documentElement.setAttribute('data-theme', theme);
  }, [brand, theme]);

  // Fetch package info
  useEffect(() => {
    fetch('https://registry.npmjs.org/@figkit/ui')
      .then(res => res.json())
      .then(data => {
        setPackageInfo({
          name: data.name,
          version: data['dist-tags']?.latest || 'unknown',
          description: data.description,
          repository: data.repository?.url,
          homepage: data.homepage,
          license: data.license,
          keywords: data.keywords,
          published: data.time?.[data['dist-tags']?.latest],
        });
      })
      .catch(err => {
        console.error('Failed to fetch package info:', err);
        setPackageInfo({ error: 'Failed to load package info' });
      });
  }, []);

  const components = [
    { name: 'Avatar', component: <Avatar size="large" variant="blue" initials="JD" /> },
    { name: 'Badge', component: <Badge variant="brand">Badge</Badge> },
    { name: 'Button', component: <Button variant="primary">Button</Button> },
    { name: 'Checkbox', component: <Checkbox checked label="Checkbox" /> },
    { name: 'Tab', component: <Tab selected>Tab</Tab> },
  ];

  const tabsItems: TabsItem[] = [
    { id: '1', label: 'Tab 1', badge: undefined },
    { id: '2', label: 'Tab 2', badge: undefined },
    { id: '3', label: 'Tab 3', badge: undefined },
  ];

  return (
    <div style={{
      minHeight: '100vh',
      padding: 'var(--space-4, 16px)',
      backgroundColor: 'var(--color-bg-default, #ffffff)',
      color: 'var(--color-text-default, rgba(0, 0, 0, 0.9))',
      fontFamily: 'var(--font-family-default, Inter, sans-serif)',
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <header style={{
          marginBottom: 'var(--space-6, 24px)',
          paddingBottom: 'var(--space-4, 16px)',
          borderBottom: '1px solid var(--color-border-default, #e6e6e6)',
        }}>
          <h1 style={{
            fontSize: '32px',
            fontWeight: 600,
            margin: '0 0 var(--space-4, 16px) 0',
            color: 'var(--color-text-default, rgba(0, 0, 0, 0.9))',
          }}>
            @figkit/ui Package Test Page
          </h1>
          
          {/* Controls */}
          <div style={{
            display: 'flex',
            gap: 'var(--space-4, 16px)',
            flexWrap: 'wrap',
            alignItems: 'center',
          }}>
            <div style={{ display: 'flex', gap: 'var(--space-2, 8px)', alignItems: 'center' }}>
              <label style={{ fontSize: '14px', fontWeight: 500 }}>Brand:</label>
              <select
                value={brand}
                onChange={(e) => setBrand(e.target.value as Brand)}
                style={{
                  padding: 'var(--space-2, 8px) var(--space-3, 12px)',
                  borderRadius: 'var(--radius-sm, 4px)',
                  border: '1px solid var(--color-border-default, #e6e6e6)',
                  backgroundColor: 'var(--color-bg-default, #ffffff)',
                  color: 'var(--color-text-default, rgba(0, 0, 0, 0.9))',
                  fontSize: '14px',
                  cursor: 'pointer',
                }}
              >
                {BRANDS.map(b => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
            </div>

            <div style={{ display: 'flex', gap: 'var(--space-2, 8px)', alignItems: 'center' }}>
              <label style={{ fontSize: '14px', fontWeight: 500 }}>Theme:</label>
              <div style={{ display: 'flex', gap: 'var(--space-2, 8px)' }}>
                <Button
                  variant={theme === 'light' ? 'primary' : 'secondary'}
                  size="default"
                  onClick={() => setTheme('light')}
                >
                  Light
                </Button>
                <Button
                  variant={theme === 'dark' ? 'primary' : 'secondary'}
                  size="default"
                  onClick={() => setTheme('dark')}
                >
                  Dark
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Available Components */}
        <section style={{
          marginBottom: 'var(--space-6, 24px)',
        }}>
          <h2 style={{
            fontSize: '20px',
            fontWeight: 600,
            margin: '0 0 var(--space-4, 16px) 0',
            color: 'var(--color-text-default, rgba(0, 0, 0, 0.9))',
          }}>
            Available Components
          </h2>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
            gap: 'var(--space-4, 16px)',
            marginBottom: 'var(--space-6, 24px)',
          }}>
            {components.map(({ name, component }) => (
              <div
                key={name}
                style={{
                  padding: 'var(--space-4, 16px)',
                  backgroundColor: 'var(--color-bg-default, #ffffff)',
                  borderRadius: 'var(--radius-md, 8px)',
                  border: '1px solid var(--color-border-default, #e6e6e6)',
                }}
              >
                <h3 style={{
                  fontSize: '14px',
                  fontWeight: 600,
                  margin: '0 0 var(--space-3, 12px) 0',
                  color: 'var(--color-text-default, rgba(0, 0, 0, 0.9))',
                }}>
                  {name}
                </h3>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60px' }}>
                  {component}
                </div>
              </div>
            ))}
          </div>

          {/* Component Showcase */}
          <div style={{
            padding: 'var(--space-4, 16px)',
            backgroundColor: 'var(--color-bg-default, #ffffff)',
            borderRadius: 'var(--radius-md, 8px)',
            border: '1px solid var(--color-border-default, #e6e6e6)',
          }}>
            <h3 style={{
              fontSize: '18px',
              fontWeight: 600,
              margin: '0 0 var(--space-4, 16px) 0',
              color: 'var(--color-text-default, rgba(0, 0, 0, 0.9))',
            }}>
              Component Showcase
            </h3>

            {/* Buttons - All Variants */}
            <div style={{ 
              marginBottom: 'var(--space-4, 16px)',
              paddingBottom: 'var(--space-4, 16px)',
              borderBottom: '1px solid var(--color-border-default, #e6e6e6)',
            }}>
              <h4 style={{ fontSize: '14px', fontWeight: 500, marginBottom: 'var(--space-2, 8px)' }}>Buttons - All Variants</h4>
              <div style={{ display: 'flex', gap: 'var(--space-2, 8px)', flexWrap: 'wrap' }}>
                <Button variant="primary">Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="destructive">Destructive</Button>
                <Button variant="success">Success</Button>
                <Button variant="inverse">Inverse</Button>
                <Button variant="figjam">Figjam</Button>
                <Button variant="secondary-destruct">Secondary Destruct</Button>
                <Button variant="link">Link</Button>
                <Button variant="link-danger">Link Danger</Button>
                <Button variant="ghost">Ghost</Button>
              </div>
              <div style={{ display: 'flex', gap: 'var(--space-2, 8px)', flexWrap: 'wrap', marginTop: 'var(--space-2, 8px)' }}>
                <Button variant="primary" size="large">Large</Button>
                <Button variant="primary" size="wide">Wide</Button>
                <Button variant="primary" disabled>Disabled</Button>
                <Button variant="primary" icon={<PlusIcon />} iconPosition="left">With Icon Left</Button>
                <Button variant="primary" icon={<CheckIcon />} iconPosition="right">With Icon Right</Button>
              </div>
            </div>

            {/* Badges - All Variants */}
            <div style={{ 
              marginBottom: 'var(--space-4, 16px)',
              paddingBottom: 'var(--space-4, 16px)',
              borderBottom: '1px solid var(--color-border-default, #e6e6e6)',
            }}>
              <h4 style={{ fontSize: '14px', fontWeight: 500, marginBottom: 'var(--space-2, 8px)' }}>Badges - All Variants</h4>
              <div style={{ display: 'flex', gap: 'var(--space-2, 8px)', flexWrap: 'wrap', alignItems: 'center' }}>
                <Badge variant="default">Default</Badge>
                <Badge variant="brand">Brand</Badge>
                <Badge variant="component">Component</Badge>
                <Badge variant="danger">Danger</Badge>
                <Badge variant="feedback">Feedback</Badge>
                <Badge variant="figjam">Figjam</Badge>
                <Badge variant="invert">Invert</Badge>
                <Badge variant="selected">Selected</Badge>
                <Badge variant="success">Success</Badge>
                <Badge variant="variable">Variable</Badge>
                <Badge variant="variable-selected">Variable Selected</Badge>
                <Badge variant="warn">Warn</Badge>
                <Badge variant="merged">Merged</Badge>
                <Badge variant="archived">Archived</Badge>
                <Badge variant="menu">Menu</Badge>
              </div>
              <div style={{ display: 'flex', gap: 'var(--space-2, 8px)', flexWrap: 'wrap', alignItems: 'center', marginTop: 'var(--space-2, 8px)' }}>
                <Badge variant="brand" size="large">Large</Badge>
                <Badge variant="brand" size="wide">Wide</Badge>
                <Badge variant="brand" strong>Strong</Badge>
                <Badge variant="brand" icon={<CheckIcon />} iconLead>With Icon</Badge>
                <Badge variant="brand" disabled>Disabled</Badge>
              </div>
            </div>

            {/* Avatars - All Variants */}
            <div style={{ 
              marginBottom: 'var(--space-4, 16px)',
              paddingBottom: 'var(--space-4, 16px)',
              borderBottom: '1px solid var(--color-border-default, #e6e6e6)',
            }}>
              <h4 style={{ fontSize: '14px', fontWeight: 500, marginBottom: 'var(--space-2, 8px)' }}>Avatars - All Variants</h4>
              <div style={{ marginBottom: 'var(--space-2, 8px)' }}>
                <h5 style={{ fontSize: '12px', fontWeight: 500, marginBottom: 'var(--space-1, 4px)' }}>Color Variants (Circle)</h5>
                <div style={{ display: 'flex', gap: 'var(--space-2, 8px)', flexWrap: 'wrap', alignItems: 'center' }}>
                  <Avatar size="default" variant="purple" initials="P" shape="circle" />
                  <Avatar size="default" variant="blue" initials="B" shape="circle" />
                  <Avatar size="default" variant="pink" initials="P" shape="circle" />
                  <Avatar size="default" variant="red" initials="R" shape="circle" />
                  <Avatar size="default" variant="yellow" initials="Y" shape="circle" />
                  <Avatar size="default" variant="green" initials="G" shape="circle" />
                  <Avatar size="default" variant="grey" initials="G" shape="circle" />
                  <Avatar size="default" variant="org" initials="ORG" shape="circle" />
                </div>
              </div>
              <div style={{ marginBottom: 'var(--space-2, 8px)' }}>
                <h5 style={{ fontSize: '12px', fontWeight: 500, marginBottom: 'var(--space-1, 4px)' }}>Color Variants (Square)</h5>
                <div style={{ display: 'flex', gap: 'var(--space-2, 8px)', flexWrap: 'wrap', alignItems: 'center' }}>
                  <Avatar size="default" variant="purple" initials="P" shape="square" />
                  <Avatar size="default" variant="blue" initials="B" shape="square" />
                  <Avatar size="default" variant="pink" initials="P" shape="square" />
                  <Avatar size="default" variant="red" initials="R" shape="square" />
                  <Avatar size="default" variant="yellow" initials="Y" shape="square" />
                  <Avatar size="default" variant="green" initials="G" shape="square" />
                  <Avatar size="default" variant="grey" initials="G" shape="square" />
                  <Avatar size="default" variant="org" initials="ORG" shape="square" />
                </div>
              </div>
              <div style={{ marginBottom: 'var(--space-2, 8px)' }}>
                <h5 style={{ fontSize: '12px', fontWeight: 500, marginBottom: 'var(--space-1, 4px)' }}>Sizes</h5>
                <div style={{ display: 'flex', gap: 'var(--space-2, 8px)', flexWrap: 'wrap', alignItems: 'center' }}>
                  <Avatar size="small" variant="blue" initials="S" />
                  <Avatar size="default" variant="blue" initials="M" />
                  <Avatar size="large" variant="blue" initials="L" />
                </div>
              </div>
              <div>
                <h5 style={{ fontSize: '12px', fontWeight: 500, marginBottom: 'var(--space-1, 4px)' }}>Overflow & Photo</h5>
                <div style={{ display: 'flex', gap: 'var(--space-2, 8px)', flexWrap: 'wrap', alignItems: 'center' }}>
                  <Avatar size="default" variant="photo" src="https://i.pravatar.cc/150?img=1" />
                  <Avatar size="default" variant="overflow-unread" count={5} />
                  <Avatar size="default" variant="overflow-read" count={3} />
                  <Avatar size="default" variant="blue" initials="JD" disabled />
                </div>
              </div>
            </div>

            {/* Tabs - All Variants */}
            <div style={{ 
              marginBottom: 'var(--space-4, 16px)',
              paddingBottom: 'var(--space-4, 16px)',
              borderBottom: '1px solid var(--color-border-default, #e6e6e6)',
            }}>
              <h4 style={{ fontSize: '14px', fontWeight: 500, marginBottom: 'var(--space-2, 8px)' }}>Tabs - All Variants</h4>
              <div style={{ marginBottom: 'var(--space-2, 8px)' }}>
                <Tabs items={tabsItems} defaultSelectedId="1" />
              </div>
              <div style={{ display: 'flex', gap: 'var(--space-2, 8px)', flexWrap: 'wrap' }}>
                <Tab selected>Selected Tab</Tab>
                <Tab>Unselected Tab</Tab>
                <Tab badge={5}>Tab with Badge</Tab>
                <Tab state="Hover">Hover State</Tab>
                <Tab state="Focused">Focused State</Tab>
              </div>
            </div>

            {/* Checkbox - All Variants */}
            <div style={{ marginBottom: 0 }}>
              <h4 style={{ fontSize: '14px', fontWeight: 500, marginBottom: 'var(--space-2, 8px)' }}>Checkbox - All Variants</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2, 8px)' }}>
                <Checkbox checked label="Checked" />
                <Checkbox label="Unchecked" />
                <Checkbox indeterminate label="Indeterminate" />
                <Checkbox checked disabled label="Checked Disabled" />
                <Checkbox disabled label="Unchecked Disabled" />
                <Checkbox checked muted label="Muted" />
                <Checkbox checked ghost label="Ghost" />
                <Checkbox checked focused label="Focused" />
                <Checkbox checked label="With Description" description="This is a description" />
              </div>
            </div>
          </div>
        </section>

        {/* Current Settings */}
        <section style={{
          padding: 'var(--space-4, 16px)',
          backgroundColor: 'var(--color-bg-default-secondary, var(--color-bg-default, #ffffff))',
          borderRadius: 'var(--radius-md, 8px)',
          border: '1px solid var(--color-border-default, #e6e6e6)',
          marginBottom: 'var(--space-6, 24px)',
        }}>
          <h3 style={{
            fontSize: '18px',
            fontWeight: 600,
            margin: '0 0 var(--space-3, 12px) 0',
            color: 'var(--color-text-default, rgba(0, 0, 0, 0.9))',
          }}>
            Current Settings
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--space-3, 12px)' }}>
            <div>
              <strong>Brand:</strong> <code>{brand}</code>
            </div>
            <div>
              <strong>Theme:</strong> <code>{theme}</code>
            </div>
            <div>
              <strong>URL:</strong> <code>/test-npm</code>
            </div>
          </div>
        </section>

        {/* Package Status - Moved to Bottom */}
        <section style={{
          padding: 'var(--space-4, 16px)',
          backgroundColor: 'var(--color-bg-default-secondary, var(--color-bg-default, #ffffff))',
          borderRadius: 'var(--radius-md, 8px)',
          border: '1px solid var(--color-border-default, #e6e6e6)',
        }}>
          <h2 style={{
            fontSize: '20px',
            fontWeight: 600,
            margin: '0 0 var(--space-3, 12px) 0',
            color: 'var(--color-text-default, rgba(0, 0, 0, 0.9))',
          }}>
            Package Status
          </h2>
          {packageInfo ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--space-3, 12px)' }}>
              <div>
                <strong>Name:</strong> {packageInfo.name || 'N/A'}
              </div>
              <div>
                <strong>Version:</strong> {packageInfo.version || 'N/A'}
              </div>
              <div>
                <strong>License:</strong> {packageInfo.license || 'N/A'}
              </div>
              {packageInfo.published && (
                <div>
                  <strong>Published:</strong> {new Date(packageInfo.published).toLocaleDateString()}
                </div>
              )}
              {packageInfo.description && (
                <div style={{ gridColumn: '1 / -1' }}>
                  <strong>Description:</strong> {packageInfo.description}
                </div>
              )}
              {packageInfo.keywords && (
                <div style={{ gridColumn: '1 / -1' }}>
                  <strong>Keywords:</strong> {packageInfo.keywords.join(', ')}
                </div>
              )}
            </div>
          ) : packageInfo?.error ? (
            <div style={{ color: 'var(--color-text-danger, #d32f2f)' }}>
              {packageInfo.error}
            </div>
          ) : (
            <div>Loading package info...</div>
          )}
        </section>
      </div>
    </div>
  );
}

