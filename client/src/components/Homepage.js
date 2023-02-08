import React, { useState } from 'react';

import Login from './Authentication/Login';
import Register from './Authentication/Register';
import Card from './UI/Card';

import classes from './Homepage.module.css';
import Button from './UI/Button';

const Homepage = () => {
  const [registerButton, setRegisterButton] = useState(false);
  const [loginButton, setLoginButton] = useState(false);

  const registerForm = () => {
    setRegisterButton(true);
  };

  const loginForm = () => {
    setLoginButton(true);
  };

  console.log(`register ${registerButton} login ${loginButton}`);

  return (
    <React.Fragment>
      {!registerButton && !loginButton && (
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
