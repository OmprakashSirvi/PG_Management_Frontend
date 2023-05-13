/** @format */

import {
   Card,
   Input,
   Button,
   Typography,
   Select,
   Option,
} from '@material-tailwind/react';

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Form } from 'react-router-dom';
import { addRoom, updateRoom } from '../../Redux/store';

export default function RoomForm({ room, method }) {
   const dispatch = useDispatch();
   const uniqueId = () => parseInt(Date.now() * Math.random()).toString();

   const [formData, setFormData] = useState({
      id: room ? room.id : uniqueId(),
      roomType: room ? room.roomType : 'AC',
      roomRent: room ? room.roomRent : '',
      roomSharing: room ? room.roomSharing : '',
      roomStatus: room ? room.roomStatus : 'Available',
   });

   function handleSubmit(event) {
      event.preventDefault();
      if (method === 'update') {
         dispatch(updateRoom(formData));
      } else {
         dispatch(addRoom(formData));
      }
   }

   return (
      <Card color="transparent" shadow={false} className="m-4 items-center">
         <Typography color="gray" className="mt-1 font-normal">
            Enter roomDetails
         </Typography>
         <Form
            className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
            onSubmit={handleSubmit}
         >
            <div className="mb-4 flex flex-col gap-6">
               <Select
                  variant="standard"
                  label="Room Type"
                  name="roomType"
                  className="hover:bg-blue-gray-50"
                  value={formData.roomType || 'AC'}
                  onChange={(event) => {
                     setFormData({
                        ...formData,
                        roomType: event,
                     });
                  }}
               >
                  <Option value="AC">AC</Option>
                  <Option value="NON_AC">Non - AC</Option>
               </Select>
               <Input
                  size="lg"
                  type="number"
                  label="Room Rent"
                  name="roomRent"
                  value={formData.roomRent}
                  onChange={(event) => {
                     setFormData({
                        ...formData,
                        roomRent: event.target.value * 1,
                     });
                  }}
               />
               <Input
                  type="number"
                  size="lg"
                  label="Room Sharing"
                  name="roomSharing"
                  value={formData.roomSharing}
                  onChange={(event) => {
                     setFormData({
                        ...formData,
                        roomSharing: event.target.value * 1,
                     });
                  }}
               />
            </div>
            <Button className="mt-6" fullWidth type="submit">
               Save
            </Button>
         </Form>
      </Card>
   );
}
