import React from 'react';
import { Link } from 'react-router-dom';

const Logout = () => {
  const clearToken = () => {
    localStorage.clear('token');
    localStorage.clear('refreshToken');

    window.location.reload(false);
  };

  return (
    <Link to="" onClick={clearToken}>
      Logout
    </Link>
  );
};

export default Logout;
