/** @format */

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const PgDetails = () => {
   const [pgDetails, setPgDetails] = useState({});
   const [error, setError] = useState(null);
   const { id } = useParams();

   useEffect(() => {
      const getPgDetails = async () => {
         const res = await getPgDetails(id);

         if (!res) {
            error('Something wnet wrong');
            return;
         }

         setPgDetails(res.data);
      };
      getPgDetails();
   }, []);

   if (error) {
      return <div>{error}</div>;
   }

   return (
      <div>
         <h1>Name : {pgDetails.name}</h1>
      </div>
   );
};

export default PgDetails;
