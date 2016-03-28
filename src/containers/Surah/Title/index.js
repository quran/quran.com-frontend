import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

const styles = require('./style.scss');

const zeroPad = (num, places) => {
  var zero = places - num.toString().length + 1;
  return Array(+(zero > 0 && zero)).join('0') + num;
};

const Title = ({ surah }) => {
  return (
    <div className={`row ${styles.container}`}>
      <div className="col-md-3 col-xs-1 surah-title">
        <img src="//quran-1f14.kxcdn.com/images/ornament-left.png" className="ornament hidden-xs hidden-sm" />
        {
          surah.id >= 1 &&
          <Link className="navbar-text previous-chapter" to={`/${surah.id - 1}`}>
            <i className="ss-icon ss-navigateleft"></i>
            <span className="hidden-xs hidden-sm"> PREVIOUS SURAH</span>
          </Link>
        }
      </div>
      <div className="col-md-6 col-xs-6 surah-title text-center">
        {
          surah &&
          <img src={'//quran-1f14.kxcdn.com/images/titles/' + zeroPad(surah.id, 3) + '.svg'} className="title" />
        }
        <br />
        {
          surah &&
          <p className="navbar-text text-uppercase surah-name">
            {surah.name.simple} ({surah.name.english})
          </p>
        }
      </div>
      <div className="col-md-3 col-xs-1 surah-title text-right">
        {
          surah.id <= 114 &&
          <Link className="navbar-text next-chapter" to={`/${surah.id + 1}`}>
            <span className="hidden-xs hidden-sm">NEXT SURAH </span>
            <i className="ss-icon ss-navigateright"></i>
          </Link>
        }
        <img src="//quran-1f14.kxcdn.com/images/ornament-right.png" className="ornament hidden-xs hidden-sm" />
      </div>
    </div>
  );
}


export default Title;
