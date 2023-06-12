/** @format */

import { Button } from '@material-tailwind/react';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Outlet, useNavigate } from 'react-router';
import { removeAuth } from '../Redux/store';

const ProtectedRoutes = ({ role }) => {
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const jwt = localStorage.getItem('jwt');

   // TODO add authenticated login here and direct if the user have required role
   const auth = useSelector((state) => {
      return state.auth;
   });

   // If localStorage has no jwt then redirect to login page
   if (!jwt) {
      window.alert('You are not logged in');
      navigate('/login');
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
      navigate('/');
   }

   function handleRouteToLogin() {
      console.log('Cleaning up the mess');
      // remove the jwt from the localStorage
      localStorage.removeItem('jwt');
      // remove refresh token from the localStorage
      localStorage.removeItem('refreshToken');
      // remove the selected user mode from the localStorage
      localStorage.removeItem('selectedUserModeRole');

      dispatch(removeAuth());

      navigate('/login');
   }

   if (auth.error) {
      return (
         <>
            There is some error in state, you need to login again{' '}
            <Button onClick={handleRouteToLogin}>Login</Button>
         </>
      );
   }

   return (
      <div>
         <Outlet />
      </div>
   );
};

export default ProtectedRoutes;
