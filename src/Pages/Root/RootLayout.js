/** @format */

import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

import AppNavbar from '../../Components/AppNavbar/AppNavbar';

const RootLayout = () => {
   const state = useSelector((state) => {
      return state.auth;
   });

   useEffect(() => {}, [state]);

   return (
      <>
         <AppNavbar
            login={state.jwt !== ''}
            role={state.selectedUserMode.role}
         />

         <Outlet />
      </>
   );
};

export default RootLayout;
