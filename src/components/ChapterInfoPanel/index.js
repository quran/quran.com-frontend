import React from 'react';
import PropTypes from 'prop-types';
import * as customPropTypes from 'customPropTypes';
import styled from 'styled-components';
import { lighten } from 'polished';
import Loader from 'quran-components/lib/Loader';

import LocaleFormattedMessage from 'components/LocaleFormattedMessage';

import madinah from '../../../static/images/madinah.jpg';
import makkah from '../../../static/images/makkah.jpg';

const images = {
  madinah,
  makkah
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
  background: ${props => lighten(0.1, props.theme.textMuted)};
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
  background: ${props => lighten(0.1, props.theme.textMuted)};
  h2 {
    font-size: 22px;
    font-family: ${props => props.theme.fonts.montserrat};
    font-weight: bold;
  }
  h3 {
    font-size: 20px;
    font-family: ${props => props.theme.fonts.montserrat};
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

  @media (max-width: ${props => props.theme.screen.sm}) {
    margin-bottom: 0;
  }
`;

const Image = styled.div`
  height: 100%;
  background-size: cover !important;
  background-position: center center;
  background-repeat: no-repeat;

  background: url(${props => images[props.background]});
  @media (max-width: ${props => props.theme.screen.sm}) {
    height: 30%;
  }
`;

const ListContainer = styled.div`
  background: ${props => props.theme.textMuted};
  height: 100%;

  @media (max-width: ${props => props.theme.screen.sm}) {
    height: 30%;
  }
`;

const SurahInfo = ({ chapter, chapterInfo, isShowingSurahInfo, setOption }) => {
  // So we don't need to load images and files unless needed
  if (!isShowingSurahInfo) return <noscript />;
  if (!chapterInfo) return <Loader isActive />;

  const handleClose = () =>
    setOption({ isShowingSurahInfo: !isShowingSurahInfo });

  return (
    <Container className="col-xs-12 chapter-info">
      {setOption && (
        <Close tabIndex="-1" className="ss-delete" onClick={handleClose} />
      )}
      <div className="row" style={{ width: '100%', height: '100%', margin: 0 }}>
        <Image
          className="col-md-3 col-xs-6"
          background={chapter.revelationPlace}
        />
        <ListContainer className="col-md-1 col-xs-6">
          <List>
            <dt>
              <LocaleFormattedMessage
                id="chapterInfo.verses"
                defaultMessage="VERSES"
              />
            </dt>
            <dd className="text-uppercase">{chapter.versesCount}</dd>
            <dt>
              <LocaleFormattedMessage
                id="chapterInfo.pages"
                defaultMessage="PAGES"
              />
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

SurahInfo.propTypes = {
  setOption: PropTypes.func.isRequired,
  isShowingSurahInfo: PropTypes.bool.isRequired,
  chapter: customPropTypes.surahType,
  chapterInfo: customPropTypes.infoType
};

export default SurahInfo;
