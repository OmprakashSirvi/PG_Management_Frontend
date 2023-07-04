/** @format */

import React, { Suspense } from 'react';
import { Await, defer, useLoaderData, json, Link } from 'react-router-dom';
import { Button, Typography } from '@material-tailwind/react';

import {
   getAllPgs,
   getAllPgsForAdmin,
   getPgForOwner,
} from '../../Api/ApiRequests';

import './Pg.css';
import PgCard from '../../Components/Card/PgCard/PgCard';
import Skeleton from '../../Components/Skeleton/Skeleton';
import { useSelector } from 'react-redux';
import Search from '../../Components/Search/Search';

const Pg = () => {
   const auth = useSelector((state) => {
      return state.auth;
   });

   const { pgs } = useLoaderData();

   return (
      <React.Fragment>
         <Typography variant="h3">List of PGs</Typography>
         {auth?.selectedUserMode?.role === 'ROLE_OWNER' && (
            <Button className="mb-6 mt-4 hover:bg-green-900" color="green">
               <Link to={'add-pg'}>Add Pg</Link>
            </Button>
         )}
         <div className="m-4">
            <Search />
         </div>
         <Suspense
            fallback={
               <div className="grid-container">
                  <Skeleton times={6} className="h-96 w-96" />
               </div>
            }
         >
            <Await resolve={pgs}>
               {(loadedPgs) => (
                  <>
                     {loadedPgs && loadedPgs.length === 0 && (
                        <Typography variant="h5" className="m-4">
                           No PGs found
                        </Typography>
                     )}
                     <div className="grid-container">
                        {loadedPgs.map((pg, index) => {
                           return <PgCard key={index} pg={pg} />;
                        })}
                     </div>
                  </>
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
         res = await getAllPgsForAdmin();
         break;
      case 'owner':
         res = await getPgForOwner();
         break;
      default:
         res = await getAllPgs();
   }

   if (!res) {
      throw json({ message: 'could not fetch pg' }, { status: 403 });
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
