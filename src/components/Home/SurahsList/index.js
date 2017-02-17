import React, { PropTypes } from 'react';
import debug from 'helpers/debug';
import Link from 'react-router/lib/Link';

import { surahType } from 'types';

const styles = require('./style.scss');

const SurahsList = (props) => {
  debug('component:Index', 'SurahsList');

  return (
    <ul className="col-md-4 list-unstyled">
      {props.chapters.map(chapter => (
        <li className={`${styles.item}`} key={chapter.id}>
          <Link to={`/${chapter.id}`} className={`${styles.link} row`}>
            <div className="col-xs-2 text-muted">
              {chapter.chapterNumber}
            </div>
            <div className="col-xs-7">
              سورة {chapter.nameArabic}

              {/*
              {chapter.nameSimple}
              <br />
              <span className={`text-uppercase ${styles.english}`}>{chapter.translatedName.name}</span>
              */}
            </div>

            <div className={`col-xs-3 text-left ${styles.arabic}`}>
              <span className={`icon-surah${chapter.id}`}/>
            </div>

            <div className={`col-md-12 col-md-push-2 ${styles.translated_name}`}>
              <span className={`text-uppercase ${chapter.translatedName.languageName}`}>
                {chapter.translatedName.name}
              </span>
            </div>
          </Link>
        </li>
      ))}
    </ul>);
};

SurahsList.propTypes = {
  chapters: PropTypes.arrayOf(surahType).isRequired
};

export default SurahsList;
