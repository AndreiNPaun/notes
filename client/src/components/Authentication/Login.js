import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { setToken } from '../../store/action/token';

import Card from '../UI/Card';
import InputFields from '../UI/InputFields';
import Button from '../UI/Button';
import Styles from '../UI/LoginRegiserFormStyles';
import { Center } from '@chakra-ui/react';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const [errorMessage, setErrorMessage] = useState('');
  const [labelStyle, inputStyle, cardStyle] = Styles();

  const loginHandler = async (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    const user = {
      email: enteredEmail,
      password: enteredPassword,
    };

    try {
      dispatch(setToken(user));
      navigate('/');
    } catch (error) {
      setErrorMessage('Invalid email and/ or password.');
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
