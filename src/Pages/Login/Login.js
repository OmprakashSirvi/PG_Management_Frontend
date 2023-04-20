/** @format */

import React, { useState } from 'react';

import { styled } from '@mui/material/styles';
import { TextField, Button } from '@mui/material';
import { css } from '@emotion/react';

import { loginUser } from '../../utils/ApiRequests';
import Alert from '../../Components/Alert/Alert';
import { useNavigate } from 'react-router';
import { CheckLogin } from '../../utils/CheckLogin';

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
   const [formData, setFormData] = useState({ email: '', password: '' });
   const [alertMess, setAlertMess] = useState();
   const [showAlert, setShowAlert] = useState(false);
   const [error, setError] = useState(null);

   const navigate = useNavigate();

   const handleInputChange = (event) => {
      const { name, value } = event.target;
      setFormData({ ...formData, [name]: value });
      setShowAlert(false);
      setAlertMess({});
      setError(null);
   };

   const handleSubmit = (event) => {
      event.preventDefault();
      const login = async () => {
         try {
            const res = await loginUser(formData);

            if (res.data === null) {
               throw new Error();
            }

            localStorage.setItem('jwt', res.data.jwt);

            setShowAlert(true);
            setAlertMess({
               type: 'success',
               message: 'log in success',
            });

            setError(null);

            CheckLogin();

            setTimeout(() => {
               navigate('/');
            }, 1000);

            // navigate('/');
            // navigating to home
         } catch (err) {
            console.log(err);

            setAlertMess({
               type: 'error',
               message: 'something went wrong',
            });
            setShowAlert(true);
            setError(err);
         }
      };
      login();
   };

   return (
      <div>
         <Form onSubmit={handleSubmit}>
            <Input
               type="email"
               name="email"
               label="Email"
               variant="outlined"
               onChange={handleInputChange}
            />
            <Input
               type="password"
               name="password"
               label="Password"
               variant="outlined"
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
