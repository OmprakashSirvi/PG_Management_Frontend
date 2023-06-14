/** @format */

import React, { useState } from 'react';
import { UserIcon } from '@heroicons/react/24/outline';
import { FaBed } from 'react-icons/fa';
import { Button } from '@material-tailwind/react';

const BedCard = ({ bed }) => {
   const [showButton, setShowButton] = useState(false);
   const user = undefined;

   const handleClick = () => {
      setShowButton(!showButton);
   };

   return (
      <div className="flex flex-col items-center justify-center h-60 w-60 bg-gray-100 rounded hover:shadow p-4">
         <div className="cursor-pointer" onClick={handleClick}>
            <FaBed className="h-10 w-10 hover:h-12 hover:w-12" />
            {/* assuming you're using heroicons for icons */}
         </div>
         {showButton && (
            <Button
               className="border-gray-900 bg-gray-800 text-white hover:bg-gray-900"
               variant="filled"
            >
               Raise Request
            </Button>
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
