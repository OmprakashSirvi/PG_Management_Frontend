/** @format */

import { select } from '@material-tailwind/react';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router';
import { getUserInfo } from '../Redux/store';

const ProtectedRoutes = ({ role }) => {
   const jwt = localStorage.getItem('jwt');

   // TODO add authenticated login here and direct if the user have required role
   const { selectedUserMode } = useSelector((state) => {
      return state.auth;
   });

   // If localStorage has no jwt then redirect to login page
   if (!jwt) {
      window.alert('You are not logged in');
      return <Navigate to={'/login'} />;
   }

   // All this action should take place one the component is loaded
   useEffect(() => {
      // Check if the store has user details
   }, []);

   // The selected user mode is stored in localstorage
   if (
      role !== undefined &&
      localStorage.getItem('selectedUserModeRole') !== role
   ) {
      window.alert('You do not have access');
      return <Navigate to={'/'} />;
   }

   return (
      <div>
         <Outlet />
      </div>
   );
};

export default ProtectedRoutes;
