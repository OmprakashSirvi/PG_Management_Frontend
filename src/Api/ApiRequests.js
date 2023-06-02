/** @format */
import axios from 'axios';
import { store } from '../Redux/store';

import {
   getPgForOwner,
   createNewPg,
   editPg,
   createRoom,
   deleltePg,
   getGuestsInPg,
} from './Owner/OwnerRequests';

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
   createRoom,
};
