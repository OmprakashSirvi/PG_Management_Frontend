/** @format */

import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import { TextField, Button } from '@mui/material';
import { css } from '@emotion/react';
import { loginUser } from '../../utils/ApiRequests';

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

   const handleInputChange = (event) => {
      const { name, value } = event.target;
      setFormData({ ...formData, [name]: value });
   };

   const handleSubmit = (event) => {
      event.preventDefault();
      const login = async () => {
         const data = await loginUser(formData);
         console.log(data);
      };
      login();
   };

   return (
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
   );
};

export default Login;
