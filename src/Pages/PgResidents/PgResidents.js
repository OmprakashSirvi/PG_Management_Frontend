/** @format */

import React from 'react';
import { getGuestsInPg } from '../../utils/ApiRequests';
import { json, useLoaderData } from 'react-router-dom';
import { Typography } from '@material-tailwind/react';
import UserList from '../../Components/UserList/UserList';

const PgResidents = () => {
   const guestDetails = useLoaderData();

   if (guestDetails.data.length === 0) {
      return (
         <Typography variant="h3">No guests currently in this Pg</Typography>
      );
   }

   return (
      <>
         {guestDetails.data.map((user, index) => {
            return <UserList key={index} user={user} />;
         })}
      </>
   );
};

export async function loader({ params }) {
   const id = params.id;
   const res = await getGuestsInPg(id);

   if (!res) {
      throw json({ message: 'could not fetch your guests', status: 500 });
   }

   const resData = await res.json();

   return resData;
}

export default PgResidents;
