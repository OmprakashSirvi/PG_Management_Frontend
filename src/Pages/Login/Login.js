/** @format */

import React, { useEffect, useState } from 'react';
import {
   Form,
   Link,
   json,
   useActionData,
   useNavigate,
   useNavigation,
} from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { setAuth, getUserInfo, removeAuth } from '../../Redux/store';

import { loginUser } from '../../Api/ApiRequests';
import { Button, Typography } from '@material-tailwind/react';

const Login = () => {
   const dispatch = useDispatch();
   const actionData = useActionData();
   const navigation = useNavigation();
   const navigate = useNavigate();

   // set the shake state to false
   const [shake, setShake] = useState(false);

   // set the isSubmitting state to true if the navigation state is submitting
   const isSubmitting = navigation.state === 'submitting';

   // get the isLoading, error and userInfo from the store
   const { isLoading, userInfo } = useSelector((state) => {
      return state.auth;
   });

   useEffect(() => {
      if (actionData?.jwt) {
         // get the jwt from the actionData
         const jwt = actionData.jwt;
         dispatch(removeAuth());

         // dispatch the setAuth action with the jwt from the actionData
         dispatch(setAuth({ jwt }));

         // dispatch the getUserInfo action with the jwt from the actionData
         dispatch(getUserInfo(jwt));
         setShake(false);
      }
      // set the shake state to true if the actionData has error
      if (actionData?.error) {
         setShake(true);
      }
   }, [actionData]);

   useEffect(() => {
      // if the userInfo is not empty, navigate to the select-role page
      if (userInfo?.length !== 0) {
         navigate('/select-role');
      }
   }, [userInfo, navigate]);

   if (isLoading || navigation.state === 'loading') {
      return <>Loading...</>;
   }

   return (
      <div className="m-4 flex flex-col">
         <div className="m-3">
            {actionData?.error && (
               <>
                  <Typography variant="h4" className="text-red-500">
                     {actionData.message}
                  </Typography>
               </>
            )}
         </div>
         <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div
               className={`shadow-2xl bg-gray-700 w-1/2 py-10 text-white h-max rounded-2xl ${
                  shake ? 'animate-shake' : ''
               }`}
               style={{
                  padding: '60px 40px',
                  display: 'flex',
                  justifyContent: 'center',
               }}
            >
               <Form
                  className="form flex flex-col items-start gap-3"
                  method="post"
               >
                  <div className="flex flex-col items-start gap-2">
                     <label>Email</label>
                     <input
                        type="text"
                        id="email"
                        className="shadow appearance-none border  rounded  py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        name="email"
                     />
                  </div>
                  <div className="flex flex-col items-start gap-2">
                     <label>Password</label>
                     <input
                        type="password"
                        id="password"
                        className="shadow appearance-none border  rounded  py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        name="password"
                     />
                  </div>
                  <div className="items-center align-middle text-center">
                     <Button
                        color="blue"
                        className="items-center"
                        type="submit"
                     >
                        {isSubmitting ? 'Logging in...' : 'Login'}
                     </Button>
                     <div className="mt-3">
                        <Link to={'/register'} className="nav-link ">
                           Don&apos;t have an account ?
                        </Link>
                     </div>
                  </div>
               </Form>
            </div>
         </div>
      </div>
   );
};

export async function action({ request }) {
   console.log('Action is called in login');
   const data = await request.formData();

   const credentials = {
      email: data.get('email') || 'ownermail1@gmail.com',
      password: data.get('password') || 'owner1234',
   };

   const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

   const isValidEmail = emailRegex.test(credentials.email);

   if (!isValidEmail) {
      return { message: 'invalid email', error: true, status: 400 };
   }

   if (credentials.password.length < 8) {
      return {
         message: 'Password length should be greater than 8',
         error: true,
         status: 400,
      };
   }

   console.log('Sending request to server');
   const res = await loginUser(credentials);

   if (!res) {
      throw json({ message: 'login fail', status: 500 });
   }

   if (res.status === 400) {
      return { message: 'invalid credentials', error: true, status: 400 };
   }

   const resData = await res.json();

   localStorage.setItem('jwt', resData.jwt);
   localStorage.setItem('refreshToken', resData.refreshToken);

   return resData;
}

export default Login;
