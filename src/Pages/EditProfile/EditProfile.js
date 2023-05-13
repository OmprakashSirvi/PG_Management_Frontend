/** @format */

import React from 'react';
import UserForm from '../../Components/UserForm/UserForm';
import { useSelector } from 'react-redux';
import { Button } from '@material-tailwind/react';
import { Link } from 'react-router-dom';

const EditProfile = () => {
   const { userInfo } = useSelector((state) => {
      return state.auth;
   });

   return (
      <>
         <Button variant="outlined" color="gray" className="mb-4">
            <Link to="/upload-photo">Add Photo</Link>
         </Button>
         <UserForm method={'PATCH'} event={userInfo[0]} />;
      </>
   );
};

export default EditProfile;
