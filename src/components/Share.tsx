import React from 'react';
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
} from 'react-share';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import { ChapterShape, VerseShape } from '../shapes';

const inlineStyle = css`
  display: inline-flex;
`;

const Container = styled.div<{ inline?: boolean }>`
  position: relative;
  top: 7px;
  display: block;

  ${prop => prop.inline && inlineStyle} .social-icon {
    &:hover {
      cursor: pointer;
      opacity: 0.8;
    }
  }
`;

const FacebookButton = styled(FacebookShareButton)`
  background-repeat: no-repeat;
  background-size: 12px;
  padding-top: 1px;
  display: inline-block;
  padding-right: 8px;
`;

const TwitterButton = styled(TwitterShareButton)`
  background-repeat: no-repeat;
  background-size: 21px;
  display: inline-block;
`;

type Props = {
  chapter: ChapterShape;
  verse?: VerseShape;
  inline?: boolean;
};

const Share: React.SFC<Props> = ({ chapter, verse, inline }: Props) => {
  // Fallback to Surah Id
  let path;

  if (verse) {
    const translations = (verse.translations || [])
      .map(translation => translation.resourceId)
      .join(',');
    path = `${verse.chapterId}/${
      verse.verseNumber
    }?translations=${translations}`;
  } else {
    path = chapter.chapterNumber;
  }

  const shareUrl = `https://quran.com/${path}`;
  const title = verse
    ? `Surah ${chapter.nameSimple} [${verse.verseKey}]`
    : `Surah ${chapter.nameSimple}`;
  const iconProps = verse ? { iconBgStyle: { fill: '#d1d0d0' } } : {};

  return (
    <Container inline={inline}>
      <FacebookButton
        url={shareUrl}
        quote={title}
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
  chapter: ChapterShape.isRequired,
  verse: VerseShape.isRequired,
  inline: PropTypes.bool,
};

Share.defaultProps = {
  inline: false,
};

export default Share;
