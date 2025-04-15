import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './assets/style/main.css'
import {App} from './RootCmp'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
