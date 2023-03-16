import { createSlice } from '@reduxjs/toolkit';
import cookie from 'js-cookie';

const storedToken = cookie.get('token');

const initialState = {
  isAuthenticated: !!storedToken,
  token: storedToken || null,
};

const tokenSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action) {
      state.isAuthenticated = true;
      state.token = action.payload.token;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.token = null;
    },
  },
});

export const tokenActions = tokenSlice.actions;

export default tokenSlice;
