import React, { PropTypes } from 'react';

import { surahType } from 'types';
import Loader from 'components/Loader';

const style = require('./style.scss');

const SurahInfo = ({ chapter, isShowingSurahInfo, onClose }) => {
  // So we don't need to load images and files unless needed
  if (!isShowingSurahInfo) return <noscript />;
  if (!chapter.info) {
    return <Loader />;
  }

  return (
    <div className={`col-xs-12 ${style.container} chapter-info ${style.show}`}>
      <button
        tabIndex="-1"
        className={`${style.close} ss-delete`}
        onClick={() => onClose({ isShowingSurahInfo: !isShowingSurahInfo })}
      />
      <div className={`${style.row} row`}>
        <div
          className={`col-md-3 col-xs-6 ${style.bg} ${style[chapter.revelationPlace]}`}
        />
        <div className={`${style.list} col-md-1 col-xs-6`}>
          <dl>
            <dt>VERSES</dt>
            <dd className="text-uppercase">{chapter.versesCount}</dd>
            <dt>PAGES</dt>
            <dd className="text-uppercase">{chapter.pages.join('-')}</dd>
          </dl>
        </div>
        <div className={`${style.info} ${chapter.info.languageName} ${style.info} times-new col-md-8`}>
          <div dangerouslySetInnerHTML={{ __html: chapter.info.text }} />
          <div>
            <p>
              <em>
                Source: {chapter.info.source}
              </em>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

SurahInfo.propTypes = {
  onClose: PropTypes.func,
  isShowingSurahInfo: PropTypes.bool,
  chapter: surahType
};

export default SurahInfo;
