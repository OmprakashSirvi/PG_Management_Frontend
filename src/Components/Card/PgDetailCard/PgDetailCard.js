/** @format */
import { Typography } from '@material-tailwind/react';
import React from 'react';

function BasicDetails({ name, gender, address, city }) {
   return (
      <div className="mb-6">
         <Typography variant="h3" className="mb-2">
            Basic Details
         </Typography>
         <p>PG Name: {name}</p>
         <p>Gender: {gender}</p>
         <p>Address: {address}</p>
         <p>City: {city}</p>
      </div>
   );
}

function AdditionalDetails({ maxRent, minRent, pgType, availableBeds }) {
   return (
      <div className="mb-6">
         <Typography variant="h3" className="mb-2">
            Additional Details
         </Typography>
         <p>Max Rent: {maxRent}</p>
         <p>Min Rent: {minRent}</p>
         <p>PG Type: {pgType}</p>
         <p>Available Beds: {availableBeds}</p>
      </div>
   );
}

function Amenities({ amenities }) {
   return (
      <div className="mb-6">
         <Typography variant="h3" className="mb-2">
            Amenities
         </Typography>
         {!amenities && <p>No amenities added yet.</p>}
         {amenities && (
            <ul>
               {amenities.map((amenity, index) => (
                  <li key={index}>{amenity}</li>
               ))}
            </ul>
         )}
      </div>
   );
}

function Description({ description }) {
   return (
      <div>
         <Typography variant="h3" className="mb-2">
            Description
         </Typography>
         <p>{description}</p>
      </div>
   );
}

function OwnerDetails({ owner }) {
   return (
      <div className="bg-white rounded-lg shadow-lg p-8 md:p-10 mt-8 md:mt-0 w-full">
         <Typography variant="h2" className="mb-2">
            Owner details
         </Typography>
         <img
            src={''}
            alt="user-image"
            className="rounded-full h-20 w-20 mb-4"
         />
         <Typography>
            Owner name: {owner.firstName} {owner.lastName && owner.lastName}
         </Typography>
         <Typography>Owner mobile number: {owner.mobileNumber}</Typography>
         <Typography>Owner email: {owner.email}</Typography>
      </div>
   );
}

function PgDetailCard({ pgDetails }) {
   // eslint-disable-next-line no-undef
   const apiUrl = process.env.REACT_APP_API_URL;

   const {
      name,
      gender,
      address,
      city,
      maxRent,
      minRent,
      pgType,
      availableBeds,
      amenities,
      description,
   } = pgDetails;

   return (
      <div className="flex flex-col md:space-y-4 m-4">
         <div className="bg-white rounded-lg shadow-lg p-8 md:p-10 w-full">
            <img
               src={`${apiUrl}/api/v1/images/pg/${pgDetails.image}`}
               alt="pg-image"
               className="rounded-lg w-full mb-4"
            />

            <BasicDetails
               name={name}
               gender={gender}
               address={address}
               city={city}
            />

            <AdditionalDetails
               maxRent={maxRent}
               minRent={minRent}
               pgType={pgType}
               availableBeds={availableBeds}
            />

            <Amenities amenities={amenities} />

            <Description description={description} />
         </div>

         <OwnerDetails owner={pgDetails.owner} />
      </div>
   );
}

export default PgDetailCard;
