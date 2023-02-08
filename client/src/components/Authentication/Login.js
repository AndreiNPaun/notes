import React from 'react';

import classes from './Form.module.css';
import Card from '../UI/Card';
import Input from '../UI/Input';
import Button from '../UI/Button';

const Login = () => {
  return (
    <Card className={classes.form}>
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
      <div className={classes.actions}>
        <Button type="submit">Login</Button>
      </div>
    </Card>
  );
};

export default Login;
