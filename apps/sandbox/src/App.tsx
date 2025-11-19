import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import TestNpm from './pages/TestNpm'
import Performance from './pages/Performance'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/test-npm" element={<TestNpm />} />
        <Route path="/performance" element={<Performance />} />
        <Route path="/storybook" element={
          <div style={{ 
            minHeight: '100vh', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            flexDirection: 'column',
            gap: 'var(--space-4, 16px)',
            padding: 'var(--space-4, 16px)'
          }}>
            <h1>Storybook</h1>
            <p>Storybook is available at <a href="http://localhost:6006" target="_blank" rel="noopener noreferrer">http://localhost:6006</a></p>
            <a href="http://localhost:6006" target="_blank" rel="noopener noreferrer">
              <button style={{
                padding: 'var(--space-3, 12px) var(--space-4, 16px)',
                backgroundColor: 'var(--color-bg-brand, #0D99FF)',
                color: 'var(--color-text-onbrand, #FFFFFF)',
                border: 'none',
                borderRadius: 'var(--radius-md, 8px)',
                cursor: 'pointer',
                fontSize: '16px',
                fontWeight: 500,
              }}>
                Open Storybook
              </button>
            </a>
          </div>
        } />
      </Routes>
    </BrowserRouter>
  )
}

export default App
