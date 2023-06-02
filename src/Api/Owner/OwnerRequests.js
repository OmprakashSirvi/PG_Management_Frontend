/** @format */
import { store } from '../../Redux/store';

const REACT_APP_API_URL = process.env.REACT_APP_API_URL;
const apiUrl = `${REACT_APP_API_URL}/api/v1`;

const getPgForOwner = async () => {
   const jwt = store.getState().auth.jwt;
   const token = 'Bearer ' + jwt;
   if (jwt === '') {
      return false;
   }
   try {
      const res = await fetch(`${apiUrl}/owner/pg`, {
         headers: { Authorization: token },
      });
      return res;
   } catch (err) {
      return false;
   }
};

const createNewPg = async (pg) => {
   try {
      const jwt = store.getState().auth.jwt;
      const token = 'Bearer ' + jwt;
      if (jwt === '') {
         return false;
      }
      const res = await fetch(`${apiUrl}/owner/pg`, {
         method: 'POST',
         headers: {
            'Content-Type': 'Application/json',
            Authorization: token,
         },
         body: JSON.stringify(pg),
      });

      return res;
   } catch (err) {
      return false;
   }
};

const editPg = async (pg, id) => {
   try {
      const jwt = store.getState().auth.jwt;
      const token = 'Bearer ' + jwt;
      if (jwt === '') {
         return false;
      }

      const res = await fetch(`${apiUrl}/owner/pg/${id}`, {
         method: 'PATCH',
         headers: {
            'Content-Type': 'Application/json',
            Authorization: token,
         },
         body: JSON.stringify(pg),
      });

      return res;
   } catch (err) {
      return false;
   }
};

const createRoom = async (room, pgId) => {
   try {
      const jwt = store.getState().auth.jwt;
      const token = 'Bearer ' + jwt;
      if (jwt === '') {
         return false;
      }

      console.log(room, pgId);

      const res = await fetch(`${apiUrl}/owner/pg/${pgId}/room`, {
         method: 'POST',
         headers: { Authorization: token },
         body: JSON.stringify(room),
      });

      return res;
   } catch (err) {
      return false;
   }
};

const getGuestsInPg = async (id) => {
   try {
      const jwt = store.getState().auth.jwt;
      const token = 'Bearer ' + jwt;
      if (jwt === '') {
         return false;
      }

      const res = await fetch(`${apiUrl}/owner/pg/${id}/guests`, {
         headers: { Authorization: token },
      });

      return res;
   } catch (err) {
      return false;
   }
};

const deleltePg = async (id) => {
   try {
      const jwt = store.getState().auth.jwt;
      const token = 'Bearer ' + jwt;
      if (jwt === '') {
         return false;
      }
      const res = await fetch(`${apiUrl}/pg/${id}`, {
         method: 'DELETE',
         headers: {
            Authorization: token,
         },
      });

      return res;
   } catch (err) {
      return false;
   }
};

export {
   getPgForOwner,
   createNewPg,
   editPg,
   createRoom,
   deleltePg,
   getGuestsInPg,
};
