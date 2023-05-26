/** @format */

import React, { useEffect } from 'react';
import { Button, Checkbox, Typography } from '@material-tailwind/react';
import {
   Link,
   Form,
   useActionData,
   json,
   useNavigate,
   useNavigation,
} from 'react-router-dom';
import { registerUser } from '../../utils/ApiRequests';
import { useDispatch, useSelector } from 'react-redux';
import { getUserInfo, setAuth } from '../../Redux/store';

const UserForm = ({ method, event }) => {
   const data = useActionData();
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const navigation = useNavigation();

   const isSubmitting = navigation.state === 'submitting';

   const { isLoading, error, userInfo } = useSelector((state) => {
      return state.auth;
   });

   useEffect(() => {
      if (data) {
         if (data.status === 'Success') {
            const jwt = data.jwt;
            dispatch(setAuth({ jwt }));
            dispatch(getUserInfo(jwt));
         }
      }
   }, [data]);

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
      <div
         className="flex items-center justify-center"
         style={{
            padding: '0px',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
         }}
      >
         <div
            className=" bg-gray-800 w-1/2 md:px-5 md:py-5 py-10 text-white h-max "
            style={{ padding: '10px 50px' }}
         >
            <Typography variant="h3">User Form</Typography>
            <p className="text-red-600 text-lg font-bold m-4">
               {data && data.message}
            </p>
            <Form className="form flex flex-col gap-2" method={method}>
               <div className="flex gap-4">
                  <div className="flex flex-col items-start gap-2">
                     <label htmlFor="fname">First Name</label>
                     <input
                        type="text"
                        id="fname"
                        className="shadow appearance-none border  rounded  py-2 px-3 text-gray-700  leading-tight focus:outline-none focus:shadow-outline w-full"
                        name="fname"
                        defaultValue={event ? event.firstName : ''}
                     />
                  </div>
                  <div className="flex flex-col items-start gap-2">
                     <label htmlFor="Username">Last Name</label>
                     <input
                        type="text"
                        id="lname"
                        className="shadow appearance-none border  rounded  py-2 px-3 text-gray-700  leading-tight focus:outline-none focus:shadow-outline w-full"
                        name="lname"
                        defaultValue={event ? event.lastName : ''}
                     />
                  </div>
               </div>

               <div className="flex flex-col items-start gap-2">
                  <label htmlFor="email">Email</label>
                  <input
                     type="email"
                     id="email"
                     className="shadow appearance-none border  rounded  py-2 px-3 text-gray-700  leading-tight focus:outline-none focus:shadow-outline w-full"
                     name="email"
                     defaultValue={event ? event.email : ''}
                  />
               </div>
               <div className={event ? 'hidden' : ''}>
                  <div className="flex flex-col items-start gap-2">
                     <label htmlFor="Password">Password</label>
                     <input
                        type="password"
                        id="Password"
                        className="shadow appearance-none border rounded  py-2 px-3 text-gray-700  leading-tight focus:outline-none focus:shadow-outline  w-full"
                        name="password"
                     />
                  </div>
                  <div className="flex flex-col items-start gap-2">
                     <label htmlFor="Password">Confirm Password</label>
                     <input
                        type="password"
                        id="confirmPassword"
                        className="shadow appearance-none border rounded  py-2 px-3 text-gray-700  leading-tight focus:outline-none focus:shadow-outline  w-full"
                        name="confirmPassword"
                     />
                  </div>
               </div>
               <div className="flex flex-col items-start gap-2">
                  <label htmlFor="mono">Mobile Number</label>

                  <input
                     type="number"
                     id="nobileNumber"
                     name="mobileNumber"
                     defaultValue={event ? event.mobileNumber : ''}
                     className="shadow appearance-none border rounded  py-2 px-3 text-gray-700  leading-tight focus:outline-none focus:shadow-outline  w-full"
                  />
               </div>
               <div className="flex flex-col items-start gap-2">
                  <label htmlFor="gender">Gender</label>
                  <select
                     name="gender"
                     id="gender"
                     defaultValue={event ? event.gender : ''}
                     className="shadow appearance-none border rounded  py-2 px-3 text-gray-700  leading-tight focus:outline-none focus:shadow-outline  w-full"
                  >
                     <option value="MALE">Male</option>
                     <option value="FEMALE">Female</option>
                  </select>
               </div>
               <div className="flex flex-col items-start gap-2">
                  <label htmlFor="role">Role</label>
                  <div className="flex flex-row items-center">
                     <Checkbox
                        id="ROLE_OWNER"
                        name="ROLE_OWNER"
                        label={
                           <Typography className="text-white">Owner</Typography>
                        }
                     />

                     <Checkbox
                        id="ROLE_GUEST"
                        name="ROLE_GUEST"
                        color="red"
                        label={
                           <Typography className="text-white">Guest</Typography>
                        }
                     />
                  </div>
               </div>

               <Button
                  type="submit"
                  color="blue"
                  className=" hover:bg-violet-700 text-white font-bold py-2 px-4 rounded-full mt-5"
                  disabled={isSubmitting}
               >
                  {isSubmitting ? 'Registering...' : 'Register'}
               </Button>

               <div className="mt-3">
                  <Link to={'/login'} className="nav-link ">
                     {' '}
                     Already Have an Account?{' '}
                  </Link>
               </div>
            </Form>
         </div>
      </div>
   );
};

export async function action({ request }) {
   const method = request.method;
   const data = await request.formData();
   let roles = [];

   if (data.get('ROLE_OWNER') === 'on') {
      roles.push('ROLE_OWNER');
   }
   if (data.get('ROLE_GUEST') === 'on') {
      roles.push('ROLE_GUEST');
   }

   const userData = {
      firstName: data.get('fname'),
      lastName: data.get('lname'),
      email: data.get('email'),
      password: data.get('password'),
      mobileNumber: data.get('mobileNumber'),
      gender: data.get('gender'),
      roles,
   };

   if (userData.password.length < 7) {
      return { message: 'Password length should be atleast 7', error: true };
   }

   if (userData.password !== data.get('confirmPassword')) {
      return { message: 'Passwords do not match', error: true };
   }

   if (userData.mobileNumber.length < 10) {
      return { message: 'Not a valid mobile Number', error: true };
   }

   if (roles.length == 0) {
      return { message: 'Roles should not be empty', error: true };
   }

   let res;

   if (method === 'POST') {
      res = await registerUser(userData);
   }
   if (method === 'PATCH') {
      console.log('huehue');
   }

   const resData = await res.json();

   console.log(resData);

   if (!res) {
      throw json({ title: 'Server side error' });
   }

   if (!res.ok) {
      return {
         message: `Could not register user : ${resData.message}`,
         status: 402,
         error: true,
      };
   }

   if (res.status === 201) {
      alert('User Registered Successfully');
   }

   return resData;
}

export default UserForm;
