import React from 'react'
import ReactDOM from 'react-dom/client'

import { RouterProvider } from 'react-router-dom'
import { ToastProvider } from './provider/toast-provider.jsx'
import { ThemeProvider } from './components/theme-provider.jsx'

import router from './router'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="light" storageKey='vite-ui-theme'>
      <RouterProvider router={router} />
      <ToastProvider/>
    </ThemeProvider>
    
  </React.StrictMode>
)

