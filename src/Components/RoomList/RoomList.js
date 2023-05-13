/** @format */

import React from 'react';
import ExpandablePanel from '../ExpandablePanel/ExpandablePanel';
import { Typography } from '@material-tailwind/react';
import RoomForm from '../RoomForm/RoomForm';

const RoomList = ({ room }) => {
   const header = (
      <Typography>{`Rent : ${room.roomRent}, Type : ${room.roomType}`}</Typography>
   );

   const content = <RoomForm room={room} method={'update'} />;

   return <ExpandablePanel header={header}>{content}</ExpandablePanel>;
};

export default RoomList;
