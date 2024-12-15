// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client'; // Note: Import from 'react-dom/client'
import './index.css'; // Import the TailwindCSS file
import App from './App';

// Create a root element and render the app
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
