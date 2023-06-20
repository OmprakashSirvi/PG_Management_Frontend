/** @format */

import React, { useEffect, useState } from 'react';
import { FaBed } from 'react-icons/fa';
import { Button, Typography } from '@material-tailwind/react';
import { useActionData } from 'react-router-dom';

const BedCard = ({ bed, handleRaiseRequest }) => {
   const [showButton, setShowButton] = useState(false);
   const [raised, setRaised] = useState(false);
   const user = undefined;
   const actionData = useActionData();

   const handleClick = () => {
      setShowButton(!showButton);
   };

   useEffect(() => {
      if (actionData?.status === 200 && bed.id === actionData?.data) {
         setRaised(true);
      } else {
         setRaised(false);
      }
   }, [actionData]);

   return (
      <div className="flex flex-col items-center justify-center h-60 w-60 bg-gray-100 rounded hover:shadow p-4">
         <div className="cursor-pointer" onClick={handleClick}>
            <FaBed className="h-10 w-10 hover:h-12 hover:w-12" />
         </div>
         {showButton && !raised && (
            <Button
               className="border-gray-900 bg-gray-800 text-white hover:bg-gray-900"
               id={bed.id}
               variant="filled"
               onClick={handleRaiseRequest}
            >
               Raise Request
            </Button>
         )}
         {showButton && raised && (
            <Typography className="text-green-500">Request Raised</Typography>
         )}
         {user && (
            <div className="mt-4 text-center">
               <p className="font-semibold">{user.email}</p>
               <p className="text-sm text-gray-600">{user.phoneNumber}</p>
            </div>
         )}
      </div>
   );
};

export default BedCard;
