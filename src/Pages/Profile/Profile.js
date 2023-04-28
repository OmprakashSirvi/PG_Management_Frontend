/** @format */

import React, { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import {
   Card,
   CardHeader,
   CardBody,
   CardFooter,
   Typography,
   Tooltip,
} from '@material-tailwind/react';

import {
   UserContextInfo,
   UserContextInfoList,
} from '../../Contexts/UserContextInfo';

import Alert from '../../Components/Alert/Alert';
import { useNavigate } from 'react-router-dom';
import { getCurrUserRole, setCurrUserRole } from '../../Contexts/CurrUserRole';

import './Profile.css';
import ConfirmDialog from '../../Components/AlertDialog/AlertDialog';

// If you are here then you are probably already logged in
const Profile = () => {
   const [showAlert, setShowAlert] = useState(false);
   const [showDialog, setShowDialog] = useState(false);

   const [userInfo, setUserInfo] = useState({
      firstName: '',
      lastName: '',
      email: '',
      mobileNumber: '',
      role: '',
   });
   const navigate = useNavigate();

   useEffect(() => {
      UserContextInfoList.map((ele) => {
         if (ele.role === localStorage.getItem('currRole')) {
            setUserInfo({ ...ele });
         }
      });
   }, []);

   const handleLogoutClick = () => {
      setShowDialog(true);
   };

   const handleLogout = () => {
      localStorage.removeItem('jwt');
      setTimeout(() => {
         setCurrUserRole('');
         navigate('/');
      }, 1000);
      setShowAlert(true);
   };

   const handleCancel = () => {
      setShowDialog(false);
   };

   if (showAlert) {
      return <Alert type={'warning'} message={'logged out of the system'} />;
   }

   if (showDialog) {
      return (
         <ConfirmDialog
            title={'logout'}
            message={'Do you want to logout?'}
            onConfirm={handleLogout}
            onCancel={handleCancel}
         />
      );
   }

   return (
      <div>
         <Typography variant="h3" className="mb-9 mu-3">
            User Info
         </Typography>
         <center>
            <Card className="w-96">
               <CardHeader floated={false} className="h-80">
                  <img src="" alt="profile-picture" />
               </CardHeader>
               <CardBody className="text-center">
                  <Typography variant="h4" color="blue-gray" className="mb-2">
                     {userInfo.firstName}{' '}
                     {userInfo.lastName && userInfo.lastName}
                  </Typography>
                  <Typography color="blue" className="font-medium" textGradient>
                     {userInfo.role === 'ROLE_OWNER' && 'Owner'}
                  </Typography>
                  <Typography color="blue" className="font-medium" textGradient>
                     {userInfo.mobileNumber}
                  </Typography>
               </CardBody>
               <CardFooter className="flex justify-center gap-7 pt-2"></CardFooter>
            </Card>
         </center>

         {/* <div className="user-card">
            {UserContextInfoList.map((ele, index) => {
               return <Usercard key={index} user={ele} />;
            })}
         </div> */}
         <Button
            style={{ backgroundColor: '#f44336' }}
            className="logout-button"
            variant="contained"
            onClick={handleLogoutClick}
         >
            Logout
         </Button>
      </div>
   );
};

export default Profile;
