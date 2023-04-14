/** @format */
import axios from 'axios';

const apiUrl = `http://localhost:8080/api/v1`;

const loginUser = async (credentials) => {
   const res = await axios.post(`${apiUrl}/user/login`, credentials);
   return res.data;
};

export { loginUser };
