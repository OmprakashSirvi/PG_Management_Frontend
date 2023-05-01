/** @format */

import React from 'react';
import { Outlet } from 'react-router';

const ProtectedRoutes = () => {
   // TODO add authenticated login here and direct if the user have required role
   return (
      <div>
         <Outlet />
      </div>
   );
};

export default ProtectedRoutes;
