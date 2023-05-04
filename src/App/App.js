/** @format */

import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import './App.css';

import Pg, { loader as pgLoader } from '../Pages/PG/Pg';
import Home from '../Pages/Home/Home';
import RootLayout from '../Pages/Root/RootLayout';
import ErrorPage from '../Pages/ErrorPage/ErrorPage';

import PgDetails, {
   loader as pgDetailsLoader,
   action as pgDeleteAction,
} from '../Pages/PgDetails/PgDetails';

import EditPg from '../Pages/EditPg/EditPg';
import AddRoom from '../Pages/AddRoom/AddRoom';

import AddPg from '../Pages/AddPg/AddPg';
import Login, { action as loginAction } from '../Pages/Login/Login';
import { action as manipulatePg } from '../Components/PgForm/PgForm';

const router = createBrowserRouter([
   {
      path: '/',
      element: <RootLayout />,
      errorElement: <ErrorPage />,
      children: [
         { index: true, element: <Home /> },
         { path: 'login', element: <Login />, action: loginAction },
         {
            path: 'pg',
            // TODO add seperate error page for Pg routes
            children: [
               {
                  index: true,
                  element: <Pg />,
                  loader: pgLoader,
               },
               {
                  id: 'pg-detail',
                  path: ':id',
                  loader: pgDetailsLoader,
                  children: [
                     {
                        index: true,
                        element: <PgDetails />,
                        action: pgDeleteAction,
                     },
                     {
                        path: 'edit',
                        element: <EditPg />,
                        action: manipulatePg,
                     },
                     { path: 'add-room', element: <AddRoom /> },
                  ],
               },
               { path: 'add-pg', element: <AddPg />, action: manipulatePg },
            ],
         },

         {},
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
