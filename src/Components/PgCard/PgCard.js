/** @format */

import React, { useEffect, useState } from 'react';

import {
   Card,
   CardHeader,
   CardBody,
   CardFooter,
   Typography,
} from '@material-tailwind/react';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';

import { Link } from 'react-router-dom';

import './PgCard.css';

const PgCard = ({ pg }) => {
   const apiUrl = process.env.REACT_APP_API_URL;
   const [elevated, setElevated] = useState(false);
   let createdAt;

   useEffect(() => {
      if (pg.approved !== undefined) {
         setElevated(true);
         createdAt = new Date(pg.createdAt);
      }
   }, []);

   if (elevated) {
      console.log(pg);
      return (
         <Card className="w-96">
            <CardHeader color="blue" className="relative h-56">
               <img
                  src={`${apiUrl}/api/v1/images/pg/${pg.image}`}
                  alt="pg-image"
                  className="h-full w-full"
               />
            </CardHeader>
            <CardBody className="text-center">
               <Typography variant="h5" className="mb-2">
                  {pg.name}
               </Typography>
               <Typography>{pg.foodType || 'all foods'}</Typography>
               <Typography>Gender : {pg.gender}</Typography>
               <Link to={`/pg/${pg.id}`}>
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mt-5">
                     Get details here
                  </button>
               </Link>
            </CardBody>
            <CardFooter
               divider
               className="flex items-center justify-between py-3"
            >
               <Typography variant="small" className="text-center">
                  Approved :{' '}
                  {pg.approved ? (
                     <CheckCircleIcon strokeWidth="0.8" width="20" />
                  ) : (
                     <XCircleIcon strokeWidth="0.8" width="20" />
                  )}
               </Typography>
               <Typography variant="small" className="text-center">
                  Created At : {pg.createdAt.toLocaleString()}
               </Typography>
            </CardFooter>
            <CardFooter
               divider
               className="flex items-center justify-between py-3"
            >
               <Typography variant="small">Min Rent : {pg.minRent}</Typography>
               <Typography variant="small">
                  Available beds : {pg.availableBeds}
               </Typography>
               <Typography variant="small" color="gray" className="flex gap-1">
                  <i className="fas fa-map-marker-alt fa-sm mt-[3px]" />
                  {pg.city}
               </Typography>
            </CardFooter>
         </Card>
      );
   }

   return (
      <Card className="w-96">
         <CardHeader color="blue" className="relative h-56">
            <img
               src={`${apiUrl}/api/v1/images/pg/${pg.image}`}
               alt="pg-image"
               className="h-full w-full"
            />
         </CardHeader>
         <CardBody className="text-center">
            <Typography variant="h5" className="mb-2">
               {pg.name}
            </Typography>
            <Typography>{pg.foodType || 'all foods'}</Typography>
            <Typography>Gender : {pg.gender}</Typography>
            <Link to={`/pg/${pg.id}`}>
               <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mt-5">
                  Get details here
               </button>
            </Link>
         </CardBody>
         <CardFooter divider className="flex items-center justify-between py-3">
            <Typography variant="small">Min Rent : {pg.minRent}</Typography>
            <Typography variant="small">
               Available beds : {pg.availableBeds}
            </Typography>
            <Typography variant="small" color="gray" className="flex gap-1">
               <i className="fas fa-map-marker-alt fa-sm mt-[3px]" />
               {pg.city}
            </Typography>
         </CardFooter>
      </Card>
   );
};

export default PgCard;
