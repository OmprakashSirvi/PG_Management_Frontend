/** @format */
import React from 'react';
import { createBrowserRouter } from 'react-router-dom';

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
import RoleSelection from '../Pages/RoleSelection/RoleSelection';
import Profile from '../Pages/Profile/Profile';
import Register from '../Pages/register/Register';
import { action as mainpulateUser } from '../Components/UserForm/UserForm';
import ProtectedRoutes from '../utils/ProtectedRoutes';
import EditProfile from '../Pages/EditProfile/EditProfile';
import PgResidents, {
   loader as pgGuestsLoader,
} from '../Pages/PgResidents/PgResidents';
import Residents from '../Pages/Residents/Residents';
import VerifyUser, {
   action as verifyUserAction,
} from '../Pages/VerifyUser/VerifyUser';
import Rooms, { loader as roomLoader } from '../Pages/Rooms/Rooms';

export const AppRouter = createBrowserRouter([
   {
      path: '/',
      element: <RootLayout />,
      errorElement: <ErrorPage />,
      children: [
         { index: true, element: <Home /> },
         { path: 'login', element: <Login />, action: loginAction },
         { path: 'register', element: <Register />, action: mainpulateUser },
         {
            path: 'verify-user',
            element: <VerifyUser />,
            action: verifyUserAction,
         },
         {
            element: <ProtectedRoutes />,
            children: [
               { path: 'select-role', element: <RoleSelection /> },
               { path: 'profile', element: <Profile /> },
               {
                  path: 'edit-profile',
                  element: <EditProfile />,
                  action: mainpulateUser,
               },
            ],
         },
         {
            element: <ProtectedRoutes role={'ROLE_OWNER'} />,
            children: [{ path: 'residents', element: <Residents /> }],
         },
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
                        element: <ProtectedRoutes role={'ROLE_OWNER'} />,
                        children: [
                           {
                              path: 'edit',
                              element: <EditPg />,
                              action: manipulatePg,
                           },
                           {
                              path: 'rooms',
                              element: <Rooms />,
                              loader: roomLoader,
                           },
                           {
                              path: 'view-residents',
                              element: <PgResidents />,
                              loader: pgGuestsLoader,
                           },
                        ],
                     },
                  ],
               },
               {
                  element: <ProtectedRoutes role={'ROLE_OWNER'} />,
                  children: [
                     {
                        path: 'add-pg',
                        element: <AddPg />,
                        action: manipulatePg,
                     },
                  ],
               },
            ],
         },
      ],
   },
]);
