/** @format */
import axios from 'axios';
import { store } from '../Redux/store';

const REACT_APP_API_URL = process.env.REACT_APP_API_URL;
const apiUrl = `${REACT_APP_API_URL}/api/v1`;

const loginUser = async (credentials) => {
   try {
      const res = await axios.post(`${apiUrl}/user/login`, credentials);
      return res;
   } catch (err) {
      return err;
   }
};

const registerUser = async (userDetails) => {
   try {
      const res = await fetch(`${apiUrl}/user/register`, {
         headers: { 'Content-Type': 'Application/json' },
         body: JSON.stringify(userDetails),
         method: 'POST',
      });

      return res;
   } catch (err) {
      return false;
   }
};

const verifyUser = async (link) => {
   try {
      const res = await fetch(link);
      return res;
   } catch (err) {
      return false;
   }
};

const getAllPgs = async () => {
   try {
      const res = await fetch(`${apiUrl}/pg/`);
      // const res = await axios.get(`${apiUrl}/pg/`);
      return res;
   } catch (err) {
      return false;
   }
};

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

const getPgById = async (id) => {
   try {
      const res = await fetch(`${apiUrl}/pg/${id}`);
      return res;
   } catch (err) {
      return false;
   }
};

const getMe = async (jwt) => {
   try {
      const token = `Bearer ${jwt}`;

      const res = await axios.get(`${apiUrl}/user/getMe`, {
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

const getAllRoomsInPg = async (id) => {
   try {
      const jwt = store.getState().auth.jwt;
      const token = 'Bearer ' + jwt;
      if (jwt === '') {
         return { message: 'not signed in', status: 401 };
      }

      const res = await fetch(`${apiUrl}/pg/${id}/room/`, {
         headers: { Authorization: token },
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
   REACT_APP_API_URL,
   loginUser,
   getAllPgs,
   getPgById,
   getMe,
   createNewPg,
   deleltePg,
   editPg,
   getPgForOwner,
   registerUser,
   verifyUser,
   getGuestsInPg,
   getAllRoomsInPg,
};
