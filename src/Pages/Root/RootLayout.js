/** @format */

import React from 'react';
import { Outlet } from 'react-router-dom';

import AppNavbar from '../../Components/AppNavbar/AppNavbar';

const RootLayout = () => {
   return (
      <>
         <AppNavbar login={false} />

         <Outlet />
      </>
   );
};

export default RootLayout;
