import React from 'react';
import classes from './Button.module.scss';

const Button = props => {
  const buttonclasses = [props.className, classes.Button];
  return (
    <button onClick={props.clicked} className={buttonclasses.join(' ')}>
      {props.title}
    </button>
  );
};

export default Button;
