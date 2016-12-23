import React, { PropTypes } from 'react';
import debug from 'helpers/debug';
import Link from 'react-router/lib/Link';

const styles = require('./style.scss');

const LastVisit = (props) => {
  debug('component:Index', 'LastVisit');

  const { lastVisit, surahs } = props;

  if (lastVisit) {
    const surah = surahs[lastVisit.surah - 1];

    if (surah) {
      const lastVisitedAyah = parseInt(lastVisit.ayah, 10);

      return (
        <div className="col-md-10 col-md-offset-1">
          <div className={`row ${styles.lastVisit}`}>
            <div className="col-md-4">
              <h4 className={`text-muted text-center ${styles.title}`}>LAST VISITED:</h4>
            </div>
            <ul className="col-md-4 list-unstyled">
              <li className={`row ${styles.link}`}>
                <Link
                  to={`/${this.props.lastVisit.surah}/${lastVisitedAyah}-${lastVisitedAyah + 10}`}
                >
                  <div className="col-xs-2 text-muted">
                    {surah.id}:{this.props.lastVisit.ayah}
                  </div>
                  <div className="col-xs-7">
                    {surah.name.simple}
                    <br />
                    <span className={`text-uppercase ${styles.english}`}>
                      {surah.name.english}
                    </span>
                  </div>
                  <div className={`col-xs-3 text-right ${styles.arabic}`}>
                    {surah.name.arabic}
                  </div>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      );
    }
  }

  return false;
};

LastVisit.propTypes = {
  lastVisit: PropTypes.any,
  surahs: PropTypes.object
};

export default LastVisit;
