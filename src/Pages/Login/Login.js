/** @format */

import React, { useState } from 'react';

import { styled } from '@mui/material/styles';
import { TextField, Button } from '@mui/material';
import { css } from '@emotion/react';

import { getUser, login } from '../../Redux/Slice/authSlice';
import { loginUser } from '../../utils/ApiRequests';
import Alert from '../../Components/Alert/Alert';
import { useNavigate } from 'react-router';
import { CheckLogin } from '../../utils/CheckLogin';
import { useDispatch, useSelector } from 'react-redux';

const Form = styled('form')(css`
   display: flex;
   flex-direction: column;
   align-items: center;
`);

const Input = styled(TextField)(css`
   && {
      margin: 1rem;
      width: 25ch;
   }
`);

const SubmitButton = styled(Button)(css`
   && {
      margin: 1rem 0 2rem;
   }
`);

const Login = () => {
   const [formData, setFormData] = useState({
      email: 'ownermail1@gmail.com',
      password: 'owner1234',
   });
   const [alertMess, setAlertMess] = useState();
   const [showAlert, setShowAlert] = useState(false);

   const dispatch = useDispatch();

   const navigate = useNavigate();

   const handleInputChange = (event) => {
      const { name, value } = event.target;
      setFormData({ ...formData, [name]: value });
      setShowAlert(false);
      setAlertMess({});
   };

   const handleSubmit = (event) => {
      event.preventDefault();

      dispatch(login(formData));
      // .then((result) => {
      //    // console.log(result.payload.jwt);
      //    if (result.payload.jwt === undefined) {
      //       console.log('error');
      //       setAlertMess({ type: 'error', message: 'invalid credentials' });
      //       setShowAlert(true);
      //       return;
      //    }
      //    dispatch(getUser(result.payload.jwt));
      // });
   };

   return (
      <div>
         <Form onSubmit={handleSubmit}>
            <Input
               type="email"
               name="email"
               label="Email"
               variant="outlined"
               value={formData.email}
               onChange={handleInputChange}
            />
            <Input
               type="password"
               name="password"
               label="Password"
               variant="outlined"
               value={formData.password}
               onChange={handleInputChange}
            />
            <SubmitButton type="submit" variant="contained">
               Submit
            </SubmitButton>
         </Form>
         {showAlert && (
            <Alert type={alertMess.type} message={alertMess.message} />
         )}
      </div>
   );
};

export default Login;
