import React from 'react';

import classes from './Button.module.css';

// Reusable button
const Button = (props) => {
  return (
    <div className={props.buttonCenter}>
      <button
        type={props.type || 'button'}
        className={`${classes.button} ${props.className}`}
        onClick={props.onClick}
      >
        {props.children}
      </button>
    </div>
  );
};

export default Button;
