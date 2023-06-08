/** @format */
import doFetch from '../doFetch';

const getPgForOwner = async () => {
   const res = doFetch({ endPath: 'owner/pg', withToken: true });

   return res;
};

const createNewPg = async (pg) => {
   const res = await doFetch({
      endPath: 'owner/pg',
      withToken: true,
      method: 'POST',
      data: pg,
   });

   return res;
};

const editPg = async (pg, id) => {
   const res = await doFetch({
      endPath: `owner/pg/${id}`,
      withToken: true,
      method: 'PATCH',
      data: pg,
   });

   return res;
};

const createRoom = async (room, pgId) => {
   const res = await doFetch({
      endPath: `owner/pg/${pgId}/room`,
      withToken: true,
      method: 'POST',
      data: room,
   });

   return res;
};

const getGuestsInPg = async (id) => {
   const res = doFetch({ endPath: `owner/pg/${id}/guests`, withToken: true });

   return res;
};

const deleltePg = async (id) => {
   const res = await doFetch({
      endPath: `owner/pg/${id}`,
      withToken: true,
      method: 'DELETE',
   });

   return res;
};

const deleteRoom = async (id) => {
   const res = await doFetch({
      endPath: `owner/room/${id}`,
      withToken: true,
      method: 'DELETE',
   });

   return res;
};

export {
   getPgForOwner,
   createNewPg,
   editPg,
   createRoom,
   deleltePg,
   getGuestsInPg,
   deleteRoom,
};
