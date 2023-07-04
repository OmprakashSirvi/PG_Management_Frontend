/** @format */

import React from 'react';
import ExpandablePanel from '../ExpandablePanel/ExpandablePanel';
import { Button, Typography } from '@material-tailwind/react';
import RoomForm from '../RoomForm/RoomForm';
import { TrashIcon } from '@heroicons/react/24/outline';
import AppButton from '../../Components/AppButton/AppButton';
import { useDispatch } from 'react-redux';
import { deleteStateRoom } from '../../Redux/store';
import { Link } from 'react-router-dom';

const RoomList = ({ room, elevated }) => {
   const dispatch = useDispatch();

   const header = (
      <Typography className="">{`Rent : ${room.roomRent}, Type : ${room.roomType}`}</Typography>
   );

   function handleDelete() {
      dispatch(deleteStateRoom(room.id));
   }

   // if content is elevated then show form else show buttons
   const content = elevated ? (
      <RoomForm room={room} method={'PATCH'} />
   ) : (
      <div className="flex flex-row justify-center gap-4">
         <Link to={`../${room.id}/select-bed`}>
            <Button
               className="border-gray-900 bg-gray-800 text-white hover:bg-gray-900"
               variant="filled"
            >
               View Beds
            </Button>
         </Link>
         <Link to={`../${room.id}/select-bed?mode=all`}>
            <Button
               className="border-gray-900 bg-gray-800 text-white hover:bg-gray-900"
               variant="filled"
            >
               Book Room
            </Button>
         </Link>
      </div>
   );

   return (
      <div
         className={`flex flex-row gap-2 ${
            elevated ? 'w-full' : 'w-4/5'
         } mx-auto `}
      >
         {elevated && (
            <AppButton className="mt-2" onClick={handleDelete}>
               <TrashIcon strokeWidth={2.5} className="h-4 w-4 mr-2 my-auto" />
            </AppButton>
         )}
         <div className="w-full">
            <ExpandablePanel header={header}>{content}</ExpandablePanel>
         </div>
      </div>
   );
};

export default RoomList;
