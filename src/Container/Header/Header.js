import React from 'react';
import DesktopHeader from './desktopHeader/desktopHeader';
import classes from './Header.module.scss';
import MobileHeader from './mobileHeader/mobileHeader';
const Header = props => {
  return (
    <header>
      <div className={classes.Desktop}>
        <DesktopHeader />
      </div>
      <div className={classes.Mobile}>
        <MobileHeader />
      </div>
    </header>
  );
};

export default Header;
