/** @format */

import React from 'react';
import { Button } from '@mui/material';
import {
   Card,
   CardHeader,
   CardBody,
   CardFooter,
   Typography,
} from '@material-tailwind/react';

import { useDispatch, useSelector } from 'react-redux';
import './Profile.css';
import { Link } from 'react-router-dom';
import { removeAuth } from '../../Redux/store';
import { REACT_APP_API_URL } from '../../utils/ApiRequests';

// If you are here then you are probably already logged in
const Profile = () => {
   const API_URL = REACT_APP_API_URL;

   const dispatch = useDispatch();
   const auth = useSelector((state) => {
      return state.auth;
   });

   let userInfo = { firstName: '', lastName: '', role: '', mobileNumber: '' };

   if (auth.jwt === '') {
      return <>Not logged in</>;
   }

   if (auth.userInfo.length !== 0) {
      userInfo = auth.userInfo.filter(
         (user) => user.role === auth.selectedUserMode.role
      )[0];
   }

   if (userInfo === undefined) {
      return (
         <>
            <p>No user profile information to display here </p>
            <p>
               You probably did not select your role you can do it{' '}
               <Link to="/select-role" className="underline text-blue-200">
                  here
               </Link>
            </p>
         </>
      );
   }
   function handleLogoutClick() {
      dispatch(removeAuth());
   }

   // if (showDialog) {
   //    return (
   //       <ConfirmDialog
   //          title={'logout'}
   //          message={'Do you want to logout?'}
   //          onConfirm={handleLogout}
   //          onCancel={handleCancel}
   //       />
   //    );
   // }

   return (
      <div>
         <Typography variant="h3" className="mb-9 mu-3">
            User Info
         </Typography>
         <center>
            <Card className="w-96">
               <CardHeader floated={false} className="h-80">
                  <img
                     src={`${API_URL}/api/v1/images/user/${userInfo.image}`}
                     alt="profile-picture"
                  />
               </CardHeader>
               <CardBody className="text-center">
                  <Typography variant="h4" color="blue-gray" className="mb-2">
                     {userInfo.firstName}{' '}
                     {userInfo.lastName && userInfo.lastName}
                  </Typography>
                  <Typography color="blue" className="font-medium" textGradient>
                     {(userInfo.role === 'ROLE_OWNER' && 'Owner') || ''}
                  </Typography>
                  <Typography color="blue" className="font-medium" textGradient>
                     {userInfo.mobileNumber || ''}
                  </Typography>
               </CardBody>
               <CardFooter className="flex justify-center gap-7 pt-2">
                  Footer
               </CardFooter>
            </Card>
         </center>

         {/* <div className="user-card">
            {UserContextInfoList.map((ele, index) => {
               return <Usercard key={index} user={ele} />;
            })}
         </div> */}
         <Button
            style={{ backgroundColor: '#f44336', margin: '20px' }}
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
