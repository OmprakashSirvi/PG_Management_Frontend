/** @format */

import { createAsyncThunk } from '@reduxjs/toolkit';
import { createRoom } from '../../Api/ApiRequests';

const addRoom = createAsyncThunk('room/add', async (room, pgId) => {
   const res = await createRoom(room, pgId);

   console.log('From addRoom thunk', res);

   return res;
});

export { addRoom };
