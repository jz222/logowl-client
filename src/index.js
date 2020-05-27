import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import { StoreProvider } from './context';

import './index.css';

const app = (
    <StoreProvider>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </StoreProvider>
);

ReactDOM.render(app, document.getElementById('root'));
