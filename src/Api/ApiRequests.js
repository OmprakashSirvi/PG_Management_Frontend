/** @format */

import doFetch from './doFetch';

const loginUser = async (credentials) => {
   const res = await doFetch({
      endPath: 'user/login',
      method: 'POST',
      data: credentials,
   });

   return res;
};

const registerUser = async (userDetails) => {
   const res = doFetch({
      endPath: 'user/register',
      method: 'POST',
      data: userDetails,
   });

   return res;
};

const getAllPgs = async () => {
   const res = await doFetch({ endPath: 'pg/' });

   return res;
};

const getPgById = async (id) => {
   const res = await doFetch({ endPath: `pg/${id}` });

   return res;
};

const getMe = async () => {
   const res = await doFetch({
      endPath: 'user/getMe',
      withToken: true,
   });

   return res;
};

const getAllRoomsInPg = async (id) => {
   const res = await doFetch({ endPath: `pg/${id}/room/`, withToken: true });

   return res;
};

export {
   loginUser,
   registerUser,
   getAllPgs,
   getPgById,
   getMe,
   getAllRoomsInPg,
};

export * from './Owner/OwnerRequests.js';
export * from './Guest/GuestRequests.js';
export * from './Admin/AdminRequests.js';
