/** @format */
import axios from 'axios';
import { UserContextInfoList } from '../Contexts/UserContextInfo';

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

const getMe = async () => {
   try {
      const token = `Bearer ${localStorage.getItem('jwt')}`;
      const res = await axios.get(`${apiUrl}/user/getMe`, {
         headers: { Authorization: token },
      });

      UserContextInfoList.length = 0;

      res.data.forEach((ele) => {
         UserContextInfoList.push(ele);
      });

      return res.data;
   } catch (err) {
      console.log(err);
      localStorage.removeItem('jwt');
      return false;
   }
};

export { loginUser, getAllPgs, getPgById, getMe };
