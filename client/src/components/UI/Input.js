import React from 'react';

import classes from './Input.module.css';

// Come back
// reusable component for label and input
const Input = React.forwardRef((props, ref) => {
  return (
    <>
      <label
        className={`${classes.label} ${props.labelClassName}`}
        htmlFor={props.htmlFor}
      >
        {props.labelText}
      </label>
      <input
        className={`${classes.input} ${props.inputClassName}`}
        type={props.type || 'text'}
        id={props.id}
        value={props.value}
        onChange={props.onChange}
        ref={ref}
      />
    </>
  );
});

export default Input;
