/** @format */

import React, { Suspense } from 'react';
import { getAllRoomsInPg } from '../../Api/ApiRequests';
import { Await, Link, defer, json, useLoaderData } from 'react-router-dom';
import Skeleton from '../../Components/Skeleton/Skeleton';
import { Pause } from '../../utils/Pause';
import RoomList from '../../Components/RoomList/RoomList';
import { Button, Typography } from '@material-tailwind/react';

const SelectRoom = () => {
   const { rooms } = useLoaderData();

   return (
      <>
         <Button variant="gradient" color="green">
            Book Entire Pg
         </Button>
         <Typography variant="h4" className="m-4">
            Select your Rooms
         </Typography>
         <Suspense fallback={<Skeleton times={3} className="h-10 w-full" />}>
            <Await resolve={rooms}>
               {(loadedRooms) => (
                  <>
                     {loadedRooms && loadedRooms.length === 0 && (
                        <Typography variant="h3" className="m-4">
                           No rooms here
                        </Typography>
                     )}
                     {loadedRooms.map((room, index) => {
                        return (
                           <RoomList key={index} room={room} elevated={false} />
                        );
                     })}
                  </>
               )}
            </Await>
         </Suspense>
      </>
   );
};

async function roomLoader(id) {
   const res = await getAllRoomsInPg(id);

   if (res.status === 401) {
      throw json({ message: res.message, status: 401 });
   }

   if (!res) {
      throw json({ message: 'Not able to fetch rooms ', status: 500 });
   } else {
      const resData = await res.json();

      return resData;
   }
}

export async function loader({ params }) {
   const id = params.id;

   return defer({ rooms: roomLoader(id) });
}

export default SelectRoom;
