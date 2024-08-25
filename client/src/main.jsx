import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Peliculas from './App.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Peliculas />
  </StrictMode>,
)
