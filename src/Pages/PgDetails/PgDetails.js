/** @format */
import React, { useEffect, useState } from 'react';
import { deleltePg, getPgById } from '../../Api/ApiRequests';
import {
   json,
   useActionData,
   useRouteLoaderData,
   useSubmit,
} from 'react-router-dom';
import { Button } from '@material-tailwind/react';
import { useSelector } from 'react-redux';
import OwnerOptions from '../../Components/ButtonOptions/OwnerOptions';
import AdminOptions from '../../Components/ButtonOptions/AdminOptions';
import PgDetailCard from '../../Components/PgDetailCard/PgDetailCard';

const PgDetails = () => {
   const submit = useSubmit();
   const data = useActionData();
   const pgDetails = useRouteLoaderData('pg-detail');

   const [isOwner, setIsOwner] = useState(false);
   const [isAdmin, setIsAdmin] = useState(false);

   const { jwt, selectedUserMode } = useSelector((state) => {
      return state.auth;
   });

   useEffect(() => {
      if (jwt !== '' && selectedUserMode.role === 'ROLE_OWNER') {
         setIsOwner(true);
         setIsAdmin(false);
      }
      if (jwt !== '' && selectedUserMode.role === 'ROLE_ADMIN') {
         setIsAdmin(true);
         setIsOwner(false);
      }
   }, [selectedUserMode, jwt]);

   if (data?.status === 201) {
      return <>{data.message}</>;
   }

   const handleBookPg = () => {};

   const handleDeletePg = () => {
      const confirm = window.confirm('Are you sure ?');

      if (!confirm) return;

      // TODO there is a bug here
      // If the owner is not the owner of a particular pg he can view Delete Pg button
      // Add checks here and handle the errors accordingly
      submit(null, { method: 'DELETE' });
   };

   return (
      <div>
         <PgDetailCard />
         <div className="flex flex-col sm:flex-row justify-center items-center gap-4 px-4 sm:px-0 m-4">
            <Button onClick={handleBookPg}>Book Pg</Button>
            {isOwner && <OwnerOptions handleDeletePg={handleDeletePg} />}
            {isAdmin && <AdminOptions />}
         </div>
      </div>
   );
};

// TODO this loader can be shifted to PgDetailCard.js
export async function loader({ params }) {
   const id = params.id;
   const res = await getPgById(id);

   if (!res) {
      throw json({ message: 'could not fetch pg' }, { status: 500 });
   } else {
      const resData = await res.json();
      return resData.data;
   }
}

export async function action({ params }) {
   const id = params.id;
   const res = await deleltePg(id);

   if (!res)
      throw json({
         message: 'something wrong happend when deleting pg',
         status: 500,
      });

   if (!res.ok) throw json({ message: 'Could not delete pg', status: 403 });

   return { message: 'Pg deleted successfully', status: 201 };
}

export default PgDetails;
