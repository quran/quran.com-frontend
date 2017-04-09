import React from 'react';
import { ShareButtons, generateShareIcon } from 'react-share';
import { surahType, verseType } from 'types';

const styles = require('./style.scss');

const { FacebookShareButton, TwitterShareButton } = ShareButtons;
const FacebookIcon = generateShareIcon('facebook');
const TwitterIcon = generateShareIcon('twitter');

const Share = ({ chapter, verse }) => {
  // Fallback to Surah Id
  let path;
  if (verse) {
    const translations = (verse.translations || []).map(translation => translation.resourceId).join(',');
    path = `${verse.chapterId}/${verse.verseNumber}?translations=${translations}`;
  } else {
    path = chapter.chapterNumber;
  }

  const shareUrl = `https://quran.com/${path}`;
  const title = verse ? `Surah ${chapter.nameSimple} [${verse.verseKey}]` : `Surah ${chapter.nameSimple}`;
  const iconProps = verse ? { iconBgStyle: { fill: '#d1d0d0' } } : {};

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
  verse: verseType,
  chapter: surahType.isRequired
};

export default Share;
