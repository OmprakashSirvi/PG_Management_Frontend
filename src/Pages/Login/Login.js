/** @format */

import React, { useEffect } from 'react';
import {
   Form,
   Link,
   json,
   useActionData,
   useNavigate,
   useNavigation,
} from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { setAuth, getUserInfo } from '../../Redux/store';

import { loginUser } from '../../utils/ApiRequests';
import { Button } from '@material-tailwind/react';

const Login = () => {
   const dispatch = useDispatch();
   const actionData = useActionData();
   const navigation = useNavigation();
   const navigate = useNavigate();

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
      navigate('/select-role');
   }

   return (
      <div className="m-4">
         {actionData && actionData.error && (
            <>
               <p>{actionData.message}</p>
            </>
         )}
         <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div
               className="shadow-2xl bg-gray-700 w-1/2 py-10 text-white h-max rounded-2xl"
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
