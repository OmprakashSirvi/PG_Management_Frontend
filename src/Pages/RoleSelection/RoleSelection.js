/** @format */

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Usercard from '../../Components/UserCard/UserCard';

import './RoleSelection.css';
import { Typography } from '@material-tailwind/react';
import { getUserInfo } from '../../Redux/store';
import { Link } from 'react-router-dom';

const RoleSelection = () => {
   const dispatch = useDispatch();

   const { userInfo, error } = useSelector((state) => {
      return state.auth;
   });

   console.log('Userinfo from role selection', userInfo);

   const jwt = localStorage.getItem('jwt');
   const selectedUserModeRole = localStorage.getItem('selectedUserModeRole');

   if (jwt === '') {
      return <>You are not logged in</>;
   }

   // Here is jwt is present but user info is not present
   // Then we need to fetch the user info
   useEffect(() => {
      dispatch(getUserInfo());
   }, []);

   if (error) {
      // remove the jwt from the localStorage
      localStorage.removeItem('jwt');
      // remove refresh token from the localStorage
      localStorage.removeItem('refreshToken');
      // remove the selected user mode from the localStorage
      localStorage.removeItem('selectedUserModeRole');

      return (
         <>
            You are not logged in to access this. Your tokens are invalid{' '}
            <Link to={'/login'}>Login</Link>{' '}
         </>
      );
   }

   if (userInfo === undefined && userInfo.length === 0) {
      return <>No user list present currently</>;
   }

   return (
      <>
         <Typography variant="h3">Select your role</Typography>
         <div className="grid-container">
            {userInfo.map((user, index) => {
               return (
                  <Usercard
                     key={index}
                     user={user}
                     selectedUserRole={selectedUserModeRole}
                  />
               );
            })}
         </div>
      </>
   );
};

export default RoleSelection;
