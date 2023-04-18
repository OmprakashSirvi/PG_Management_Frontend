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

export { loginUser };
