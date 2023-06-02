/** @format */

import { configureStore } from '@reduxjs/toolkit';

import { authSlice } from './Slice/authSlice';
import { roomSlice } from './Slice/roomSlice';

export const store = configureStore({
   reducer: {
      auth: authSlice.reducer,
      room: roomSlice.reducer,
   },
});

export const { setAuth, setRole, removeAuth } = authSlice.actions;
export const {
   addRoom,
   popRoom,
   removeRoom,
   deleteAllRooms,
   setInitialState,
   updateRoom,
} = roomSlice.actions;

export * from './thunks/getUserInfo';
export * from './thunks/addRoom';
export * from './thunks/deleteRoom';
