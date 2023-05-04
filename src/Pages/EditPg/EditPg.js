/** @format */

import React from 'react';
import { Link } from 'react-router-dom';
import { useRouteLoaderData } from 'react-router-dom';

const EditPg = () => {
   const pgDetails = useRouteLoaderData('pg-detail');

   return (
      <div>
         <Link to={`add-room`}>
            <button>Add Room</button>
         </Link>
         <form>
            Name : <input type="text" defaultValue={pgDetails.name} />
            Gender : <input type="text" defaultValue={pgDetails.gender} />
            Address : <input type="text" defaultValue={pgDetails.address} />
            City : <input type="text" defaultValue={pgDetails.city} />
            Description :{' '}
            <input type="text" defaultValue={pgDetails.description} />
            Pg TYpe : <input type="text" defaultValue={pgDetails.pgType} />
            Amenities : <input type="text" defaultValue={pgDetails.amenities} />
            Food Type : <input type="text" defaultValue={pgDetails.foodType} />
            <button type="submit">Save changes</button>
            <button>Cancel</button>
         </form>
      </div>
   );
};

export default EditPg;
