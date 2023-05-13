/** @format */
import React from 'react';
import AppNavbar from '../../Components/AppNavbar/AppNavbar';
import { useRouteError } from 'react-router-dom';
import { Typography } from '@material-tailwind/react';

const ErrorPage = () => {
   const error = useRouteError();

   let title = 'An error occured';
   let message = 'something went wrong';

   console.log('error', error);

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
         message = error.data.message;
      }
      if (error.data.status === 401) {
         title = 'Not Logged in';
         message = 'You need to be signed in to access it';
      }
   }

   return (
      <React.Fragment>
         <AppNavbar login={false} />
         <Typography variant="h3">{title}</Typography>
         <Typography>{message}</Typography>
      </React.Fragment>
   );
};

export default ErrorPage;
