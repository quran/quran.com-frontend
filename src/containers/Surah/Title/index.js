import React from 'react';
import Isvg from 'react-inlinesvg';
import { surahType } from 'types';

const styles = require('./style.scss');

const zeroPad = (num, places) => {
  const zero = (places - num.toString().length) + 1;

  return Array(+(zero > 0 && zero)).join('0') + num;
};

const Title = ({ surah }) => {
  const title = require(`../../../../static/images/titles/${zeroPad(chapter.chapterNumber, 3)}.svg`); // eslint-disable-line

  if (!surah) return <noscript />;

  return (
    <Isvg src={title}>
      <img
        src={title}
        className={styles.title}
        alt={`${surah.name.simple} (${surah.name.english}) - سورة ${surah.name.arabic}`}
      />
    </Isvg>
  );
};

Title.propTypes = {
  surah: surahType.isRequired
};

export default Title;
