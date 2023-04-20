/** @format */

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { getPgById } from '../../utils/ApiRequests';

const PgDetails = () => {
   const [pgDetails, setPgDetails] = useState({});
   const [error, setError] = useState(null);
   const [loading, setLoading] = useState(true);
   const { id } = useParams();

   useEffect(() => {
      const getPgDetails = async () => {
         const res = await getPgById(id);

         if (!res) {
            setError('Something went wrong');
            return;
         }

         setPgDetails(res.data);
         setLoading(false);
      };
      getPgDetails();
   });

   if (error) {
      return <div>{error}</div>;
   }

   if (loading) {
      return <div>Loading...</div>;
   }

   return (
      <div>
         <h1>Name : {pgDetails.name}</h1>
      </div>
   );
};

export default PgDetails;
