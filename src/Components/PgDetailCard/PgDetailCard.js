/** @format */
import React from 'react';

function PgDetailCard({ pgDetails }) {
   // eslint-disable-next-line no-undef
   const apiUrl = process.env.REACT_APP_API_URL;

   return (
      <>
         <img
            src={`${apiUrl}/api/v1/images/pg/${pgDetails.image}`}
            alt="pg-image"
         />
         <div>
            <h1>Pg Details</h1>
            <h3>Name : {pgDetails.name}</h3>
            <p>Gender : {pgDetails.gender}</p>
            <p>Address : {pgDetails.address}</p>
            <p>city : {pgDetails.city}</p>
            <p>maxRent : {pgDetails.maxRent}</p>
            <p>minRent : {pgDetails.minRent}</p>
            <p>description : {pgDetails.description}</p>
            <p>pgType : {pgDetails.pgType}</p>
            <p>amenitites : {pgDetails.amenitites}</p>
            <p>availableBeds : {pgDetails.availableBeds}</p>
         </div>
         <div>
            <h1>Owner details</h1>
            <img src={''} alt="user-image" />
            <p>
               Owner name : {pgDetails.owner.firstName}{' '}
               {pgDetails.owner.lastName && pgDetails.owner.lastName}
            </p>
            <p>Owner mobile number : {pgDetails.owner.mobileNumber}</p>
            <p>Owner email : {pgDetails.owner.email}</p>
         </div>
      </>
   );
}

export default PgDetailCard;
