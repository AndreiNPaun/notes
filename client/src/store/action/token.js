import cookie from 'js-cookie';
import UseHttp from '../../hooks/useHttp';

import { tokenActions } from '../slice/token';

export const setToken = (user, url) => {
  return async (dispatch) => {
    try {
      const data = await UseHttp({ method: 'post', url, values: user });

      // sets the cookie to expire in 2h
      const expireTwoHours = 2 / 24;
      cookie.set('token', data.token, { expires: expireTwoHours });

      // update store token
      dispatch(tokenActions.login({ token: data.token }));
    } catch (error) {
      throw error;
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
      throw error;
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
      throw error;
    }
  };
};
