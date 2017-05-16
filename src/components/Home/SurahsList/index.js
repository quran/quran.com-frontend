import React, { PropTypes } from 'react';

import * as customPropTypes from 'customPropTypes';
import debug from 'helpers/debug';
import Link from 'react-router/lib/Link';

const styles = require('./style.scss');

const SurahsList = (props) => {
  const { urlPrefix, chapters } = props;

  debug('component:Index', 'SurahsList');

  return (
    <ul className="col-md-4 list-unstyled">
      {chapters.map(chapter => (
        <li className={`${styles.item}`} key={chapter.id}>
          <Link
            to={`${urlPrefix}/${chapter.id}`}
            className={`${styles.link} row`}
          >
            <div className="col-xs-2 text-muted">
              {chapter.chapterNumber}
            </div>
            <div className="col-xs-7">
              {chapter.nameSimple}
            </div>
            <div className={`col-xs-3 text-left ${styles.arabic}`}>
              <span className={`icon-surah${chapter.id}`} />
            </div>

            <div
              className={`col-xs-10 col-xs-offset-2 ${styles.translated_name}`}
            >
              <span
                className={`text-uppercase ${chapter.translatedName.languageName}`}
              >
                {chapter.translatedName.name}
              </span>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
};

SurahsList.propTypes = {
  chapters: customPropTypes.chapters.isRequired,
  urlPrefix: PropTypes.string
};

export default SurahsList;
