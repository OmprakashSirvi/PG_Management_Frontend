/** @format */

import React from 'react';
import { Form, json, redirect } from 'react-router-dom';
import { loginUser } from '../../utils/ApiRequests';

const Login = () => {
   return (
      <div>
         <Form method="post">
            <label>Email</label>
            <input type="email" name="email" label="Email" />
            <label>Password</label>
            <input type="password" name="password" label="Password" />
            <button type="submit">Submit</button>
         </Form>
      </div>
   );
};

export async function action({ request }) {
   const data = await request.formData();

   const credentials = {
      email: data.get('email'),
      password: data.get('password'),
   };

   const res = await loginUser(credentials);

   if (!res) {
      throw json({ message: 'login fail', status: 500 });
   }

   if (res.response) {
      if (res.response.data.code === 400) {
         throw json({ message: 'invalid credentials', status: 400 });
      }
   }

   // TODO gonna remove this code, only for experimental purpose
   localStorage.setItem('jwt', res.data.jwt);

   return redirect('/');
}

export default Login;
