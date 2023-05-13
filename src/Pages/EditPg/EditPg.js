/** @format */

import React from 'react';
import { Link } from 'react-router-dom';
import { useRouteLoaderData } from 'react-router-dom';
import PgForm from '../../Components/PgForm/PgForm';
import { Button } from '@material-tailwind/react';

const EditPg = () => {
   const pgDetails = useRouteLoaderData('pg-detail');

   return (
      <div>
         <Button className="mb-6 mt-4 hover:bg-green-900" color="green">
            <Link to={`../rooms`}>
               <button>Configure Rooms</button>
            </Link>
         </Button>
         <PgForm method={'PATCH'} event={pgDetails} />
      </div>
   );
};

export default EditPg;
