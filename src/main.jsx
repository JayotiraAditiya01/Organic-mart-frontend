import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { CartProvider } from './context/CartContext.jsx'
import { ThemeProvider } from './context/ThemeContext.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import { LikesProvider } from './context/LikesContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <LikesProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </LikesProvider>
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>,
)
