/** @format */

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App/App';

import './index.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@material-tailwind/react';

import { store, persistedStore } from './Redux/store';
import { Provider } from 'react-redux';

import { PersistGate } from 'redux-persist/integration/react';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
   <ThemeProvider>
      <BrowserRouter>
         <Provider store={store}>
            <PersistGate persistor={persistedStore}>
               <App />
            </PersistGate>
         </Provider>
      </BrowserRouter>
   </ThemeProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
