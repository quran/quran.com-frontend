import React from 'react';
import { ShareButtons, generateShareIcon } from 'react-share';
import styled from 'styled-components';
import * as customPropTypes from 'customPropTypes';
import FbDefault from '../../../static/images/FB-grn.png';
import TwitterDefault from '../../../static/images/Twitter-grn.png';

const { FacebookShareButton, TwitterShareButton } = ShareButtons;
const FacebookIcon = generateShareIcon('facebook');
const TwitterIcon = generateShareIcon('twitter');

const Container = styled.div`
  position: relative;
  top: 7px;
  display: inline-block;

  .iconContainer {
    display: inline-block;

    &:last-child {
      padding-left: 5px;
    }

    &:hover {
      cursor: pointer;
    }
  }
`;

const FacebookButton = styled(FacebookShareButton)`
  background-image: url(${FbDefault});
  background-repeat: no-repeat;
  background-size: 12px;
  padding-top: 1px;
`;

const TwitterButton = styled(TwitterShareButton)`
  background-image: url(${TwitterDefault});
  background-repeat: no-repeat;
  background-size: 21px;
`;

const Share = ({ chapter, verse }) => {
  // Fallback to Surah Id
  let path;

  if (verse) {
    const translations = (verse.translations || [])
      .map(translation => translation.resourceId)
      .join(',');
    path = `${verse.chapterId}/${verse.verseNumber}?translations=${translations}`;
  } else {
    path = chapter.chapterNumber;
  }

  const shareUrl = `https://quran.com/${path}`;
  const title = verse
    ? `Surah ${chapter.nameSimple} [${verse.verseKey}]`
    : `Surah ${chapter.nameSimple}`;
  const iconProps = verse ? { iconBgStyle: { fill: '#d1d0d0' } } : {};

  return (
    <Container>
      <FacebookButton
        url={shareUrl}
        title={title}
        windowWidth={670}
        windowHeight={540}
      >
        <FacebookIcon size={24} round {...iconProps} />
      </FacebookButton>
      <TwitterButton url={shareUrl} title={title}>
        <TwitterIcon size={24} round {...iconProps} />
      </TwitterButton>
    </Container>
  );
};

Share.propTypes = {
  chapter: customPropTypes.surahType.isRequired,
  verse: customPropTypes.verseType
};

export default Share;
