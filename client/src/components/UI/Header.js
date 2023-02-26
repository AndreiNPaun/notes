import React from 'react';

import Button from './Button';
import classes from './Header.module.css';

const Header = (props) => {
  return (
    <header className={classes.header}>
      <h1>Notes</h1>
      {props.token && (
        <Button extraClassName={classes.button} onClick={props.logout}>
          Logout
        </Button>
      )}
    </header>
  );
};

export default Header;
