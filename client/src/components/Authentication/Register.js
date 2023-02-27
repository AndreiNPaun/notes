import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import classes from './Form.module.css';
import Card from '../UI/Card';
import Button from '../UI/Button';
import Input from '../UI/Input';

const Register = () => {
  const navigate = useNavigate();

  const usernameInputRef = useRef();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  // store data in db
  const register = async (user) => {
    try {
      const response = await axios.post(
        'http://localhost:8000/api/register',
        user,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      console.log(response.data);
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
    <Card className={classes.form}>
      <form onSubmit={registerHandler}>
        <div className={classes.control}>
          <Input
            labelClassName={classes.label}
            inputClassName={classes.input}
            htmlFor="username"
            labelText="Username"
            id="username"
            ref={usernameInputRef}
          />
        </div>
        <div className={classes.control}>
          <Input
            labelClassName={classes.label}
            inputClassName={classes.input}
            htmlFor="email"
            labelText="Email"
            type="email"
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
            Register
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Register;
