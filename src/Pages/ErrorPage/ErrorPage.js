/** @format */
import React from 'react';
import AppNavbar from '../../Components/AppNavbar/AppNavbar';

const ErrorPage = () => {
   return (
      <React.Fragment>
         <AppNavbar login={false} />
         <h1 className="font-bold">No Page found</h1>
      </React.Fragment>
   );
};

export default ErrorPage;
