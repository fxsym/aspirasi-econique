import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import HomePage from './assets/pages/HomePage'
import { RouterProvider } from 'react-router-dom'
import { router } from './assets/routes/AppRoute'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
