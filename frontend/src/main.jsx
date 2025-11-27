// src/main.jsx

import React from 'react';
import ReactDOM from 'react-dom/client'; // <-- FIX: This specific import is crucial
import App from './App.jsx';
import { AuthProvider } from './context/AuthContext.jsx'; 
import './index.css'; 

// Ensure you are using ReactDOM.createRoot correctly after importing it
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>,
);