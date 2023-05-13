/** @format */

import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { authSlice } from './Slice/authSlice';
import { roomSlice } from './Slice/roomSlice';

const persistConfig = { key: 'pgmanage', storage };

const persistAuthReducer = persistReducer(persistConfig, authSlice.reducer);

export const store = configureStore({
   reducer: {
      auth: persistAuthReducer,
      room: roomSlice.reducer,
   },
});

export const persistedStore = persistStore(store);
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
