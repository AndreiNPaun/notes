import React, { useState } from 'react';

import Login from './Authentication/Login';
import Register from './Authentication/Register';
import Logout from './Authentication/Logout';
import Card from './UI/Card';

import classes from './Homepage.module.css';
import Button from './UI/Button';

const Homepage = () => {
  // boolean use states required for displaying either the login or the registration form
  const [registerButton, setRegisterButton] = useState(false);
  const [loginButton, setLoginButton] = useState(false);

  const token = localStorage.getItem('token');
  let verifyLogin = false;

  // checks if token is set and if it is set verifyLogin to true which will make login and register options disappear
  if (token) {
    verifyLogin = true;
  }

  const registerForm = () => {
    setRegisterButton(true);
  };

  const loginForm = () => {
    setLoginButton(true);
  };

  return (
    <React.Fragment>
      <Logout token={token} />
      {!registerButton && !loginButton && !verifyLogin && (
        <Card className={classes.form}>
          <div className={classes.center}>
            <Button type="submit" onClick={registerForm}>
              Register
            </Button>
          </div>
          <div className={classes.center}>
            <Button type="submit" onClick={loginForm}>
              Login
            </Button>
          </div>
        </Card>
      )}
      {registerButton && <Register />}
      {loginButton && <Login />}
    </React.Fragment>
  );
};

export default Homepage;
