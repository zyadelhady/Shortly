import React from 'react';
import classes from './Boost.module.scss';
import Button from '../../components/Button/Button';
import { Container } from '@material-ui/core';
const Boost = props => {
  return (
    <div className={classes.Boost}>
      <Container fixed>
        <h1>Boost your links today</h1>
        <Button title={'Get Started'} className={classes.BoostButton} />
      </Container>
    </div>
  );
};

export default Boost;
