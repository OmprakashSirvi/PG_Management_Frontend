/** @format */

import React, { useEffect } from 'react';

import PgForm from '../../Components/PgForm/PgForm';
import { Link, useActionData } from 'react-router-dom';
import { Typography } from '@material-tailwind/react';

const AddPg = () => {
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
         <PgForm method={'POST'} />
      </div>
   );
};

export default AddPg;
