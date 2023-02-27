import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import cookie from 'js-cookie';

import classes from './Form.module.css';
import Card from '../UI/Card';
import Input from '../UI/Input';
import Button from '../UI/Button';

const Login = () => {
  const navigate = useNavigate();

  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  // post request with input data which will run a check to confirm identity
  const login = async (user) => {
    try {
      const response = await axios.post(
        'http://localhost:8000/api/login',
        user,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const data = response.data;

      // sets the cookie to expire in 2h
      const expireTwoHours = 2 / 24;
      cookie.set('token', data.token, { expires: expireTwoHours });
      cookie.set('token', data.token, { expires: 2 });
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const loginHandler = async (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    const user = {
      email: enteredEmail,
      password: enteredPassword,
    };

    try {
      await login(user);
      navigate('/');
    } catch (error) {
      console.error('Error:', error);
    }

    emailInputRef.current.value = '';
    passwordInputRef.current.value = '';
  };

  return (
    <Card className={classes.form}>
      <form onSubmit={loginHandler}>
        <div className={classes.control}>
          <Input
            labelClassName={classes.label}
            inputClassName={classes.input}
            htmlFor="email"
            labelText="Email"
            id="email"
            ref={emailInputRef}
          />
        </div>
        <div className={classes.control}>
          <Input
            labelClassName={classes.label}
            inputClassName={classes.input}
            htmlFor="password"
            labelText="Password"
            type="password"
            id="password"
            ref={passwordInputRef}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" buttonCenter={classes.actions}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
