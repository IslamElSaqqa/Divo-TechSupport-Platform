import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthContextProvider } from './context/AuthContext/AuthContext';
import { WindowsErrorsContextProvider } from './context/WindowsErrors/windowsErrorsContext';
import { RepairShopsContextProvider } from './context/RepairShops/repairShopsContext';
import { ScraperProvider } from './context/ScrapingContext/ScraperContext';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <WindowsErrorsContextProvider>
        <RepairShopsContextProvider>
            <ScraperProvider>
                <App />
            </ScraperProvider>
          </RepairShopsContextProvider>
      </WindowsErrorsContextProvider>
  </AuthContextProvider>
  </React.StrictMode>
);

