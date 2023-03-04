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

  const usernameInputRef = useRef();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

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

    const enteredUsername = usernameInputRef.current.value;
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    // Come back for validation
    // if (enteredUsername.trim().length === 0 && enteredEmail.trim().length < 4 && enteredPassword.trim().length < 5) {
    //   Error
    // }

    const user = {
      username: enteredUsername,
      email: enteredEmail,
      password: enteredPassword,
    };

    register(user);

    usernameInputRef.current.value = '';
    emailInputRef.current.value = '';
    passwordInputRef.current.value = '';

    navigate('/login');
  };

  return (
    <Card cardStyle={cardStyle}>
      <form onSubmit={registerHandler}>
        <InputFields
          labelStyle={labelStyle}
          inputStyle={inputStyle}
          htmlFor="username"
          labelText="Username"
          id="username"
          ref={usernameInputRef}
        />

        <InputFields
          labelStyle={labelStyle}
          inputStyle={inputStyle}
          htmlFor="email"
          labelText="Email"
          type="email"
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
          <Button type="submit">Register</Button>
        </Center>
      </form>
    </Card>
  );
};

export default Register;
