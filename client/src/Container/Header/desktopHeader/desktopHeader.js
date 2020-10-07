import React from 'react';
import classes from './desktopHeader.module.scss';
import logo from '../../../assets/logo.svg';
import Button from '../../../components/Button/Button';

const DesktopHeader = () => {
  return (
    <div className={classes.TheHeader}>
      <div className={classes.TheHeaderLeft}>
        <div className="">
          <img className={classes.TheHeaderLeftLogo} src={logo} alt="logo" />
        </div>
        <a className={classes.TheHeaderItems} href="/">
          Features
        </a>
        <a className={classes.TheHeaderItems} href="/">
          Pricing
        </a>
        <a className={classes.TheHeaderItems} href="/">
          Resources
        </a>
      </div>
      <div className={classes.TheHeaderRight}>
        <a className={classes.TheHeaderItems} href="/">
          Login
        </a>
        <Button title={'Sign Up'} className={classes.TheHeaderRightButton} />
      </div>
    </div>
  );
};

export default DesktopHeader;
