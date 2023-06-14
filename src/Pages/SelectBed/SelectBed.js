/** @format */

import React, { Suspense } from 'react';
import { Await, defer, json, useLoaderData } from 'react-router-dom';
import Skeleton from '../../Components/Skeleton/Skeleton';

import { getAllBedsInRoom } from '../../Api/ApiRequests.js';
import BedCard from '../../Components/Card/BedCard/BedCard';
import { Typography } from '@material-tailwind/react';

const SelectBed = () => {
   const { beds } = useLoaderData();

   return (
      <>
         <Typography variant="h4" className="m-4">
            Select beds{' '}
         </Typography>
         <div className="flex flex-row gap-12 justify-center">
            <Suspense fallback={<Skeleton times={3} className="h-60 w-60" />}>
               <Await resolve={beds}>
                  {(loadedBeds) => (
                     <>
                        {loadedBeds.map((bed, index) => {
                           return (
                              <div key={index}>
                                 <BedCard bed={bed} />
                              </div>
                           );
                        })}
                     </>
                  )}
               </Await>
            </Suspense>
         </div>
      </>
   );

   // return <div>Select beds in room here</div>;
};

async function bedLoader(id) {
   // await Pause(400000);

   const res = await getAllBedsInRoom(id);
   console.log(res);

   if (!res || !res.ok) {
      throw json({ message: 'Not able to fetch beds ', status: 500 });
   }

   const resData = await res.json();

   console.log(resData);

   return resData;
}

export async function loader({ params }) {
   const id = params.roomId;

   return defer({ beds: bedLoader(id) });
}

export default SelectBed;
