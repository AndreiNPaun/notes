import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeToken } from '../store/action/token';

import HeaderStyle from './UI/HeaderStyle';

const Header = () => {
  const dispatch = useDispatch();

  const token = useSelector((state) => state.token.token);

  const [nav, setNav] = useState([
    { text: 'Login', path: 'login' },
    { text: 'Register', path: 'register' },
  ]);

  // unsets the token if logout option is present on header and clicked on and redirects back home
  const logoutToken = () => {
    dispatch(removeToken());

    window.location.reload(false);
  };

  // updates navbar once the token state changes
  useEffect(() => {
    if (token) {
      setNav([{ text: 'Logout', path: '', onClick: logoutToken }]);
    }
  }, [token]);

  return <HeaderStyle logo="Notes" links={nav} />;
};

export default Header;
