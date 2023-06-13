/** @format */

import React from 'react';
import { Link, useActionData } from 'react-router-dom';
import { useRouteLoaderData } from 'react-router-dom';
import PgForm from '../../Components/PgForm/PgForm';
import { Button, Typography } from '@material-tailwind/react';

const EditPg = () => {
   const pgDetails = useRouteLoaderData('pg-detail');

   const actionData = useActionData();

   if (actionData?.error === false && actionData?.status === 200) {
      return (
         <>
            <Typography variant="h4">{actionData.message}</Typography>
            You can view your pgs once it is approved
            <Typography className="text-blue-300 underline-offset-auto">
               <Link to="/pg">View All pg</Link>
            </Typography>
         </>
      );
   }

   return (
      <div>
         <div className="flex flex-col sm:flex-row justify-center items-center gap-4 px-4 sm:px-0 m-4">
            <Button
               className="hover:bg-green-800"
               variant="filled"
               color="green"
            >
               <Link to={`../rooms`}>Configure Rooms</Link>
            </Button>
            <Button
               className="hover:bg-blue-800 "
               color="light-blue"
               variant="filled"
            >
               <Link to={'../images'}>Add Images</Link>
            </Button>
         </div>
         <PgForm method={'PATCH'} event={pgDetails} />
      </div>
   );
};

export default EditPg;
