/** @format */

import { createAsyncThunk } from '@reduxjs/toolkit';
import { deleteRoom } from '../../Api/ApiRequests';

const deleteStateRoom = createAsyncThunk('rooms/removeRoom', async (id) => {
   console.log('Remove room called with id : ', id);
   const res = await deleteRoom(id);

   return id;
});

export { deleteStateRoom };
