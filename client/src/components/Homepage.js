import React from 'react';
import Login from './Authentication/Login';
import Register from './Authentication/Register';

const Homepage = () => {
  return (
    <React.Fragment>
      <Register />
      <Login />
    </React.Fragment>
  );
};

export default Homepage;
