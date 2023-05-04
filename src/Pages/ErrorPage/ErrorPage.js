/** @format */
import React from 'react';
import AppNavbar from '../../Components/AppNavbar/AppNavbar';
import { useRouteError } from 'react-router-dom';

const ErrorPage = () => {
   const error = useRouteError();

   let title = 'Ann error occured';
   let message = 'something went wrong';

   if (error.data) {
      if (error.status === 404) {
         title = 'Not found!';
         message = 'Could not find resource or page.';
      }
      if (error.status === 500) {
         message = error.data.message;
      }
      if (error.data.status === 400) {
         title = 'Login fail';
         error.data.message;
      }
   }

   return (
      <React.Fragment>
         <AppNavbar login={false} />
         <p>{title}</p>
         <p>{message}</p>
      </React.Fragment>
   );
};

export default ErrorPage;
