import React from 'react';

import classes from './Input.module.css';

// reusable component for label and input
const Input = (props) => {
  return (
    <React.Fragment>
      <label className={classes.label} htmlFor={props.htmlFor}>
        {props.labelText}
      </label>
      <input
        className={classes.input}
        type={props.type}
        id={props.id}
        value={props.value}
        onChange={props.onChange}
      />
    </React.Fragment>
  );
};

export default Input;
