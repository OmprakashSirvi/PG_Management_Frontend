/** @format */

import { createAsyncThunk } from '@reduxjs/toolkit';
import { getMe } from '../../Api/ApiRequests';

const getUserInfo = createAsyncThunk('user/info/fetch', async () => {
   const res = await getMe();

   if (!res || !res.ok) {
      console.log("There is some error in fetching user's info");
      throw new Error('Your tokens are invalid');
   }

   const resData = await res.json();

   return resData;
});

export { getUserInfo };
