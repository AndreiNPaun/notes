import React from 'react';
import { Link } from 'react-router-dom';
import cookie from 'js-cookie';

const Logout = () => {
  const clearToken = () => {
    cookie.remove('token');
    cookie.remove('refreshToken');

    window.location.reload(false);
  };

  return (
    <Link to="" onClick={clearToken}>
      Logout
    </Link>
  );
};

export default Logout;
