/** @format */

import React, { useEffect, useState } from 'react';
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
   const [details, setDetails] = useState({
     
      email:"",
      password:"",
    
  });


  const handleChange = (e) => {
   const name = e.target.name;
   const value = e.target.value;
   setDetails(details => ({...details, [name]: value}))
   }

   const handleSubmit=()=>{
      console.log(details)
  }
 
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
      navigate('/select-role');
      return (
         <>
            <p>You are already logged in</p>
            <Link to="/">Home</Link>
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
         <div style={{ display: "flex", justifyContent: "center" }}>
            <div
               className="shadow-2xl bg-gray-700 w-1/4 py-10 text-white h-max "
               style={{ padding: "60px 40px", display: "flex", justifyContent: "center" }}
            >
               <Form className="form flex flex-col items-start gap-3" method='post' onSubmit={handleSubmit} >
                  <div className='flex flex-col items-start gap-2' >
                     <label>Email</label>
                     <input
                        type="text"
                        id="email"
                        className="shadow appearance-none border  rounded  py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        name='email'
                            onChange={handleChange}
                            value={details.email}
                     />
                  </div>
                  <div className='flex flex-col items-start gap-2'>
                     <label>Password</label>
                     <input
                        type="password"
                        id="password"
                        className="shadow appearance-none border  rounded  py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        name='password'
                        onChange={handleChange}
                        value={details.password}
                     />
                  </div>
                  <button className="bg-#8b5cf6 hover:bg-violet-700 text-white font-bold py-2 px-4 rounded-full" style={{ backgroundColor: "#8b5cf6", width: "100%" }}>
                     {isSubmitting ? 'Logging in...' : 'Login'}
                  </button>
                  <div className="mt-3">
                     <Link to={'/register'} className='nav-link '>
                  
                        Don&apos;t have an account ?
                     </Link>
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
