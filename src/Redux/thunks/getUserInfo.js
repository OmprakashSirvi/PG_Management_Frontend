/** @format */

import { createAsyncThunk } from '@reduxjs/toolkit';
import { getMe } from '../../Api/ApiRequests';

const getUserInfo = createAsyncThunk('user/info/fetch', async () => {
   const res = await getMe();

   const resData = await res.json();

   return resData;
});

export { getUserInfo };
