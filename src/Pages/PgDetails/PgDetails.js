/** @format */
import React, { useEffect, useState } from 'react';
import { deleltePg, getPgById } from '../../Api/ApiRequests';
import {
   Link,
   json,
   useActionData,
   useRouteLoaderData,
   useSubmit,
} from 'react-router-dom';
import { Button, Typography } from '@material-tailwind/react';
import { useDispatch, useSelector } from 'react-redux';
import OwnerOptions from '../../Components/ButtonOptions/OwnerOptions';
import AdminOptions from '../../Components/ButtonOptions/AdminOptions';
import PgDetailCard from '../../Components/Card/PgDetailCard/PgDetailCard';
import { getUserInfo } from '../../Redux/store';

const PgDetails = () => {
   const submit = useSubmit();
   const data = useActionData();
   const dispatch = useDispatch();
   const pgDetails = useRouteLoaderData('pg-detail');

   const [showBook, setShowBook] = useState(true);
   const [isOwner, setIsOwner] = useState(false);
   const [isAdmin, setIsAdmin] = useState(false);

   const { jwt, selectedUserMode, userInfo } = useSelector((state) => {
      return state.auth;
   });

   useEffect(() => {
      // I needed to dispath the getUserInfo if the userInfo is empty and there is Jwt token present in state
      if (jwt && userInfo.length === 0) {
         dispatch(getUserInfo());
      }

      // If the user is admin then he can't book any pg
      if (jwt !== '' && selectedUserMode.role === 'ROLE_ADMIN') {
         setIsAdmin(true);
         setIsOwner(false);
         setShowBook(false);
      }

      // If the user is owner then he can't book his own pg
      if (
         userInfo &&
         userInfo.length !== 0 &&
         userInfo[0].email === pgDetails.owner.email
      ) {
         setIsOwner(true);
         setIsAdmin(false);
         setShowBook(false);
      }

      // If the user is guest then he can book any pg
      if (selectedUserMode.role === 'ROLE_GUEST') {
         setIsOwner(false);
         setIsAdmin(false);
         setShowBook(true);
      }

      // if (userInfo)
   }, [selectedUserMode, jwt, userInfo]);

   if (data?.status === 201) {
      return (
         <Typography variant="h4">
            {data.message}, You can view all your Pgs{' '}
            <Link to={'/pg?mode=owner'} className="text-blue-500">
               here
            </Link>
         </Typography>
      );
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
         <PgDetailCard pgDetails={pgDetails} />
         <div className="flex flex-col sm:flex-row justify-center items-center gap-4 px-4 sm:px-0 m-4">
            {showBook && (
               <Button>
                  <Link to={'select-room'}>Book Pg</Link>
               </Button>
            )}
            {/* Need to check if the Current owner is the actual owner of the pg */}
            {/* I have my state, and I have my PgDetails */}
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
