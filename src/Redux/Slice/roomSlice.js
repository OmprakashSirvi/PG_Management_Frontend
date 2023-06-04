/** @format */

import { createSlice } from '@reduxjs/toolkit';
import { addRoom } from '../thunks/addRoom';
import { deleteStateRoom } from '../thunks/deleteRoom';

export const roomSlice = createSlice({
   name: 'room',
   isLoading: false,
   initialState: {
      rooms: [],
   },
   reducers: {
      setInitialState(state, action) {
         state.rooms = action.payload;
      },
      addRoom(state, action) {
         state.rooms.push(action.payload);
         state.rooms.flat();
      },
      updateRoom(state, action) {
         state.rooms.map((ele) => {
            if (ele.id === action.payload.id) {
               return action.payload;
            }
            return ele;
         });
      },
      popRoom(state) {
         state.rooms.pop();
      },
      removeRoom(state, action) {
         state.rooms.filter((room) => room.id !== action.payload);
      },
      deleteAllRooms(state) {
         state.rooms = [];
      },
   },
   extraReducers(builder) {
      builder.addCase(addRoom.fulfilled, (state, action) => {
         state.isLoading = false;
         state.rooms.push(action.payload);
      });
      builder.addCase(addRoom.pending, (state) => {
         state.isLoading = true;
      });
      builder.addCase(addRoom.rejected, (state, action) => {
         state.isLoading = false;
         state.error = action.error;
      });

      builder.addCase(deleteStateRoom.fulfilled, (state, action) => {
         state.isLoading = false;

         state.rooms = state.rooms.filter((room) => room.id !== action.payload);
      });
      builder.addCase(deleteStateRoom.pending, (state) => {
         state.isLoading = true;
      });
      builder.addCase(deleteStateRoom.rejected, (state, action) => {
         state.isLoading = false;
         state.error = action.error;
      });
   },
});
