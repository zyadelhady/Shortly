import React from 'react';
import classes from './Main.module.scss';
import Button from '../../components/Button/Button';
import photo from '../../assets/illustration-working.svg';

const Main = props => {
  return (
    <div className={classes.Main}>
      <div className={classes.MainLeft}>
        <h3> More than just shorter links</h3>
        <p>
          Build your brand’s recognition and get detailed insights on how your
          links are performing.
        </p>
        <Button title={'Get Started'} className={classes.MainLeftButton} />
      </div>
      <div className={classes.MainRight}>
        <img
          className={classes.MainRightPhoto}
          src={photo}
          alt="working-illustration"
        />
      </div>
    </div>
  );
};

export default Main;
