import React, { useState } from 'react';
import classes from './InputBox.module.scss';
import Button from '../../components/Button/Button';
import NewLink from '../../components/NewLink/NewLink';
import { Container } from '@material-ui/core';
import axios from 'axios';
import uniqid from 'uniqid';

const LinkBox = props => {
  const [hashId, setHashID] = useState([]);
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const sendLink = () => {
    setIsLoading(true);
    setError(false);

    axios
      .post('https://rel.ink/api/links/', {
        url: url
      })
      .then(response => {
        const newId = response.data.hashid;
        const url = response.data.url;
        setIsLoading(false);
        setError(false);

        setHashID(prev => {
          return [...prev, { newId, url }];
        });
      })
      .catch(error => {
        console.log(error);
        setIsLoading(false);
        setError(true);
      });

    setUrl('');
  };

  // useEffect(() => {
  //   sendLink();
  // }, []);

  // setTimeout(() => {
  //   console.log(hashId);
  // }, 2000);

  const renderNewLink = hashId.map(i => {
    return (
      <NewLink
        key={uniqid()}
        oldLink={`${i.url}`}
        newLink={`https://rel.link.com/${i.newId}`}
      />
    );
  });

  const getUrl = e => {
    const newUrl = e.target.value;
    setUrl(newUrl);
  };

  const inputClasses = [classes.LinkBoxInput, error ? classes.inputRed : null];
  return (
    <Container fixed>
      <div className={classes.LinkBox}>
        <div className={classes.InputBox}>
          <input
            onChange={e => getUrl(e)}
            value={url}
            placeholder=" Shorten a Link here..."
            type="text"
            className={inputClasses.join(' ')}
          />
          {isLoading ? (
            <Button
              title={'Shrinking..:")'}
              className={classes.LinkBoxButton}
            />
          ) : (
            <Button
              clicked={sendLink}
              title={'Shorten It!'}
              className={classes.LinkBoxButton}
            />
          )}
        </div>
        {error ? (
          <label className={classes.Label}>Please add a link</label>
        ) : null}
      </div>
      {renderNewLink}
    </Container>
  );
};

export default LinkBox;
