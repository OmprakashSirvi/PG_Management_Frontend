/** @format */
import axios from 'axios';
import { UserContextInfoList } from '../Contexts/UserContextInfo';
import { useSelector } from 'react-redux';

const apiUrl = `http://localhost:8080/api/v1`;

const loginUser = async (credentials) => {
   try {
      console.log('login is calling');
      const res = await axios.post(`${apiUrl}/user/login`, credentials);
      console.log('res', res.data);
      return res.data;
   } catch (err) {
      console.log(err);
      return err;
   }
};

const getAllPgs = async () => {
   try {
      const res = await axios.get(`${apiUrl}/pg/`);
      return res;
   } catch (err) {
      return false;
   }
};

const getPgById = async (id) => {
   try {
      const res = await axios.get(`${apiUrl}/pg/${id}`);
      return res;
   } catch (err) {
      return false;
   }
};

const getMe = async (jwt) => {
   try {
      const token = `Bearer ${jwt}`;

      console.log(token);

      const res = await axios.get(`${apiUrl}/user/getMe`, {
         headers: { Authorization: token },
      });

      return res.data;
   } catch (err) {
      return false;
   }
};

export { loginUser, getAllPgs, getPgById, getMe };
