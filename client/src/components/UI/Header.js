import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Logout from '../Authentication/Logout';
import classes from './Header.module.css';

// promise that it will get the token once it is stored in local storage
const getToken = () => {
  return new Promise((resolve) => {
    const token = localStorage.getItem('token');
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
  const [nav, setNav] = useState(
    <nav>
      <Link to="login">Login</Link>
      <Link to="register">Register</Link>
    </nav>
  );

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
      setNav(
        <nav>
          <Logout />
        </nav>
      );
    }
  }, [token]);

  return (
    <header className={classes.header}>
      <Link to="" className={classes.home_button}>
        Notes
      </Link>
      {nav}
    </header>
  );
};

export default Header;
