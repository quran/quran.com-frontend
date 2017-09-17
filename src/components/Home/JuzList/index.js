import React, { Component } from 'react';
import * as customPropTypes from 'customPropTypes';
import debug from 'helpers/debug';
import Link from 'react-router/lib/Link';

const styles = require('./styles.scss');

class JuzList extends Component {
  renderJuz(juz) {
    const { chapters } = this.props;
    const juzzChapters = Object.keys(juz.verseMapping);

    const list = juzzChapters.map(chapter => (
      <div className={`col-md-12 ${styles.translated_name}`}>
        <Link
          to={`/${chapter}/${juz.verseMapping[chapter]}`}
          className={`${styles.link} row`}
        >
          <div className="col-xs-9">
            <span className={styles.chapterName}>
              {chapters[chapter].nameSimple}
            </span>

            <span className="h5">
              <small>{juz.verseMapping[chapter]}</small>
            </span>
          </div>
          <div className={`col-xs-3 text-left ${styles.arabic}`}>
            <span className={`icon-surah${chapters[chapter].id}`} />
          </div>

          <div
            className={`col-xs-10 text-uppercase ${styles.translated_name} ${chapters[chapter].languageName}`}
          >
            <small>{chapters[chapter].translatedName.name}</small>
          </div>
        </Link>
      </div>
    ));

    return (
      <div className="col-md-10">
        <div className="row">
          {list}
        </div>
      </div>
    );
  }

  render() {
    debug('component:JuzList', 'render');
    const { juzs } = this.props;

    return (
      <ul className="col-md-4 list-unstyled">
        {juzs.map(juz => (
          <li className={`${styles.item} row`} key={juz.juzNumber}>
            <div className="col-xs-2 col-md-1 text-muted">
              {juz.juzNumber}
            </div>
            {this.renderJuz(juz)}
          </li>
        ))}
      </ul>
    );
  }
}

JuzList.propTypes = {
  chapters: customPropTypes.chapters.isRequired,
  juzs: customPropTypes.juzs.isRequired
};

export default JuzList;
