import React, { useState, useEffect } from 'react';
import cookie from 'js-cookie';

import Logout from './Authentication/Logout';
import HeaderStyle from './HeaderStyle';

// promise that it will get the token once it is stored in local storage
const getToken = () => {
  return new Promise((resolve) => {
    const token = cookie.get('token');
    if (token) {
      resolve(token);
    } else {
      setTimeout(() => {
        resolve(getToken());
      }, 200);
    }
  });
};

const Header = () => {
  const [token, setToken] = useState(null);
  const [nav, setNav] = useState([
    { text: 'Login', path: 'login' },
    { text: 'Register', path: 'register' },
  ]);

  // awaits for token
  useEffect(() => {
    async function fetchToken() {
      const token = await getToken();
      setToken(token);
    }
    fetchToken();
  }, [getToken]);

  // updates navbar once the token state changes
  useEffect(() => {
    if (token) {
      setNav([{ text: 'Logout', path: '', onClick: Logout }]);
    }
  }, [token]);

  return <HeaderStyle logo="Notes" links={nav} />;
};

export default Header;
