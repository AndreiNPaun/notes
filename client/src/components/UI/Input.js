import React from 'react';

import classes from './Input.module.css';

// Come back
// reusable component for label and input
const Input = (props) => {
  return (
    <React.Fragment>
      <div className={props.control}>
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
      </div>
    </React.Fragment>
  );
};

export default Input;

// to use in case I revert back
{
  /* <Input
control={classes.control}
htmlFor="username"
labelText="Username"
type="text"
id="username"
ref={usernameInputRef}
/> */
}
