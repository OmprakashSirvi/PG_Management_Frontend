/** @format */

import React from 'react';
import { useEffect, useState } from 'react';

import { getAllPgs } from '../../utils/ApiRequests';
import PgCard from '../../Components/PgCard/PgCard';

import './Pg.css';

const Pg = () => {
   const [pgs, setPgs] = useState([]);
   const [error, setError] = useState(null);
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      const loadPgs = async () => {
         try {
            const res = await getAllPgs();

            if (!res) {
               setError('Something went wrong');
               setLoading(false);
               return;
            }

            setPgs(res.data);
            setLoading(false);
         } catch (err) {
            setError(err);
         }
      };
      loadPgs();
   }, []);

   if (error) {
      return <div>Error : {error}</div>;
   }

   if (loading) {
      return <div>Loading ...</div>;
   }

   return (
      <div className="grid-container">
         {pgs.map((pg, index) => {
            return <PgCard key={index} item={pg} />;
         })}
      </div>
   );
};

export default Pg;
