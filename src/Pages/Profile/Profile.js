/** @format */

import React, { useState } from 'react';
import { Button } from '@mui/material';

import { UserContextInfoList } from '../../Contexts/UserContextInfo';
import Usercard from '../../Components/UserCard/UserCard';

import Alert from '../../Components/Alert/Alert';
import { useNavigate } from 'react-router-dom';
import { getCurrUserRole, setCurrUserRole } from '../../Contexts/CurrUserRole';

import './Profile.css';

// If you are here then you are probably already logged in
const Profile = () => {
   const [showAlert, setShowAlert] = useState(false);

   const navigate = useNavigate();

   const handleLogout = () => {
      localStorage.removeItem('jwt');
      setTimeout(() => {
         setCurrUserRole('');
         navigate('/');
      }, 1000);
      setShowAlert(true);
   };

   if (showAlert) {
      return <Alert type={'warning'} message={'logged out of the system'} />;
   }

   return (
      <div>
         <h1>user details page</h1>
         <div className="user-card">
            {UserContextInfoList.map((ele, index) => {
               return <Usercard key={index} user={ele} />;
            })}
         </div>
         <Button
            style={{ backgroundColor: '#f44336' }}
            className="logout-button"
            variant="contained"
            onClick={handleLogout}
         >
            Logout
         </Button>
      </div>
   );
};

export default Profile;
