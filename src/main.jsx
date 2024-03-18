import React from 'react';
import ReactDOM from 'react-dom/client';
//npm install react-router-dom
import { BrowserRouter } from 'react-router-dom';
import 'modern-normalize';
import './index.css';
import App from './components/App/App';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);