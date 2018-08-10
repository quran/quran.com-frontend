import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { lighten } from 'polished';
import Loader from 'quran-components/lib/Loader';

import T, { KEYS } from './T';

import madinah from '../../static/images/madinah.jpg';
import makkah from '../../static/images/makkah.jpg';
import { SetSetting } from '../redux/actions/settings';
import { ChapterShape, ChapterInfoShape } from '../shapes';

const IMAGES: { madinah: string; makkah: string; [key: string]: string } = {
  madinah,
  makkah,
};

const List = styled.dl`
  padding-top: 8px;
  text-align: right;

  dt {
    font-size: 10px;
    font-weight: 500;
    padding-top: 25px;
    padding-bottom: 5px;
  }

  dd {
    color: $brand-primary;
    font-weight: 300;
  }
`;

const Close = styled.button`
  position: absolute;
  right: 15px;
  top: 15px;
  background: ${({ theme }) => lighten(0.1, theme.textMuted)};
  height: 26px;
  width: 26px;
  padding: 7px 8px;
  font-size: 10px;
  border-radius: 16px;
  color: #fff;
  z-index: 20;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
`;

const Info = styled.div`
  height: 100%;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  padding-top: 15px;
  padding-bottom: 15px;
  font-size: 16px;
  background: ${({ theme }) => lighten(0.1, theme.textMuted)};
  h2 {
    font-size: 22px;
    font-family: ${({ theme }) => theme.fonts.montserrat};
    font-weight: bold;
  }
  h3 {
    font-size: 20px;
    font-family: ${({ theme }) => theme.fonts.montserrat};
    font-weight: bold;
  }
  p {
    font-size: 16px;
  }
`;

const Container = styled.div`
  overflow-y: auto;
  margin-bottom: 30px;
  height: 0;
  max-height: 0;
  min-height: 0;
  transition: max-height 0.75s, height 0.75s;
  margin-top: -20px;
  max-height: 600px;
  max-height: 70vh;
  height: 1000px;
  padding: 0;

  @media (max-width: ${({ theme }) => theme.screen.sm}) {
    margin-bottom: 0;
  }
`;

const Image = styled.div<{ background: string }>`
  height: 100%;
  background-size: cover !important;
  background-position: center center;
  background-repeat: no-repeat;

  background: url(${({ background }) => IMAGES[background]});
  @media (max-width: ${({ theme }) => theme.screen.sm}) {
    height: 30%;
  }
`;

const ListContainer = styled.div`
  background: ${({ theme }) => theme.textMuted};
  height: 100%;

  @media (max-width: ${({ theme }) => theme.screen.sm}) {
    height: 30%;
  }
`;

const propTypes = {
  setSetting: PropTypes.func.isRequired,
  isShowingChapterInfo: PropTypes.bool.isRequired,
  chapter: ChapterShape,
  chapterInfo: ChapterInfoShape,
};

const defaultProps: { chapter: null; chapterInfo: null } = {
  chapter: null,
  chapterInfo: null,
};

type Props = {
  setSetting: SetSetting;
  chapter?: ChapterShape;
  chapterInfo?: ChapterInfoShape;
  isShowingChapterInfo: boolean;
};

const ChapterInfo: React.SFC<Props> = ({
  chapter,
  chapterInfo,
  isShowingChapterInfo,
  setSetting,
}: Props) => {
  // So we don't need to load images and files unless needed
  if (!isShowingChapterInfo) return null;
  if (!chapterInfo) return <Loader isActive />;

  const handleClose = () =>
    setSetting({ isShowingChapterInfo: !isShowingChapterInfo });

  return (
    <Container className="col-xs-12 chapter-info">
      {setSetting && <Close className="ss-delete" onClick={handleClose} />}
      <div className="row" style={{ width: '100%', height: '100%', margin: 0 }}>
        <Image
          className="col-md-3 col-xs-6"
          background={chapter.revelationPlace}
        />
        <ListContainer className="col-md-1 col-xs-6">
          <List>
            <dt>
              <T id={KEYS.CHAPTER_VERSES} />
            </dt>
            <dd className="text-uppercase">{chapter.versesCount}</dd>
            <dt>
              <T id={KEYS.CHAPTER_PAGES} />
            </dt>
            <dd className="text-uppercase">{chapter.pages.join('-')}</dd>
          </List>
        </ListContainer>
        <Info className={`${chapterInfo.languageName} times-new col-md-8`}>
          <div dangerouslySetInnerHTML={{ __html: chapterInfo.text }} />
          <div>
            <p>
              <em>Source: {chapterInfo.source}</em>
            </p>
          </div>
        </Info>
      </div>
    </Container>
  );
};

ChapterInfo.propTypes = propTypes;

ChapterInfo.defaultProps = defaultProps;

export default ChapterInfo;
