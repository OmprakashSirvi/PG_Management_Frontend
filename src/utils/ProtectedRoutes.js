/** @format */

import { Button } from '@material-tailwind/react';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router';
import { getUserInfo, removeAuth } from '../Redux/store';

const ProtectedRoutes = ({ role }) => {
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const jwt = localStorage.getItem('jwt');

   // TODO add authenticated login here and direct if the user have required role
   const auth = useSelector((state) => {
      return state.auth;
   });

   useEffect(() => {
      if (jwt && auth?.userInfo?.length === 0 && auth?.loading === false) {
         dispatch(getUserInfo());
      }
   }, []);

   // If localStorage has no jwt then redirect to login page
   if (!jwt) {
      window.alert('You are not logged in');
      window.location.href = '/login';
      return;
   }

   // The selected user mode is stored in localstorage
   else if (
      role !== undefined &&
      localStorage.getItem('selectedUserModeRole') !== role
   ) {
      window.alert('You do not have access');
      window.location.href = '/login';
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
      console.log(auth?.error);
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
