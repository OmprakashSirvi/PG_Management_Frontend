/** @format */
import axios from 'axios';

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
      console.log(res);
      return res;
   } catch (err) {
      return false;
   }
};

export { loginUser, getAllPgs, getPgById };
