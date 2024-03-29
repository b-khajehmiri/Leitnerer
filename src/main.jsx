import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.scss'
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter basename="/leitnerer">
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)
