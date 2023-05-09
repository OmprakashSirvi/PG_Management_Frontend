/** @format */

import React from 'react';
import { useSelector } from 'react-redux';
import Usercard from '../../Components/UserCard/UserCard';

import './RoleSelection.css';
import { Typography } from '@material-tailwind/react';

const RoleSelection = () => {
   const { userInfo, error, selectedUserMode, jwt } = useSelector((state) => {
      return state.auth;
   });

   if (jwt === '') {
      return <>You are not logged in</>;
   }

   if (error || (userInfo === undefined && userInfo.length === 0)) {
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
                     selectedUserRole={selectedUserMode.role}
                  />
               );
            })}
         </div>
      </>
   );
};

export default RoleSelection;
