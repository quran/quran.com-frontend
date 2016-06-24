import React, { PropTypes } from 'react';
import Link from 'react-router/lib/Link';

const styles = require('./style.scss');
const ornamentLeft = require('../../../../static/images/ornament-left.png');
const ornamentRight = require('../../../../static/images/ornament-right.png');

const zeroPad = (num, places) => {
  const zero = places - num.toString().length + 1;

  return Array(+(zero > 0 && zero)).join('0') + num;
};

const Title = ({ surah }) => {
  const title = require(`../../../../static/images/titles/${zeroPad(surah.id, 3)}.svg`); // eslint-disable-line global-require,max-len

  return (
    <div className={`row ${styles.container}`}>
      <div className="col-md-3 col-xs-1 surah-title">
        <img
          src={ornamentLeft}
          className="ornament hidden-xs hidden-sm"
          alt="Ornament left"
        />
        {
          surah.id >= 1 &&
            <Link
              data-metrics-event-name="Title:PreviousSurah"
              className="navbar-text previous-chapter"
              to={`/${surah.id - 1}`}
            >
              <i
                data-metrics-event-name="Title:PreviousSurah"
                className="ss-icon ss-navigateleft"
              />
              <span className="hidden-xs hidden-sm"> PREVIOUS SURAH</span>
            </Link>
        }
      </div>
      <div className="col-md-6 col-xs-6 surah-title text-center">
        {
          surah &&
            <img
              src={title}
              className="title hidden-xs"
              alt={`${surah.name.simple} (${surah.name.english}) - سورة ${surah.name.arabic}`}
            />
        }
        <br />
        {
          surah &&
            <p className="navbar-text text-uppercase surah-name">
              {surah.name.simple} ({surah.name.english}) - سورة {surah.name.arabic}
            </p>
        }
      </div>
      <div className="col-md-3 col-xs-1 surah-title text-right">
        {
          surah.id <= 114 &&
            <Link
              data-metrics-event-name="Title:NextSurah"
              className="navbar-text next-chapter"
              to={`/${surah.id + 1}`}
            >
              <span className="hidden-xs hidden-sm">NEXT SURAH </span>
              <i data-metrics-event-name="Title:NextSurah" className="ss-icon ss-navigateright" />
            </Link>
        }
        <img
          src={ornamentRight}
          className="ornament hidden-xs hidden-sm"
          alt="Ornament right"
        />
      </div>
    </div>
  );
};

Title.propTypes = {
  surah: PropTypes.object.isRequired
};

export default Title;
