import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css';
import { UserProvider } from './context/UserContext';

createRoot(document.getElementById('root')).render(
  <StrictMode>
        <UserProvider> {/* Wrap App with UserProvider */}
            <App />
        </UserProvider>
  </StrictMode>,
)
