/** @format */

import { createSlice } from '@reduxjs/toolkit';

export const roomSlice = createSlice({
   name: 'room',
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
});
