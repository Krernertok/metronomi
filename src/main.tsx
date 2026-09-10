import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'

// Supports weights 300-700
import '@fontsource-variable/quicksand/wght.css';

const root = document.getElementById('root');

if (root) {
  createRoot(root).render(
    <StrictMode>
    <App />
    </StrictMode>,
  )
}
