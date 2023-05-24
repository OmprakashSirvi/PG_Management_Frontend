/** @format */

import React from 'react';
import { Button, Typography } from '@material-tailwind/react';
import ExpandablePanel from '../ExpandablePanel/ExpandablePanel';
import { useDispatch } from 'react-redux';
import { setRole } from '../../Redux/store';

import { CheckCircleIcon } from '@heroicons/react/24/outline';

const Usercard = ({ user, selectedUserRole }) => {
   const dispatch = useDispatch();
   const showOwnerProperties = user.role === 'ROLE_OWNER' ? true : false;

   function handleActivateRole() {
      dispatch(setRole(user.role));
   }

   const header = (
      <>
         {user.role === 'ROLE_OWNER'
            ? 'Owner'
            : user.role === 'ROLE_ADIMN'
            ? 'Admin'
            : 'Guest'}
         {user.role === selectedUserRole && (
            <CheckCircleIcon
               strokeWidth="0.9"
               className="w-6 h-6 items-center"
            />
         )}
      </>
   );

   const content = (
      <>
         {showOwnerProperties && (
            <>
               <Typography variant="h3">List of Pgs</Typography>
               <ul>
                  {user.pgNames.map((ele, index) => (
                     <li key={index}>{`${index} : ${ele}`}</li>
                  ))}
               </ul>
            </>
         )}
         <Button color="blue" className="m-4" onClick={handleActivateRole}>
            Activate
         </Button>
      </>
   );

   return <ExpandablePanel header={header}>{content}</ExpandablePanel>;
};

export default Usercard;
