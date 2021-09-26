import classes from './Noun.module.css';
import React from 'react';
import loadingNoun from '../../assets/loading-skull-noun.gif';
import Image from 'react-bootstrap/Image';

export const LoadingNoun = () => {
  return <Image className={classes.img} src={loadingNoun} alt={'loading noun'} fluid />;
};

export const NounCircleImg: React.FC<{ imgPath: string; alt: string; isCircle: boolean}> = props => {
  const { imgPath, alt, isCircle} = props;
  if (isCircle) {
    return <Image className={classes.img} src={imgPath ? imgPath : loadingNoun} alt={alt} fluid roundedCircle />;
  }
  return <Image className={classes.img} src={imgPath ? imgPath : loadingNoun} alt={alt} fluid />;
}; 

const Noun: React.FC<{ imgPath: string; alt: string }> = props => {
  const { imgPath, alt } = props;
  return <Image className={classes.img} src={imgPath ? imgPath : loadingNoun} alt={alt} fluid roundedCircle />;
};

export default Noun;
