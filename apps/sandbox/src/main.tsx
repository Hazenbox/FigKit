import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@figkit/themes/dist/tokens.css'
// Use alias path for dev mode (resolves to packages/ui/src/index.css)
import '@figkit/ui/index.css'
import './index.css'
import App from './App.tsx'

document.documentElement.setAttribute('data-brand', 'acme')
document.documentElement.setAttribute('data-theme', 'light')

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
