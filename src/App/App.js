/** @format */

import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import './App.css';

import Pg from '../Pages/PG/Pg';
import Home from '../Pages/Home/Home';
import RootLayout from '../Pages/Root/RootLayout';
import ErrorPage from '../Pages/ErrorPage/ErrorPage';
import PgDetails from '../Pages/PgDetails/PgDetails';

const router = createBrowserRouter([
   {
      path: '/',
      element: <RootLayout />,
      errorElement: <ErrorPage />,
      children: [
         { index: true, element: <Home /> },
         {
            path: 'pg',
            // TODO add seperate error page for Pg routes
            errorElement: <ErrorPage />,
            children: [
               { index: true, element: <Pg /> },
               { path: ':id', element: <PgDetails /> },
            ],
         },
      ],
   },
]);

function App() {
   return (
      <div className="App">
         <RouterProvider router={router} />
      </div>
   );
}

export default App;
