import React, { PropTypes } from 'react';
import { ShareButtons, generateShareIcon } from 'react-share';
import { surahType } from 'types';

const styles = require('./style.scss');

const { FacebookShareButton, TwitterShareButton } = ShareButtons;
const FacebookIcon = generateShareIcon('facebook');
const TwitterIcon = generateShareIcon('twitter');

const Share = ({ chapter, ayahKey }) => {
  // Fallback to Surah Id
  const path = ayahKey ? ayahKey.replace(':', '/') : chapter.chapterNumber;
  const shareUrl = `https://quran.com/${path}`;
  const title = ayahKey ? `Surah ${chapter.nameSimple} [${ayahKey}]` : `Surah ${chapter.nameSimple}`;
  const iconProps = ayahKey ? { iconBgStyle: { fill: '#d1d0d0' } } : {};

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
  ayahKey: PropTypes.string,
  chapter: surahType.isRequired
};

export default Share;
