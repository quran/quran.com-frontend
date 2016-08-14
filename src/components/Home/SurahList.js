import React, { PropTypes } from 'react';
import debug from '../../helpers/debug';
import Link from 'react-router/lib/Link';
const styles = require('./style.scss');

function SurahList(props) {
  debug('component:Index', 'SurahList');

  return (
    <ul className="col-md-4 list-unstyled">
      {props.surahs.map((surah) => (
        <li className={`${styles.item}`} key={surah.id}>
          <Link to={`/${surah.id}`} className={`${styles.link} row`}>
            <div className="col-xs-2 text-muted">
              {surah.id}
            </div>
            <div className="col-xs-7">
              {surah.name.simple}
              <br />
              <span className={`text-uppercase ${styles.english}`}>{surah.name.english}</span>
            </div>
            <div className={`col-xs-3 text-right ${styles.arabic}`}>
              {surah.name.arabic}
            </div>
          </Link>
        </li>
      ))}
    </ul>);
}

SurahList.propTypes = {
  surahs: PropTypes.array.isRequired
};

export default SurahList;
