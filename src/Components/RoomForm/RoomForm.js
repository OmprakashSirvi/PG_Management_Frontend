/** @format */

import {
   Card,
   Input,
   Button,
   Typography,
   Select,
   Option,
} from '@material-tailwind/react';

import React, { useEffect, useState } from 'react';
import { Form, json, useActionData, useNavigation } from 'react-router-dom';
import { createRoom } from '../../Api/ApiRequests';

export default function RoomForm({ room, method }) {
   const acitonData = useActionData();
   const navigation = useNavigation();

   const [showMessage, setShowMessage] = useState(false);

   const isSubmitting = navigation.state === 'submitting';

   useEffect(() => {
      if (acitonData) {
         if (!acitonData.ok) {
            setShowMessage(true);
         }
      } else {
         setShowMessage(false);
      }
   }, [acitonData]);

   return (
      <>
         {/* Error message sectin if something goes wrong */}
         {showMessage && (
            <Typography variant="h4" className="text-red-400">
               {acitonData?.message}
            </Typography>
         )}

         {/* Form section */}
         <Card color="transparent" shadow={false} className="m-4 items-center">
            {/* Form heading */}
            <Typography color="gray" className="mt-1 font-normal">
               Enter roomDetails
            </Typography>

            <Form
               method={method}
               className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
            >
               <div className="mb-4 flex flex-col gap-6">
                  <div className="w-auto">
                     <Select label="Select Room Type" name="roomType">
                        <Option value="AC">Ac</Option>
                        <Option value="NON-AC">Non-Ac</Option>
                     </Select>
                  </div>
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
               <Button
                  className="mt-6"
                  fullWidth
                  type="submit"
                  disabled={isSubmitting}
               >
                  {isSubmitting ? 'Adding....' : 'Add Room'}
               </Button>
            </Form>
         </Card>
      </>
   );
}

export async function action({ request, params }) {
   // const uniqueId = () => parseInt(Date.now() * Math.random()).toString();

   const method = request.method;

   const data = await request.formData();
   console.log(data);

   const pgId = params.id;

   const room = {
      roomStatus: 'Available',
      roomRent: data.get('roomRent') * 1,
      roomSharing: data.get('roomSharing') * 1,
      roomType: data.get('roomType') || 'AC',
   };

   console.log(room);

   if (room.roomSharing === 0) {
      return {
         message: 'Enter a valid room Sharing value',
         status: 400,
         ok: false,
      };
   }

   if (room.roomSharing > 9) {
      return {
         message: 'Not allowed rooms with more that 9 sharing',
         status: 400,
         ok: false,
      };
   }
   if (room.roomRent === 0) {
      return {
         message:
            "Room rent can't be 0 or empty, do you want to give room for free?",
         status: 400,
         ok: false,
      };
   }

   if (
      room.roomType === null ||
      room.roomType === undefined ||
      room.roomType === ''
   ) {
      return { message: 'Select room type', status: 400, ok: false };
   }

   console.log(room);

   let res;

   if (method === 'POST') {
      // await Pause(10000);
      res = await createRoom(room, pgId);

      console.log(res);
   } else if (method === 'PATCH') {
      return null;
   }

   if (!res.ok) {
      throw json({ message: 'something went wrong', status: 500 });
   }

   return null;
}
