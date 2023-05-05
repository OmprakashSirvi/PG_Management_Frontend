/** @format */

import { configureStore } from '@reduxjs/toolkit';

import { authSlice } from './Slice/authSlice';

export const store = configureStore({
   reducer: {
      auth: authSlice.reducer,
   },
});

export const { setAuth, setRole, removeAuth } = authSlice.actions;
export * from './thunks/getUserInfo';
