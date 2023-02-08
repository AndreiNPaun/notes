import React from 'react';

import classes from './Header.module.css';

const Header = (props) => {
  return (
    <header className={classes.header}>
      <h1>Notes</h1>
      {props.token && <div onClick={props.logout}>Logout</div>}
    </header>
  );
};

export default Header;
