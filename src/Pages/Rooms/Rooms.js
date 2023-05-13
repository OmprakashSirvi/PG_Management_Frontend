/** @format */

import React, { useEffect, useState } from 'react';
import { json, useLoaderData } from 'react-router';
import { getAllRoomsInPg } from '../../utils/ApiRequests';
import RoomList from '../../Components/RoomList/RoomList';
import { Button, Typography } from '@material-tailwind/react';
import RoomForm from '../../Components/RoomForm/RoomForm';
import { useDispatch, useSelector } from 'react-redux';
import { setInitialState } from '../../Redux/store';
import { useSubmit } from 'react-router-dom';

const Rooms = () => {
   const dispatch = useDispatch();

   // For whether to show new room form or not.
   const [showForm, setShowForm] = useState(false);

   // gets loaded rooms from loader from backend
   let loadedRooms = useLoaderData();
   const submit = useSubmit();

   useEffect(() => {
      dispatch(setInitialState(loadedRooms));
   }, [loadedRooms]);

   // initially
   const { rooms } = useSelector((state) => {
      return state.room;
   });

   useEffect(() => {
      setShowForm(false);
   }, [rooms]);

   function handleRoomAdd() {
      setShowForm(true);
   }

   function handleSave(event) {
      event.preventDefault();
      submit(rooms, { method: 'POST' });
   }

   return (
      <>
         {rooms.length === 0 && (
            <Typography variant="h4" className="m-4">
               No rooms currently here..
            </Typography>
         )}
         {rooms.map((room, index) => {
            return <RoomList key={index} room={room} />;
         })}
         <div className="flex flex-col items-center">
            <Button variant="outlined" onClick={handleRoomAdd} className="mb-4">
               Add Room
            </Button>

            {showForm && <RoomForm />}

            <div className="flex">
               <Button
                  variant="gradient"
                  className="mr-2"
                  type="submit"
                  onClick={handleSave}
               >
                  Save
               </Button>
               <Button variant="text">Cancel</Button>
            </div>
         </div>
      </>
   );
};

export async function loader({ params }) {
   const id = params.id;

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

export default Rooms;
