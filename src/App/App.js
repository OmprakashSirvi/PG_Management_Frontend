/** @format */

import React from 'react';
import { RouterProvider } from 'react-router-dom';

import './App.css';

import { AppRouter } from '../Router/AppRouter';

function App() {
   return (
      <div className="App">
         <RouterProvider router={AppRouter} />
      </div>
   );
}

export default App;
