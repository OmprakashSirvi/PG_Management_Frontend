/** @format */

import React from 'react';
import { Link } from 'react-router-dom';
import { useRouteLoaderData } from 'react-router-dom';
import PgForm from '../../Components/PgForm/PgForm';

const EditPg = () => {
   const pgDetails = useRouteLoaderData('pg-detail');

   return (
      <div>
         <Link to={`add-room`}>
            <button>Add Room</button>
         </Link>
         <PgForm method={'PATCH'} event={pgDetails} />
      </div>
   );
};

export default EditPg;
