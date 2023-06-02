/** @format */

import {
   Card,
   Input,
   Button,
   Typography,
   Select,
   Option,
} from '@material-tailwind/react';

import React from 'react';
import { Form } from 'react-router-dom';
import { createRoom } from '../../Api/ApiRequests';

export default function RoomForm({ room, method }) {
   const uniqueId = () => parseInt(Date.now() * Math.random()).toString();

   return (
      <Card color="transparent" shadow={false} className="m-4 items-center">
         <Typography color="gray" className="mt-1 font-normal">
            Enter roomDetails
         </Typography>
         <Form
            method={method}
            className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
         >
            <div className="mb-4 flex flex-col gap-6">
               <Select
                  variant="standard"
                  label="Room Type"
                  name="roomType"
                  className="hover:bg-blue-gray-50"
               >
                  <Option value="AC">AC</Option>
                  <Option value="NON_AC">Non - AC</Option>
               </Select>
               <Input
                  size="lg"
                  type="number"
                  label="Room Rent"
                  name="roomRent"
               />
               <Input
                  type="number"
                  size="lg"
                  label="Room Sharing"
                  name="roomSharing"
               />
            </div>
            <Button className="mt-6" fullWidth type="submit">
               Save
            </Button>
         </Form>
      </Card>
   );
}

export async function action({ request, params }) {
   const method = request.method;
   const data = await request.formData();
   console.log(data);

   const pgId = params.id;

   const room = {
      roomStatus: 'Available',
      roomRent: data.roomRent || 1200,
      roomSharing: data.roomSharing || 3,
      roomType: data.roomType || 'AC',
   };

   console.log(room);

   if (method === 'POST') {
      const res = await createRoom(room, pgId);

      console.log(res);
   } else if (method === 'PATCH') {
      return null;
   }

   return null;
}
