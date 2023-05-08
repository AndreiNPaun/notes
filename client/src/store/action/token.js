import axios from 'axios';
import cookie from 'js-cookie';
import { tokenActions } from '../slice/token';

export const setToken = (user, url) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(url, user, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = response.data;

      // sets the cookie to expire in 2h
      const expireTwoHours = 2 / 24;
      cookie.set('token', data.token, { expires: expireTwoHours });

      // update store token
      dispatch(tokenActions.login({ token: data.token }));
    } catch (error) {
      throw new Error(error);
    }
  };
};

export const setTokenFromURL = ({ token, refreshToken }) => {
  return (dispatch) => {
    try {
      // sets the cookie to expire in 2h
      const expireTwoHours = 2 / 24;
      cookie.set('token', token, { expires: expireTwoHours });
      cookie.set('refreshToken', refreshToken, { expires: expireTwoHours });

      // update store token
      dispatch(tokenActions.login({ token }));
    } catch (error) {
      console.log(error);
    }
  };
};

export const removeToken = () => {
  return (dispatch) => {
    try {
      cookie.remove('token');
      cookie.remove('refreshToken');

      // update store token
      dispatch(tokenActions.logout());
    } catch (error) {
      console.log(error);
    }
  };
};
