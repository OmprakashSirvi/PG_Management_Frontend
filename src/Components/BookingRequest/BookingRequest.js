/** @format */

import React, { useEffect } from 'react';
import { Link, json } from 'react-router-dom';
import ExpandablePanel from '../ExpandablePanel/ExpandablePanel';
import { Button } from '@material-tailwind/react';
import AppButton from '../AppButton/AppButton';

const BookingRequest = ({ request }) => {
   const [requestType, setRequestType] = React.useState('');
   let dateString = new Date(request?.createdAt).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
   });

   const requestFor =
      requestType === 'PG'
         ? request?.pg?.name
         : requestType === 'ROOM'
         ? 'For room in ' + request?.room?.pg?.name
         : requestType === 'BED'
         ? 'For bed in ' + request?.bed?.room?.pg?.name
         : '';

   useEffect(() => {
      if (request?.id === null || request?.id === undefined) {
         throw json({ message: 'no request', status: 400 });
      }

      if (request?.pg != null || request?.pg != undefined) {
         setRequestType('PG');
      } else if (request?.room != null || request?.room != undefined) {
         setRequestType('ROOM');
      } else if (request?.bed != null || request?.bed != undefined) {
         setRequestType('BED');
      }
   }, []);

   const content = (
      <>
         <Link>
            <AppButton primary={1}>Get Details</AppButton>
         </Link>
      </>
   );

   const header = `Request Type : ${requestType}, Request for : ${requestFor} , Requested At : ${dateString}`;

   return (
      <>
         <ExpandablePanel header={header}>{content}</ExpandablePanel>
      </>
   );
};

export default BookingRequest;
