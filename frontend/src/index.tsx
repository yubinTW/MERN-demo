import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { startMockServer } from './services/mockService'


const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

if (process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'development') {
  startMockServer()
}
