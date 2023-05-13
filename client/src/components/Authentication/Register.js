import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Center } from '@chakra-ui/react';

import Card from '../UI/Card';
import Button from '../UI/Button';
import InputFields from '../UI/InputFields';
import Styles from '../UI/LoginRegiserFormStyles';

const Register = () => {
  const navigate = useNavigate();

  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const confirmPasswordInputRef = useRef();

  const [labelStyle, inputStyle, cardStyle] = Styles();

  // store data in db
  const register = async (user) => {
    try {
      await axios.post('http://localhost:8000/api/register', user, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // after for submission store input data in variables and then call the register function to create user account
  const registerHandler = (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    const enteredConfirmPassword = confirmPasswordInputRef.current.value;

    console.log(enteredConfirmPassword);

    if (enteredEmail.trim().length < 4 && enteredPassword.trim().length < 5) {
      throw new Error('get fked');
    }

    if (enteredConfirmPassword !== enteredPassword) {
      throw new Error('Passwords do not match.');
    }

    const user = {
      email: enteredEmail,
      password: enteredPassword,
      confirmPassword: enteredConfirmPassword,
    };

    register(user);

    emailInputRef.current.value = '';
    passwordInputRef.current.value = '';
    confirmPasswordInputRef.current.value = '';

    navigate('/login');
  };

  return (
    <Card cardStyle={cardStyle}>
      <form onSubmit={registerHandler}>
        <InputFields
          labelStyle={labelStyle}
          inputStyle={inputStyle}
          htmlFor="email"
          labelText="Email"
          type="text"
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

        <InputFields
          labelStyle={labelStyle}
          inputStyle={inputStyle}
          htmlFor="confirmPassport"
          labelText="Confirm Password"
          type="password"
          id="confirmPassport"
          ref={confirmPasswordInputRef}
        />
        <Center mt="1rem">
          <Button type="submit">Register</Button>
        </Center>
      </form>
    </Card>
  );
};

export default Register;
