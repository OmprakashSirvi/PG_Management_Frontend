/** @format */
import axios from 'axios';
import { store } from '../Redux/store';

const apiUrl = `http://localhost:8080/api/v1`;

const loginUser = async (credentials) => {
   try {
      const res = await axios.post(`${apiUrl}/user/login`, credentials);
      return res;
   } catch (err) {
      return err;
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
      const jwt = localStorage.getItem('jwt');

      const token = `Bearer ${jwt}`;

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
      const jwt = localStorage.getItem('jwt');

      const token = `Bearer ${jwt}`;

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

const deleltePg = async (id) => {
   const jwt = localStorage.getItem('jwt');

   const token = `Bearer ${jwt}`;
   try {
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
   loginUser,
   getAllPgs,
   getPgById,
   getMe,
   createNewPg,
   deleltePg,
   editPg,
   getPgForOwner,
};
