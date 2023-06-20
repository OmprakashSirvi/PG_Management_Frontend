/** @format */

import React, { Suspense } from 'react';
import { getAllRoomsInPg } from '../../Api/ApiRequests';
import { Await, defer, json, useLoaderData } from 'react-router-dom';
import Skeleton from '../../Components/Skeleton/Skeleton';
import { Pause } from '../../utils/Pause';
import RoomList from '../../Components/RoomList/RoomList';
import { Typography } from '@material-tailwind/react';

const SelectRoom = () => {
   const { rooms } = useLoaderData();

   return (
      <>
         <Typography variant="h4" className="m-4">
            Select your Rooms
         </Typography>
         <Suspense fallback={<Skeleton times={3} className="h-10 w-full" />}>
            <Await resolve={rooms}>
               {(loadedRooms) => (
                  <>
                     {loadedRooms && loadedRooms.length === 0 && (
                        <>NO rooms here</>
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
