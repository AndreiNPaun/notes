import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import cookie from 'js-cookie';
import { Center } from '@chakra-ui/react';

import Card from '../UI/Card';
import InputFields from '../UI/InputFields';
import Button from '../UI/Button';
import Styles from '../UI/LoginRegiserFormStyles';

const Login = () => {
  const navigate = useNavigate();

  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const [errorMessage, setErrorMessage] = useState('');

  const [labelStyle, inputStyle, cardStyle] = Styles();

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
      setErrorMessage('Invalid email and/ or password.');
      throw new Error(error);
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
    <Card cardStyle={cardStyle}>
      <form onSubmit={loginHandler}>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        <InputFields
          labelStyle={labelStyle}
          inputStyle={inputStyle}
          htmlFor="email"
          labelText="Email"
          id="email"
          ref={emailInputRef}
        />
        <InputFields
          labelStyle={labelStyle}
          inputStyle={inputStyle}
          htmlFor="password"
          labelText="Password"
          type="password"
          id="password"
          ref={passwordInputRef}
        />
        <Center mt="1rem">
          <Button type="submit">Login</Button>
        </Center>
      </form>
    </Card>
  );
};

export default Login;
