/** @format */

import { configureStore } from '@reduxjs/toolkit';
import authReducer from './Slice/authSlice';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
   key: 'pgmanage',
   storage,
};

const persistAuthReducers = persistReducer(persistConfig, authReducer);

export const store = configureStore({
   reducer: {
      auth: persistAuthReducers,
   },
});

export const persistedStore = persistStore(store);
