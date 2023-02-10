import React, { useRef } from 'react';

import classes from './Form.module.css';
import Card from '../UI/Card';
import Button from '../UI/Button';

const Register = () => {
  const usernameInputRef = useRef();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  // store data in db
  const register = async (user) => {
    try {
      const response = await fetch('http://localhost:8000/api/register', {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // after for submission store input data in variables and then call the register function to create user account
  const registerHandler = () => {
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
  };

  return (
    <Card className={classes.form}>
      <form onSubmit={registerHandler}>
        <div className={classes.control}>
          <label htmlFor="username">Username</label>
          <input type="text" id="username" ref={usernameInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" ref={passwordInputRef} />
        </div>
        <Button type="submit" buttonCenter={classes.actions}>
          Register
        </Button>
      </form>
    </Card>
  );
};

export default Register;
