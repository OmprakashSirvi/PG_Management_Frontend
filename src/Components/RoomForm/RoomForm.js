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
import {
   Form,
   json,
   useActionData,
   useNavigation,
   useSubmit,
} from 'react-router-dom';
import { createRoom, editRoom } from '../../Api/ApiRequests';
import { roomSlice } from '../../Redux/Slice/roomSlice';

export default function RoomForm({ room, method }) {
   const acitonData = useActionData();
   const navigation = useNavigation();
   const submit = useSubmit();

   const [roomType, setRoomType] = useState(room?.roomType);
   const [roomRent, setRoomRent] = useState(room?.roomRent);
   const [roomSharing, setRoomSharing] = useState(room?.roomSharing);
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

   function handleSave() {
      console.log('submitting form');
      const formData = new FormData();
      if (room?.id) {
         formData.append('id', room.id);
      }
      formData.append('roomType', roomType);
      formData.append('roomRent', roomRent);
      formData.append('roomSharing', roomSharing);

      console.log(roomType);

      submit(formData, { method });
   }

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
                     <Select
                        itemType="text"
                        label="Select Room Type"
                        name="roomType"
                        value={roomType}
                        onChange={(e) => {
                           setRoomType(e);
                        }}
                     >
                        <Option value="AC">Ac</Option>
                        <Option value="NON_AC">Non-Ac</Option>
                     </Select>
                  </div>
                  <Input
                     size="lg"
                     type="number"
                     label="Room Rent"
                     name="roomRent"
                     defaultValue={room?.roomRent}
                     onChange={(e) => {
                        setRoomRent(e.target.value);
                     }}
                  />
                  <Input
                     type="number"
                     size="lg"
                     label="Room Sharing"
                     name="roomSharing"
                     defaultValue={room?.roomSharing}
                     onChange={(e) => {
                        setRoomSharing(e.target.value);
                     }}
                  />
               </div>
               <Button
                  className="mt-6"
                  fullWidth
                  type="submit"
                  disabled={isSubmitting}
                  onClick={handleSave}
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

   const pgId = params.id;
   const roomId = data.get('id');

   const room = {
      roomStatus: 'Available',
      roomRent: data.get('roomRent') * 1,
      roomSharing: data.get('roomSharing') * 1,
      roomType: data.get('roomType'),
   };

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

   let res;

   if (method === 'POST') {
      // await Pause(10000);
      res = await createRoom(room, pgId);
   } else if (method === 'PATCH') {
      if (roomId === null || roomId === undefined) {
         return { message: 'Room id is required', status: 400, ok: false };
      }
      res = await editRoom(room, roomId);
   }

   if (!res.ok) {
      throw json({ message: 'something went wrong', status: 500 });
   }

   return null;
}
