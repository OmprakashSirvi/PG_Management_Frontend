/** @format */

import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import { Button, Card, CardContent, Typography } from '@mui/material';
import { getCurrUserRole, setCurrUserRole } from '../../Contexts/CurrUserRole';
import Alert from '../Alert/Alert';
import { useNavigate } from 'react-router-dom';

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

   return <div></div>;
};

export default Usercard;
