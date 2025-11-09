import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@org/themes/dist/tokens.css'
import '@org/ui/index.css'
import './index.css'
import App from './App.tsx'

document.documentElement.setAttribute('data-brand', 'acme')
document.documentElement.setAttribute('data-theme', 'light')

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
