import React from 'react';
import classes from './Cards.module.scss';

const Card = props => {
  const CardClasses = [classes.Card, props.class];
  return (
    <div className={CardClasses.join(' ')}>
      <img src={props.photo} alt="titlePhoto" className={classes.CardPhoto} />
      <h1>{props.title}</h1>
      <p>{props.paragraph}</p>
    </div>
  );
};

export default Card;
