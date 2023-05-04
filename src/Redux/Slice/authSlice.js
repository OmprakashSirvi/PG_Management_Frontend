/** @format */

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getMe, loginUser } from '../../utils/ApiRequests';

const initialState = {
   jwt: '',
   user: {},
   currRole: '',
   isLoading: false,
   isError: false,
};

export const login = createAsyncThunk('auth/login', loginUser);
export const getUser = createAsyncThunk('auth/getUser', getMe);

const authSlice = createSlice({
   name: 'auth',
   initialState,
   reducers: {
      logout: (state) => {
         state.user = {};
      },
   },
   extraReducers: (builder) => {
      builder.addCase(login.pending, (state) => {
         state.isLoading = true;
      });
      builder.addCase(login.rejected, (state) => {
         state.jwt = '';
         state.isLoading = false;
         state.isError = true;
      });
      builder.addCase(login.fulfilled, (state, action) => {
         state.jwt = JSON.stringify(action.payload.jwt);
         state.isLoading = false;
         state.isError = false;
      });
      builder.addCase(getUser.pending, (state) => {
         state.isLoading = true;
      });
      builder.addCase(getUser.rejected, (state) => {
         state.user = {};
         state.isLoading = false;
         state.isError = true;
      });
      builder.addCase(getUser.fulfilled, (state, action) => {
         state.user = action.payload;
         state.isLoading = false;
         state.isError = false;
      });
   },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
