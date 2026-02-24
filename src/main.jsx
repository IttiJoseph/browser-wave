import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Expose audio engine on window for Step 2 console testing.
// Remove before Step 3.
import * as engine from './audio/engine.js'
window.__synth = engine
window.audioEngine = engine

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
