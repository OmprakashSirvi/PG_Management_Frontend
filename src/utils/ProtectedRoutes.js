/** @format */

import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router';

const ProtectedRoutes = ({ role }) => {
   // TODO add authenticated login here and direct if the user have required role
   const { jwt, selectedUserMode } = useSelector((state) => {
      return state.auth;
   });

   if (!jwt) {
      window.alert('You are not logged in');
      return <Navigate to={'/login'} />;
   }

   if (role !== undefined && selectedUserMode.role !== role) {
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
