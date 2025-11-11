import { useState } from 'react'
import { Button } from '@figkit/ui'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div style={{ 
      padding: 'var(--space-4)', 
      maxWidth: '800px', 
      margin: '0 auto',
      background: 'var(--color-bg-surface)',
      borderRadius: 'var(--radius-md)',
      marginTop: 'var(--space-4)'
    }}>
      <h1 style={{ 
        color: 'var(--color-fg-text)',
        marginBottom: 'var(--space-4)'
      }}>
        Sandbox App
      </h1>
      
      <div style={{ 
        display: 'flex', 
        gap: 'var(--space-4)', 
        marginBottom: 'var(--space-4)',
        flexWrap: 'wrap'
      }}>
        <Button onClick={() => setCount((count) => count + 1)}>
          Count: {count}
        </Button>
        <Button onClick={() => alert('Button clicked!')}>
          Click me
        </Button>
        <Button onClick={() => console.log('Action triggered')}>
          Action
        </Button>
      </div>

      <div style={{ 
        padding: 'var(--space-4)',
        background: 'var(--color-bg-brand-primary)',
        borderRadius: 'var(--radius-md)',
        color: 'var(--color-fg-text)'
      }}>
        <p>This demonstrates the UI components using design tokens.</p>
        <p>Brand: <code>acme</code> | Theme: <code>light</code></p>
        <p>All styling uses CSS variables from the design tokens.</p>
      </div>
    </div>
  )
}

export default App
