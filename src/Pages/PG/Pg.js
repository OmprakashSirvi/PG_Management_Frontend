/** @format */

import React, { Suspense } from 'react';
import { Await, defer, useLoaderData, json, Link } from 'react-router-dom';

import { getAllPgs } from '../../utils/ApiRequests';

import './Pg.css';
import PgCard from '../../Components/PgCard/PgCard';

const Pg = () => {
   const { pgs } = useLoaderData();

   return (
      <React.Fragment>
         <h1>List of PGs</h1>
         <Link to={'add-pg'}>
            <button>Add Pg</button>
         </Link>
         <Suspense fallback={<p>loading Pgs..</p>}>
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

async function loadPgs() {
   const res = await getAllPgs();

   if (!res) {
      throw json({ message: 'could not fetch pg' }, { status: 500 });
   } else {
      const resData = await res.json();
      return resData.data;
   }
}

export function loader() {
   return defer({ pgs: loadPgs() });
}

export default Pg;
