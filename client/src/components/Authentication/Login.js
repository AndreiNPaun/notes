import React, { useRef } from 'react';

import classes from './Form.module.css';
import Card from '../UI/Card';
import Button from '../UI/Button';

const Login = () => {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  // post request with input data which will run a check to confirm identity
  const login = async (user) => {
    try {
      const response = await fetch('http://localhost:8000/api/login', {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      console.log(data);
      localStorage.setItem('token', data.token);
      localStorage.setItem('refreshToken', data.refreshToken);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const loginHandler = (event) => {
    event.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    const user = {
      email: enteredEmail,
      password: enteredPassword,
    };

    login(user);

    emailInputRef.current.value = '';
    passwordInputRef.current.value = '';
  };

  return (
    <Card className={classes.form}>
      <form onSubmit={loginHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" ref={passwordInputRef} />
        </div>
        <Button type="submit" buttonCenter={classes.actions}>
          Login
        </Button>
      </form>
    </Card>
  );
};

export default Login;
