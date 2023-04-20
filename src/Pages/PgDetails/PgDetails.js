/** @format */

import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import { getPgById } from '../../utils/ApiRequests';
import { CheckLogin } from '../../utils/CheckLogin';
import Alert from '../../Components/Alert/Alert';

const PgDetails = () => {
   const [pgDetails, setPgDetails] = useState({});
   const [login, setLogin] = useState(false);

   const [error, setError] = useState(null);
   const [loading, setLoading] = useState(true);
   const [showAlert, setShowAlert] = useState(false);

   const { id } = useParams();
   const location = useLocation();
   const navigate = useNavigate();

   const handleBookPg = (event) => {
      event.preventDefault();
      if (!login) {
         setShowAlert(true);
         setTimeout(() => {
            navigate('/login');
         }, 1000);
      }

      navigate(`/pg/${pgDetails.id}/room`);
   };

   useEffect(() => {
      const getPgDetails = async () => {
         const res = await getPgById(id);

         if (!res) {
            setError('Something went wrong');
            return;
         }
         const check = await CheckLogin();

         setLogin(check);
         setPgDetails(res.data);
         setLoading(false);
      };
      getPgDetails();
   }, [location.pathname]);

   if (error) {
      return <div>{error}</div>;
   }

   if (loading) {
      return <div>Loading...</div>;
   }

   if (pgDetails === null) {
      return <div>No Data to view here..</div>;
   }

   return (
      <div>
         {showAlert && (
            <Alert
               type={'error'}
               message={
                  'You need to be logged in to access this, Redirecting you...'
               }
            />
         )}
         <img src="" alt="pg-image" />
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
            {!login && (
               <div style={{ opacity: 0.5 }}>You need to be logged in </div>
            )}
            <button onClick={handleBookPg}>Book Pg</button>
         </div>
      </div>
   );
};

export default PgDetails;
