import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import AppContextProvider from './context/AppContext';
 
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <AppContextProvider>
      <App />
      <Toaster />
    </AppContextProvider>
  </Router>
);