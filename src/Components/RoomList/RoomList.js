/** @format */

import React from 'react';
import ExpandablePanel from '../ExpandablePanel/ExpandablePanel';
import { Typography } from '@material-tailwind/react';
import RoomForm from '../RoomForm/RoomForm';
import { TrashIcon } from '@heroicons/react/24/outline';
import AppButton from '../../Components/AppButton/AppButton';
import { useDispatch } from 'react-redux';
import { deleteStateRoom } from '../../Redux/store';

const RoomList = ({ room }) => {
   const dispatch = useDispatch();

   const header = (
      <Typography className="">{`Rent : ${room.roomRent}, Type : ${room.roomType}`}</Typography>
   );

   function handleDelete() {
      console.log('delete of : ', room);
      dispatch(deleteStateRoom(room.id));
   }

   const content = <RoomForm room={room} method={'update'} />;

   return (
      <div className="flex flex-row gap-2 w-full ">
         <AppButton className="mt-2" onClick={handleDelete}>
            <TrashIcon strokeWidth={2.5} className="h-4 w-4 mr-2 my-auto" />
         </AppButton>
         <div className="w-full">
            <ExpandablePanel header={header}>{content}</ExpandablePanel>
         </div>
      </div>
   );
};

export default RoomList;
