/** @format */
import React from 'react';
import { deleltePg, getPgById } from '../../utils/ApiRequests';
import {
   json,
   redirect,
   useNavigate,
   useRouteLoaderData,
   useSubmit,
} from 'react-router-dom';

const PgDetails = () => {
   const apiUrl = process.env.REACT_APP_API_URL;
   const submit = useSubmit();
   const pgDetails = useRouteLoaderData('pg-detail');

   const handleBookPg = () => {};
   const handleDeletePg = () => {
      const confirm = window.confirm('Are you sure ?');

      if (!confirm) return;

      submit(null, { method: 'DELETE' });
   };

   return (
      <div>
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
         <div>
            <button onClick={handleBookPg}>Book Pg</button>
         </div>
         <button onClick={handleDeletePg}>Delete Pg</button>
      </div>
   );
};

export async function loader({ params }) {
   const id = params.id;
   const res = await getPgById(id);

   if (!res) {
      throw json({ message: 'could not fetch pg' }, { status: 500 });
   } else {
      const resData = await res.json();
      return resData.data;
   }
}

export async function action({ params }) {
   const id = params.id;
   const res = await deleltePg(id);

   console.log(res);
   if (!res)
      throw json({
         message: 'something wrong happend when deleting pg',
         status: 500,
      });

   if (!res.ok) throw json({ message: 'Could not delete pg', status: 500 });

   return redirect('/');
}

export default PgDetails;
