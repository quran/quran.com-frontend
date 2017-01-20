import React, { PropTypes } from 'react';

import { surahType } from 'types';
import Loader from 'components/Loader';

const style = require('./style.scss');

const SurahInfo = ({ surah, isShowingSurahInfo, onClose }) => {
  // So we don't need to load images and files unless needed
  if (!isShowingSurahInfo) return <noscript />;
  if (!surah.info) {
    return <Loader />;
  }

  return (
    <div className={`col-xs-12 ${style.container} surah-info ${style.show}`}>
      <button
        tabIndex="-1"
        className={`${style.close} ss-delete`}
        onClick={() => onClose({ isShowingSurahInfo: !isShowingSurahInfo })}
      />
      <div className={`${style.row} row`}>
        <div
          className={`col-md-6 col-xs-6 ${style.bg} ${style[surah.revelation.place]}`}
        />
        <div className={`${style.list} col-md-1 col-xs-6`}>
          <dl>
            <dt>VERSES</dt>
            <dd className="text-uppercase">{surah.ayat}</dd>
            <dt>PAGES</dt>
            <dd className="text-uppercase">{surah.page.join('-')}</dd>
          </dl>
        </div>
        <div className={`${style.info} times-new col-md-8`}>
          <div dangerouslySetInnerHTML={{ __html: surah.info.description }} />
          <div>
            <p>
              <em>
                Source: {surah.info.contentSource}
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
  surah: surahType
};

export default SurahInfo;
