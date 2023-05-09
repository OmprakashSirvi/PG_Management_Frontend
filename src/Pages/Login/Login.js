/** @format */

import React, { useEffect } from 'react';
import {
   Form,
   Link,
   json,
   useActionData,
   useNavigation,
   useNavigate,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setAuth, getUserInfo } from '../../Redux/store';

import { loginUser } from '../../utils/ApiRequests';

const Login = () => {
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const actionData = useActionData();
   const navigation = useNavigation();

   const isSubmitting = navigation.state === 'submitting';

   const { isLoading, error, userInfo } = useSelector((state) => {
      return state.auth;
   });

   useEffect(() => {
      if (actionData) {
         if (actionData.jwt) {
            const jwt = actionData.jwt;
            dispatch(setAuth({ jwt }));
            dispatch(getUserInfo(jwt));
         }
      }
   }, [actionData]);

   if (isLoading || navigation.state === 'loading') {
      return <>Loading...</>;
   }

   if (error) {
      return <>There was some error in loading user data</>;
   }

   if (userInfo.length !== 0) {
      // TODO add confirm dialog here
      return (
         <>
            <p>You are already logged in</p>
            <Link to="/">Home</Link>
            <p>Or you can select your role</p>
            <Link to={'/select-role'}>Here</Link>
         </>
      );
   }

   return (
      <div>
         {actionData && actionData.error && (
            <>
               <p>{actionData.message}</p>
            </>
         )}
         <Form method="post">
            <label>Email</label>
            <input type="email" name="email" label="Email" />
            <label>Password</label>
            <input type="password" name="password" label="Password" />
            <button type="submit" disabled={isSubmitting}>
               {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
         </Form>
      </div>
   );
};

export async function action({ request }) {
   const data = await request.formData();

   const credentials = {
      email: data.get('email') || 'ownermail1@gmail.com',
      password: data.get('password') || 'owner1234',
   };

   const res = await loginUser(credentials);

   if (!res) {
      throw json({ message: 'login fail', status: 500 });
   }

   if (res.response) {
      if (res.response.data.code === 400) {
         return { message: 'invalid credentials', error: true, status: 400 };
      }
   }

   return res.data;

   // const action = setAuth({ jwt: res.data.jwt });

   // return action;

   // TODO gonna remove this code, only for experimental purpose
   // localStorage.setItem('jwt', res.data.jwt);
}

export default Login;
