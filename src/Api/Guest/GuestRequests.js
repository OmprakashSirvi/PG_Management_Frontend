/** @format */

import doFetch from '../doFetch';

const rasieRequestForBed = (bedId) => {
   const res = doFetch({
      endPath: `bed/${bedId}`,
      withToken: true,
      method: 'POST',
   });

   return res;
};

export { rasieRequestForBed };
