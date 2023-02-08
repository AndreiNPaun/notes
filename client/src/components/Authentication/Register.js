import React from 'react';

import classes from './Form.module.css';
import Card from '../UI/Card';
import Input from '../UI/Input';
import Button from '../UI/Button';

const Register = () => {
  return (
    <Card className={classes.form}>
      <div className={classes.control}>
        <Input
          htmlFor="username"
          labelText="Username"
          type="text"
          id="username"
        />
      </div>
      <div className={classes.control}>
        <Input htmlFor="email" labelText="Email" type="email" id="email" />
      </div>
      <div className={classes.control}>
        <Input
          htmlFor="password"
          labelText="Password"
          type="password"
          id="password"
        />
      </div>
      <div className={classes.control}>
        <Input
          htmlFor="repeat-password"
          labelText="Repeat Password"
          type="password"
          id="repeat-password"
        />
      </div>
      <div className={classes.actions}>
        <Button type="submit">Register</Button>
      </div>
    </Card>
  );
};

export default Register;
