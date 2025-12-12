// client/src/main.jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom' // Import this
import App from './App.jsx'
//import './index.css' // (Whatever css import you have)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter> {/* Wrap App with this */}
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)