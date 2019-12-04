import React from 'react';
import classes from './Advanded.module.scss';
import InputBox from '../InputBox/InputBox';
import { Container } from '@material-ui/core';
import Card from '../../components/Cards/Cards';
import brandRecognitionImg from '../../assets/icon-brand-recognition.svg';
import detailedRecordsImg from '../../assets/icon-detailed-records.svg';
import fullyCustomizableImg from '../../assets/icon-fully-customizable.svg';

const Advanced = props => {
  const brandRecognitionParagraph = `Boost your brand recognition with each click. Generic links don’t 
  mean a thing. Branded links help instil confidence in your content.`;
  const detailedRecordsParagraph = `Gain insights into who is clicking your links. Knowing when and where 
  people engage with your content helps inform better decisions.`;
  const fullyCustomizableParagraph = `Improve brand awareness and content discoverability through customizable 
  links, supercharging audience engagement.`;
  return (
    <div className={classes.Advanced}>
      <Container fixed>
        <div className="">
          <InputBox />
        </div>
        <div className={classes.AdvancedParagraph}>
          <h2>Advanced Statistics</h2>
          <p>
            Track how your links are performing across the web with our advanced
            statistics dashboard.
          </p>
        </div>
        <div className={classes.AdvancedCardContainer}>
          <Card
            class={classes.card1}
            title={'Brand Recognition'}
            photo={brandRecognitionImg}
            paragraph={brandRecognitionParagraph}
          />
          <Card
            class={classes.card2}
            title={'Detailed Records'}
            photo={detailedRecordsImg}
            paragraph={detailedRecordsParagraph}
          />
          <Card
            class={classes.card3}
            title={'Fully Customizable'}
            photo={fullyCustomizableImg}
            paragraph={fullyCustomizableParagraph}
          />
        </div>
        <div className={classes.AdvancedLineBox}>
          <hr className={classes.AdvancedLine}></hr>
        </div>
      </Container>
    </div>
  );
};

export default Advanced;
