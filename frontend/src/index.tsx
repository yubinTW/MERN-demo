import React from 'react'
import './index.css'
import App from './App'
import * as ReactDOMClient from 'react-dom/client'
import mockServer from './services/mockService'

const rootContainer = document.getElementById('root')
if (rootContainer) {
  const root = ReactDOMClient.createRoot(rootContainer)
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )

  mockServer()
} else {
  document.write('cannot find root element')
}
