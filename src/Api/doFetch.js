/** @format */

import { Pause } from '../utils/Pause';

// eslint-disable-next-line no-undef
const REACT_APP_API_URL = process.env.REACT_APP_API_URL;
// eslint-disable-next-line no-undef
const NODE_ENV = process.env.NODE_ENV;
// eslint-disable-next-line no-undef
const REACT_APP_ENABLE_DELAY = process.env.REACT_APP_ENABLE_DELAY;
// eslint-disable-next-line no-undef
const REACT_APP_DELAY_TIME = process.env.REACT_APP_DELAY_TIME;

const apiUrl = `${REACT_APP_API_URL}/api/v1`;

const doFetch = async (options) => {
   const endPath = options.endPath || '/';
   const withToken = options.withToken || false;
   const method = options.method || 'GET';
   const data = options.data || null;
   const type = options.type || 'json';

   // Declare a headers object
   let headers = {
      'Content-Type': 'Application/json',
   };

   if (NODE_ENV === 'development' && REACT_APP_ENABLE_DELAY === 'true') {
      console.log('There is delay enabled');
      await Pause(REACT_APP_DELAY_TIME);
   }

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

   // Create a formData object
   const formData = new FormData();

   // If the type is image then append the image to the formData
   if (type === 'image') {
      formData.append('image', data);
      delete headers['Content-Type'];
   }

   // If the type is image then set the content type to multipart/form-data
   // else set it to application/json
   const reqBody = type === 'image' ? formData : JSON.stringify(data);

   let res = await fetch(`${apiUrl}/${endPath}`, {
      headers,
      method,
      body: data ? reqBody : null,
   });

   if (!res.ok && withToken) {
      console.log('Seems like the jwt token has expired');
      console.log('I need to refresh the token using refresh token');

      // Get the refresh token from the store
      const refreshToken = localStorage.getItem('refreshToken');

      // If the refresh token is empty or null or undefined then return false
      if (
         refreshToken === '' ||
         refreshToken === null ||
         refreshToken === undefined
      ) {
         console.log("There is no refresh token in the store so can't refresh");
         return false;
      }

      // Remove the authorization field from the header
      headers.Authorization = '';
      headers['Content-Type'] = 'Application/json';

      // Send the request to backend to refresh the token
      const refreshRes = await fetch(`${apiUrl}/user/generateToken`, {
         headers,
         method: 'POST',
         body: JSON.stringify({ refreshToken }),
      });

      console.log(refreshRes);

      // Now check if the refresh token is valid or not
      if (!refreshRes.ok) {
         console.log('The refresh token is invalid, or has been expired');
         return false;
      }

      // If the refresh token is valid then get the new jwt and refresh token
      const refreshResData = await refreshRes.json();

      console.log('refreshResData', refreshResData);

      // Store the new jwt and refresh token in the store
      localStorage.setItem('jwt', refreshResData.jwt);
      localStorage.setItem('refreshToken', refreshResData.refreshToken);

      if (type === 'image') {
         delete headers['Content-Type'];
      }

      // Now send the request again with the new jwt token
      res = await fetch(`${apiUrl}/${endPath}`, {
         headers: {
            ...headers,
            Authorization: `Bearer ${refreshResData.jwt}`,
         },
         method,
         body: data ? reqBody : null,
      });

      console.log('doFetch res', res);
   }

   return res;

   //
};

export default doFetch;
