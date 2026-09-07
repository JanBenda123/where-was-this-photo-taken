import React from 'react'
import ReactDOM from 'react-dom/client'
import AppInterface from './appInterface/AppInterface'

const rootElement = document.getElementById('root')!

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <AppInterface />
  </React.StrictMode>
)