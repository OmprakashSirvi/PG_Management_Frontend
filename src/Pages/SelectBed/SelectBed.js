/** @format */

import React, { Suspense, useEffect } from 'react';
import {
   Await,
   defer,
   json,
   useActionData,
   useLoaderData,
   useLocation,
   useParams,
   useSubmit,
} from 'react-router-dom';
import Skeleton from '../../Components/Skeleton/Skeleton';

import {
   getAllBedRequests,
   getAllBedsInRoom,
   rasieRequestForBed,
} from '../../Api/ApiRequests.js';
import BedCard from '../../Components/Card/BedCard/BedCard';
import { Button, Typography } from '@material-tailwind/react';

const SelectBed = () => {
   const [bedIds, setBedIds] = React.useState([]);
   const [requestAll, setRequestAll] = React.useState(false);
   const { beds, requests } = useLoaderData();
   const actionData = useActionData();
   const submit = useSubmit();
   const location = useLocation();

   function handleRaiseRequest(event) {
      let formData = new FormData();
      formData.append('bedId', event.target.id);

      submit(formData, { method: 'POST' });
   }
   useEffect(() => {
      let isCancelled = false;

      if (location.search?.split('=')[1] === 'all') {
         setRequestAll(true);
      }

      async function loadRequests() {
         try {
            const data = await requests;
            if (isCancelled) return;
            const ids = data.map((request) => request?.bed?.id);

            setBedIds(ids);
         } catch (err) {
            if (isCancelled) return;
            console.log("There is some error in loading requests' data");
         }
      }
      loadRequests();

      return () => {
         isCancelled = true;
      };
   }, []);

   if (actionData?.status === 500) {
      window.alert(actionData?.message);
   }

   return (
      <>
         <Typography variant="h4" className="m-4">
            {requestAll ? 'View Room' : 'Select your Beds'}
         </Typography>
         <div className="flex flex-row gap-12 justify-center m-4">
            <Suspense fallback={<Skeleton times={3} className="h-60 w-60" />}>
               <Await resolve={beds}>
                  {(loadedBeds) => (
                     <>
                        {loadedBeds.map((bed, index) => {
                           return (
                              <div key={index}>
                                 <BedCard
                                    raisable={requestAll ? false : true}
                                    bedRequestIds={bedIds}
                                    bed={bed}
                                    handleRaiseRequest={handleRaiseRequest}
                                 />
                              </div>
                           );
                        })}
                     </>
                  )}
               </Await>
            </Suspense>
         </div>
         {requestAll && <Button>Raise Request</Button>}
      </>
   );

   // return <div>Select beds in room here</div>;
};

async function bedLoader(id) {
   // await Pause(400000);

   const res = await getAllBedsInRoom(id);

   if (!res || !res.ok) {
      throw json({ message: 'Not able to fetch beds ', status: 500 });
   }

   const resData = await res.json();

   return resData;
}

async function requestLoader() {
   const res = await getAllBedRequests();

   if (!res || !res.ok) {
      throw json({ message: 'Not able to fetch requests ', status: 500 });
   }

   const resData = await res.json();

   return resData;
}

export async function loader({ params }) {
   const id = params.roomId;

   return defer({ beds: bedLoader(id), requests: requestLoader() });
}

export async function action({ request }) {
   const data = await request.formData();

   const res = await rasieRequestForBed(data.get('bedId'));

   if (!res || !res.ok) {
      return { message: 'Not able to raise request for bed', status: 500 };
   }

   const resData = await res.json();

   return { message: resData.message, status: 200, data: resData.data };
}

export default SelectBed;
