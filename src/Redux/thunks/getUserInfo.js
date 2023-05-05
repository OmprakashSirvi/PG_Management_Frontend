/** @format */

import { createAsyncThunk } from '@reduxjs/toolkit';
import { getMe } from '../../utils/ApiRequests';

const getUserInfo = createAsyncThunk('user/info/fetch', async (jwt) => {
   const res = await getMe(jwt);
   return res.data;
});

export { getUserInfo };
