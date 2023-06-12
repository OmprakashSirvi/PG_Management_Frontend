/** @format */
import React from 'react';
import AppNavbar from '../../Components/AppNavbar/AppNavbar';
import { useRouteError } from 'react-router-dom';
import { Typography } from '@material-tailwind/react';
import { useDispatch } from 'react-redux';
import { removeAuth } from '../../Redux/store';

const ErrorPage = () => {
   const error = useRouteError();
   const dispatch = useDispatch();

   let title = 'An error occured';
   let message = 'something went wrong';

   console.log('error', error);

   if (error?.data?.status === 403) {
      localStorage.removeItem('jwt');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('selectedUserModeRole');

      dispatch(removeAuth());

      console.log('This is probably due to the tokens are invalid');
      title = 'You are unauthorized to access this';
      message = 'I would suggest you to login again';
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
