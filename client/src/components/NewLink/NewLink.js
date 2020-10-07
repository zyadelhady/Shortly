import React from 'react';
import classes from './NewLink.module.scss';
import Button from '../Button/Button';

const NewLink = props => {
  const copy = require('clipboard-copy');

  const copyButton = () => {
    copy(props.newLink);
  };

  return (
    <div className={classes.NewLink}>
      <div className={classes.NewLinkRight}>
        <p className={classes.NewLinkOldLink}>{props.oldLink}</p>
      </div>
      <div className={classes.NewLinkLeft}>
        <p className={classes.NewLinkNewLink}>{props.newLink}</p>
        <Button
          title={'copy'}
          className={classes.NewLinkButton}
          clicked={copyButton}
        />
      </div>
    </div>
  );
};

export default NewLink;
