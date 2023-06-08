/** @format */

// eslint-disable-next-line no-undef
const REACT_APP_API_URL = process.env.REACT_APP_API_URL;
const apiUrl = `${REACT_APP_API_URL}/api/v1`;

const doFetch = async (options) => {
   const endPath = options.endPath || '/';
   const withToken = options.withToken || false;
   const method = options.method || 'GET';
   const data = options.data || null;

   // Declare a headers object
   let headers = {
      'Content-Type': 'Application/json',
   };

   if (withToken) {
      // Get the jwtToken from the store
      const jwt = localStorage.getItem('jwt');

      // If the jwt is empty or null or undefined then return false
      if (jwt === '' || jwt === null || jwt === undefined) {
         return false;
      }

      // Create the token
      const token = 'Bearer ' + jwt;

      // Add the authorization token in the header
      headers.Authorization = token;
   }

   try {
      const res = await fetch(`${apiUrl}/${endPath}`, {
         headers,
         method,
         body: data ? JSON.stringify(data) : null,
      });

      return res;
      //
   } catch (err) {
      console.log('There is some error in do fetch');
      return false;
   }
};

export default doFetch;
