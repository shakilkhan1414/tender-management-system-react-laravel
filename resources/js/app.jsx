import './bootstrap';
import React from 'react';
import ReactDOM from 'react-dom/client'
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.bundle.min';

import { App } from './components/App';

if(document.getElementById('app')){
    ReactDOM.createRoot(document.getElementById('app')).render(
        <React.StrictMode>
            <App />
        </React.StrictMode>,
      )
}


