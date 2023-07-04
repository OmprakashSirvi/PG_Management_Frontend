/** @format */

import doFetch from '../doFetch';

const rasieRequestForBed = (bedId) => {
   const res = doFetch({
      endPath: `request/bed/${bedId}`,
      withToken: true,
      method: 'POST',
   });

   return res;
};

const getAllBedRequests = () => {
   const res = doFetch({
      endPath: `user/requests`,
      withToken: true,
      method: 'GET',
   });

   return res;
};

export { rasieRequestForBed, getAllBedRequests };
