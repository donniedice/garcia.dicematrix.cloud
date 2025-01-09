// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Global Styles
import App from './App';
import reportWebVitals from './reportWebVitals';

// IMPORTANT: import the i18n setup before rendering
import './i18n';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Enable performance measurement (optional)
reportWebVitals();
