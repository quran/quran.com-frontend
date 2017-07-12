import React from 'react';
import * as customPropTypes from 'customPropTypes';
import debug from 'helpers/debug';
import { Link } from 'react-router-dom';

const styles = require('./styles.scss');

const JuzList = ({ juzs, chapters }) => {
  const renderJuz = (juz) => {
    const juzzChapters = Object.keys(juz.verseMapping);

    const list = juzzChapters.map(chapter => (
      <div
        className={`col-xs-10 col-xs-offset-2 ${styles.translated_name}`}
        key={chapter}
      >
        <span className={'text-uppercase'}>
          {chapters[chapter - 1].nameSimple}
        </span>
        <span>
          <Link
            to={`/${chapter}/${juz.verseMapping[chapter]}`}
            className={`${styles.link} row`}
          >
            <small>{chapters[chapter].translatedName.name}</small>
          </Link>
        </span>
      </div>
    ));

    return list;
  };

  debug('component:JuzList', 'render');

  return (
    <ul className="col-md-4 list-unstyled">
      {juzs.map(juz => (
        <li className={`${styles.item}`} key={juz.juzNumber}>
          <div className="col-xs-2 text-muted">{juz.juzNumber}</div>
          <div className="col-xs-7">
            {juz.nameArabic}
            {juz.nameSimple}
          </div>
          {renderJuz(juz)}
        </li>
      ))}
    </ul>
  );
};

JuzList.propTypes = {
  chapters: customPropTypes.chapters.isRequired,
  juzs: customPropTypes.juzs.isRequired
};

export default JuzList;
