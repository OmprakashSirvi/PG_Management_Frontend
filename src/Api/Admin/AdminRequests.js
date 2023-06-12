/** @format */

import doFetch from '../doFetch';

const getAllPgsForAdmin = async () => {
   const res = await doFetch({
      endPath: 'admin/pg?approved=false',
      withToken: true,
   });

   return res;
};

const approvePg = async (id) => {
   const res = await doFetch({
      endPath: `admin/pg/${id}/approve`,
      withToken: true,
   });

   return res;
};

export { getAllPgsForAdmin, approvePg };
