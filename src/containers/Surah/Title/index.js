import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

const styles = require('./style.scss');
const ornamentLeft = require('../../../../static/images/ornament-left.png');
const ornamentRight = require('../../../../static/images/ornament-right.png');

const zeroPad = (num, places) => {
  var zero = places - num.toString().length + 1;
  return Array(+(zero > 0 && zero)).join('0') + num;
};

const Title = ({ surah }) => {
  const title = require('../../../../static/images/titles/' + zeroPad(surah.id, 3) + '.svg');

  return (
    <div className={`row ${styles.container}`}>
      <div className="col-md-3 col-xs-1 surah-title">
        <img src={ornamentLeft} className="ornament hidden-xs hidden-sm" />
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
          <img src={title} className="title" />
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
        <img src={ornamentRight} className="ornament hidden-xs hidden-sm" />
      </div>
    </div>
  );
}


export default Title;
