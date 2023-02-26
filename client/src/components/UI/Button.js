import React from 'react';

import classes from './Button.module.css';

// Reusable button
const Button = (props) => {
  return (
    <button
      type={props.type || 'button'}
      className={
        props.className ||
        `${classes.button} ${props.className || ''} ${
          props.extraClassName || ''
        }`
      }
      onClick={props.onClick}
      onBlur={props.onBlur}
    >
      {props.children}
    </button>
  );
};

export default Button;
