import React, { useState } from 'react';
import classes from './InputBox.module.scss';
import Button from '../../components/Button/Button';
import NewLink from '../../components/NewLink/NewLink';
import { Container } from '@material-ui/core';
import axios from 'axios';
import uniqid, { process } from 'uniqid';

const LinkBox = (props) => {
  const mode = 'prod';

  const link =
    mode === 'dev'
      ? 'http://localhost:4000/api/v1/links/'
      : 'https://zyad-shortly.herokuapp.com/api/v1/links/';

  const [hashId, setHashID] = useState([]);
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const sendLink = () => {
    setIsLoading(true);
    setError(false);

    axios
      .post(link, { url })
      .then((response) => {
        const newId = response.data.data.results.slug;
        const url = response.data.data.results.url;
        setIsLoading(false);
        setError(false);

        setHashID((prev) => {
          return [...prev, { newId, url }];
        });
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
        setError(true);
      });

    setUrl('');
  };

  const renderNewLink = hashId.map((i) => {
    return (
      <NewLink
        key={uniqid()}
        oldLink={`${i.url}`}
        newLink={`${link}/${i.newId}`}
      />
    );
  });

  const getUrl = (e) => {
    const newUrl = e.target.value;
    setUrl(newUrl);
  };

  const inputClasses = [classes.LinkBoxInput, error ? classes.inputRed : null];
  return (
    <Container fixed>
      <div className={classes.LinkBox}>
        <div className={classes.InputBox}>
          <input
            onChange={(e) => getUrl(e)}
            value={url}
            placeholder="Example : https://www.google.com"
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
        {error ? <label className={classes.Label}>Invalid url</label> : null}
      </div>
      {renderNewLink}
    </Container>
  );
};

export default LinkBox;
