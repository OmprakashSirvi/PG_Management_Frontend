/** @format */

import React, { useState } from 'react';

import { styled } from '@mui/material/styles';
import { TextField, Button } from '@mui/material';
import { css } from '@emotion/react';

import { loginUser } from '../../utils/ApiRequests';
import Alert from '../../Components/Alert/Alert';

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
   const [error, setError] = useState(null);

   const handleInputChange = (event) => {
      const { name, value } = event.target;
      setFormData({ ...formData, [name]: value });
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
            setError(null);
         } catch (err) {
            setError('Invalid Email or password');
         }
      };
      login();
   };

   return (
      <div>
         {error !== null && <Alert type="error" message={error} />}
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
      </div>
   );
};

export default Login;
