import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import './index.css';
import CoinProvider from './context/CoinContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <CoinProvider>
        <App />
      </CoinProvider>
    </Router>
  </React.StrictMode>
);
