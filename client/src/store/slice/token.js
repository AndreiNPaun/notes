import { createSlice } from '@reduxjs/toolkit';
import cookie from 'js-cookie';

const storedToken = cookie.get('token');
const storedRefreshToken = cookie.get('refreshToken');

const initialState = {
  isAuthenticated: !!storedToken,
  token: storedToken || null,
  refreshToken: storedRefreshToken || null,
};

const tokenSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action) {
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.refreshToken = action.payload.refreshToken;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.token = null;
      state.refreshToken = null;
    },
  },
});

export const tokenActions = tokenSlice.actions;

export default tokenSlice;
