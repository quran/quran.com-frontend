import React, { PropTypes } from 'react';
import { ShareButtons, generateShareIcon } from 'react-share';
import * as customPropTypes from 'customPropTypes';

const styles = require('./style.scss');

const { FacebookShareButton, TwitterShareButton } = ShareButtons;
const FacebookIcon = generateShareIcon('facebook');
const TwitterIcon = generateShareIcon('twitter');

const Share = ({ chapter, verseKey }) => {
  // Fallback to Surah Id
  const path = verseKey ? verseKey.replace(':', '/') : chapter.chapterNumber;
  const shareUrl = `https://quran.com/${path}`;
  const title = verseKey ? `Surah ${chapter.nameSimple} [${verseKey}]` : `Surah ${chapter.nameSimple}`;
  const iconProps = verseKey ? { iconBgStyle: { fill: '#d1d0d0' } } : {};

  return (
    <div className={`${styles.shareContainer}`}>
      <FacebookShareButton
        url={shareUrl}
        title={title}
        windowWidth={670}
        windowHeight={540}
        className={`${styles.iconContainer}`}
      >
        <FacebookIcon size={24} round {...iconProps} />
      </FacebookShareButton>
      <TwitterShareButton
        url={shareUrl}
        title={title}
        className={`${styles.iconContainer}`}
      >
        <TwitterIcon size={24} round {...iconProps} />
      </TwitterShareButton>
    </div>
  );
};

Share.propTypes = {
  verseKey: PropTypes.string,
  chapter: customPropTypes.surahType.isRequired
};

export default Share;
