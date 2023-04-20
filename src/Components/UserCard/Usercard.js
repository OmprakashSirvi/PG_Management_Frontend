/** @format */

import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import { Button, Card, CardContent, Typography } from '@mui/material';
import { getCurrUserRole, setCurrUserRole } from '../../Contexts/CurrUserRole';
import Alert from '../Alert/Alert';
import { useNavigate } from 'react-router-dom';

const UsercardContainer = styled(Card)({
   margin: '25px',
   padding: '16px',
   backgroundColor: '#e6f2ff',
   boxShadow: '0px 0px 8px rgba(0, 0, 0, 0.1)',
   borderRadius: '8px',
   transition: 'box-shadow 0.3s ease-out, transform 0.3s ease-out',

   '&:hover': {
      boxShadow: '0px 0px 16px rgba(0, 0, 0, 0.3)',
      transform: 'scale(1.1)',
   },

   '&:hover ~ div': {
      opacity: 0.3,
   },
});

const UsercardContent = styled(CardContent)({
   display: 'flex',
   flexDirection: 'column',
   alignItems: 'center',
});

const ButtonWrapper = styled('div')({
   marginTop: 16,
});

const RoleWrapper = styled(Typography)({
   backgroundColor: '#ffe6e8',
   '&:hover': {
      boxShadow: '0px 0px 16px rgba(0, 0, 0, 0.3)',
      transform: 'scale(1.1)',
   },
});

const Usercard = ({ user }) => {
   const navigate = useNavigate();
   const [showAlert, setShowAlert] = useState(false);

   const handleSelect = () => {
      setTimeout(() => {
         navigate('/');
      }, 1000);
      setCurrUserRole(user.role);
      setShowAlert(true);
   };

   if (showAlert) {
      return <Alert type={'success'} message={`Role is set to ${user.role}`} />;
   }

   return (
      <UsercardContainer>
         <UsercardContent>
            {getCurrUserRole() === user.role && '<--Curr Role-->'}
            <Typography variant="h3" align="center">
               {user.firstName} {user.lastName && user.lastName}
            </Typography>
            <Typography variant="body1">Email: {user.email}</Typography>
            <Typography variant="body1">
               Mobile number: {user.mobileNumber}
            </Typography>
            <RoleWrapper variant="body1">Role: {user.role}</RoleWrapper>
            <ButtonWrapper>
               <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSelect}
                  disabled={getCurrUserRole() === user.role}
               >
                  Select
               </Button>
            </ButtonWrapper>
         </UsercardContent>
      </UsercardContainer>
   );
};

export default Usercard;
