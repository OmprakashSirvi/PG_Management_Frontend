/** @format */

import React, { Suspense } from 'react';
import { getAllBookingRequests } from '../../Api/ApiRequests';
import { Await, defer, json, useLoaderData } from 'react-router-dom';
import { Typography } from '@material-tailwind/react';
import Skeleton from '../../Components/Skeleton/Skeleton';
import BookingRequest from '../../Components/BookingRequest/BookingRequest';

const BookingRequests = () => {
   const { requests } = useLoaderData();

   return (
      <>
         <Typography variant="h3">Booking Requests </Typography>
         <Suspense fallback={<Skeleton times={3} className="h-10 w-full" />}>
            <Await resolve={requests}>
               {(loadedRequests) => (
                  <>
                     {loadedRequests && loadedRequests.length === 0 && (
                        <Typography variant="h3" className="m-4">
                           No requests here
                        </Typography>
                     )}
                     {loadedRequests.map((request, index) => {
                        return (
                           <div key={index}>
                              <BookingRequest request={request} />
                           </div>
                        );
                     })}
                  </>
               )}
            </Await>
         </Suspense>
      </>
   );
};

async function loadRequests() {
   const res = await getAllBookingRequests();

   if (!res) throw json({ message: 'could not fetch requests', status: 400 });

   const resData = await res.json();
   return resData.data;
}

export function loader() {
   return defer({ requests: loadRequests() });
}

export default BookingRequests;
