/** @format */

import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import AppNavbar from '../../Components/AppNavbar/AppNavbar';
import AppFooter from '../../Components/AppFooter/AppFooter';
import { setAuth, setRole } from '../../Redux/store';

const RootLayout = () => {
   const dispatch = useDispatch();
   const state = useSelector((state) => {
      return state.auth;
   });

   useEffect(() => {
      if (localStorage.getItem('jwt') !== null) {
         console.log('Setting auth');
         dispatch(setAuth({ jwt: localStorage.getItem('jwt') }));
      }
      if (localStorage.getItem('selectedUserModeRole') !== null) {
         console.log('Setting role');
         dispatch(setRole(localStorage.getItem('selectedUserModeRole')));
      }
   }, []);

   return (
      <>
         <AppNavbar
            login={state.jwt !== ''}
            role={state?.selectedUserMode?.role}
         />

         <Outlet />
         <AppFooter />
      </>
   );
};

export default RootLayout;
