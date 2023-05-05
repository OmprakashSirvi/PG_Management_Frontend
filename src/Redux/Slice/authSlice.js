/** @format */
import { createSlice } from '@reduxjs/toolkit';
import { getUserInfo } from '../thunks/getUserInfo';

export const authSlice = createSlice({
   name: 'auth',
   initialState: {
      jwt: '',
      userInfo: [],
      selectedUserMode: { role: '', email: '' },
      isLoading: false,
      error: null,
   },
   reducers: {
      setAuth(state, action) {
         state.jwt = action.payload.jwt;
         state.authTime = Date.now();
      },
      setRole(state, action) {
         state.selectedUserMode.role = action.payload;
      },
      removeAuth(state) {
         state.jwt = '';
         state.selectedUserMode = { role: '', email: '' };
         state.userInfo = [];
      },
   },
   extraReducers(builder) {
      builder.addCase(getUserInfo.pending, (state) => {
         state.isLoading = true;
      });
      builder.addCase(getUserInfo.fulfilled, (state, action) => {
         state.isLoading = false;
         state.userInfo = action.payload;
         state.selectedUserMode.email = action.payload[0].email;
      });
      builder.addCase(getUserInfo.rejected, (state, action) => {
         state.isLoading = false;
         state.error = action.error;
      });
   },
});
