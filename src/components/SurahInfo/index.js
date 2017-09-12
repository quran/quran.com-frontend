import React from 'react';
import PropTypes from 'prop-types';
import * as customPropTypes from 'customPropTypes';
import Loader from 'quran-components/lib/Loader';

const style = require('./style.scss');

const SurahInfo = ({ chapter, chapterInfo, isShowingSurahInfo, onClose }) => {
  // So we don't need to load images and files unless needed
  if (!isShowingSurahInfo) return <noscript />;
  if (!chapterInfo) return <Loader isActive />;

  return (
    <div className={`col-xs-12 ${style.container} chapter-info ${style.show}`}>
      {onClose &&
        <button
          tabIndex="-1"
          className={`${style.close} ss-delete`}
          onClick={() => onClose({ isShowingSurahInfo: !isShowingSurahInfo })}
        />}
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
        <div
          className={`${style.info} ${chapterInfo.languageName} times-new col-md-8`}
        >
          <div dangerouslySetInnerHTML={{ __html: chapterInfo.text }} />
          <div>
            <p>
              <em>
                Source: {chapterInfo.source}
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
  chapter: customPropTypes.surahType,
  chapterInfo: customPropTypes.infoType
};

export default SurahInfo;
