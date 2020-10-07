import React, { useState } from 'react';
import classes from './mobileHeader.module.scss';
import logo from '../../../assets/logo.svg';
import Button from '../../../components/Button/Button';
import { fadeIn } from 'react-animations';
import Radium, { StyleRoot } from 'radium';

const MobileHeader = props => {
  const loginclasses = [classes.TheHeaderItems, classes.TheHeaderLoginItem];
  const [isClicked, setIsClicked] = useState(false);

  const styles = {
    fadeIn: {
      animation: 'x 1s',
      animationName: Radium.keyframes(fadeIn, 'fadeIn')
    }
  };

  const clickedButton = () => {
    setIsClicked(!isClicked);
  };

  let renderInfo = null;
  if (isClicked) {
    renderInfo = (
      <StyleRoot>
        <div className={classes.TheHeaderInfo} style={styles.fadeIn}>
          <a className={classes.TheHeaderItems} href="/">
            Features
          </a>
          <a className={classes.TheHeaderItems} href="/">
            Pricing
          </a>
          <a className={classes.TheHeaderItems} href="/">
            Resources
          </a>

          <a className={loginclasses.join(' ')} href="/">
            Login
          </a>
          <Button title={'Sign Up'} className={classes.TheHeaderButton} />
        </div>
      </StyleRoot>
    );
  }

  return (
    <div className={classes.TheHeader}>
      <div className={classes.TheHeaderNav}>
        <div className={classes.TheHeaderLogo}>
          <img className={classes.TheHeaderImage} src={logo} alt="logo" />
        </div>
        <div className={classes.theHeaderMenu}>
          <button className={classes.Button} onClick={clickedButton}>
            <i className="fas fa-bars fa-2x"></i>
          </button>
        </div>
      </div>
      {renderInfo}
    </div>
  );
};
export default MobileHeader;
