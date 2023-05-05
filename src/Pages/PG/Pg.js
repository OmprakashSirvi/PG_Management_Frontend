/** @format */

import React, { Suspense } from 'react';
import { Await, defer, useLoaderData, json, Link } from 'react-router-dom';
import { Typography } from '@material-tailwind/react';

import { getAllPgs, getPgForOwner } from '../../utils/ApiRequests';
import { Pause } from '../../utils/Pause';

import './Pg.css';
import PgCard from '../../Components/PgCard/PgCard';
import Skeleton from '../../Components/Skeleton/Skeleton';

const Pg = ({ mode }) => {
   const { pgs } = useLoaderData();

   return (
      <React.Fragment>
         <Typography variant="h3">List of PGs</Typography>
         <Link to={'add-pg'}>
            <button>Add Pg</button>
         </Link>
         <Suspense
            fallback={
               <div className="grid-container">
                  <Skeleton times={6} className="h-96 w-96" />
               </div>
            }
         >
            <Await resolve={pgs}>
               {(loadedPgs) => (
                  <div className="grid-container">
                     {loadedPgs.map((pg, index) => {
                        return <PgCard key={index} pg={pg} />;
                     })}
                  </div>
               )}
            </Await>
         </Suspense>
      </React.Fragment>
   );
};

async function loadPgs(mode) {
   let res;
   switch (mode) {
      case 'admin':
         break;
      case 'owner':
         res = await getPgForOwner();
         break;
      default:
         res = await getAllPgs();
   }

   // TODO only for dev purpose
   await Pause(2000);

   if (!res) {
      throw json({ message: 'could not fetch pg' }, { status: 500 });
   } else {
      const resData = await res.json();
      return resData.data;
   }
}

export function loader({ request }) {
   const searchParams = new URL(request.url).searchParams;
   const mode = searchParams.get('mode') || 'guest';

   return defer({ pgs: loadPgs(mode) });
}

export default Pg;
