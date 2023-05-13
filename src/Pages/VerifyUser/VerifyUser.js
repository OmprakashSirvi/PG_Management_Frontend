/** @format */

import { Button, Typography } from '@material-tailwind/react';
import React, { useEffect, useState } from 'react';
import { Form, Link, useActionData } from 'react-router-dom';
import { verifyUser } from '../../utils/ApiRequests';
import { getUserInfo, setAuth } from '../../Redux/store';
import { useDispatch } from 'react-redux';

const VerifyUser = () => {
   const dispatch = useDispatch();
   const actionData = useActionData();
   const [ok, setOk] = useState(false);

   useEffect(() => {
      if (actionData) {
         if (actionData.status === 200) {
            const jwt = actionData.jwt;
            dispatch(setAuth({ jwt }));
            dispatch(getUserInfo(jwt));
            setOk(true);
         }
      }
   }, [actionData]);

   if (ok) {
      return (
         <Typography>
            User verified successfully{' '}
            <Link to="/select-role" className="text-blue-500">
               Click here to select your role
            </Link>
         </Typography>
      );
   }

   return (
      <div>
         <Typography variant="h3">User Verification Page :</Typography>
         <Form method="POST">
            <label>Enter your verification link here</label>
            <input type="text" name="token" />
            <Button color="green" type="submit">
               Verify
            </Button>
         </Form>
      </div>
   );
};

export async function action({ request }) {
   const data = await request.formData();
   const res = await verifyUser(data.get('token'));

   if (!res) {
      return { message: 'Something went wrong!', status: 500, errror: true };
   }

   if (!res.ok) {
      return { message: 'Invalid Token', status: 403, error: true };
   }

   if (res.status === 200) {
      const resData = await res.json();
      return {
         message: 'User verified Successfully',
         status: 200,
         jwt: resData.data,
         error: false,
      };
   }
}

export default VerifyUser;
