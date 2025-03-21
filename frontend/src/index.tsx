// C:\Apps\Anto\brisa\frontend\src\index.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// Update this path to correctly point to your App.tsx file
import App from './app/App'; // This should match the exact case of your folder structure
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();