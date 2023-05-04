/** @format */

import React from 'react';
import { useLoaderData } from 'react-router-dom';

import { getAllPgs } from '../../utils/ApiRequests';
import PgCard from '../../Components/PgCard/PgCard';

import './Pg.css';
import { Link, json } from 'react-router-dom';

const Pg = () => {
   const pgs = useLoaderData();

   return (
      <div>
         <h1>List of PGs</h1>
         <Link to={'add-pg'}>
            <button>Add Pg</button>
         </Link>

         <div className="grid-container">
            {pgs.map((pg, index) => {
               return <PgCard key={index} pg={pg} />;
            })}
         </div>
      </div>
   );
};

export async function loader() {
   const res = await getAllPgs();

   if (!res) {
      throw json({ message: 'could not fetch pg' }, { status: 500 });
   } else {
      const resData = await res.json();
      return resData.data;
   }
}

export default Pg;
