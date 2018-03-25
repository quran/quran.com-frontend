import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { renderToString } from 'react-dom/server';
import bindTooltip from 'utils/bindTooltip';
import { intlShape, injectIntl } from 'react-intl';
import { juzStart, juzAndHizbArabicNum } from './markNumbers';

const juzMarkTop = require('../../../static/images/juzTopArt.svg');
const juzMarkBottom = require('../../../static/images/juzBottomArt.svg');

const StyledContainer = styled.div`
  padding: 0.05em;
  border: solid 1px #2CA4AB;
  width: 0.659em;
  margin-left: calc((100% - 0.659em) / 2);
  margin-top: 0.055em;
  margin-bottom: 0.055em;
}
`;

const StyledJuzArt = styled.img`
  height: 30px;
  width: 0.659em;
  margin-left: calc((100% - 0.659em) / 2);
  display: block;
`;

const StyledJuzNumber = styled.div`
  font-size: 10px;
  width: 100%;
  text-align: center;
  display: block;
`;

const StyledAyah = styled.div`
  margin-top: 3%;
`;

export const Decoration = ({ juzNumber }) => (
  // Show all the decoration in one component
  <div>
    <StyledJuzArt src={juzMarkTop} alt="juz top Art" />
    <StyledContainer>
      <StyledJuzNumber>جزء</StyledJuzNumber>
      <StyledJuzNumber>{juzAndHizbArabicNum[juzNumber]}</StyledJuzNumber>
      <StyledJuzNumber>حزب</StyledJuzNumber>
      <StyledJuzNumber>
        {juzAndHizbArabicNum[juzNumber * 2 - 1]}
      </StyledJuzNumber>
    </StyledContainer>
    <StyledJuzArt src={juzMarkBottom} alt="juz top Art" />
  </div>
);

Decoration.propTypes = {
  juzNumber: PropTypes.number.isRequired
};

export const ShowAyahAndJuzMark = ({
  chapterId,
  verseNumber,
  text,
  juzNumber,
  intl
}) => {
  if (juzStart[chapterId] && juzStart[chapterId].includes(verseNumber)) {
    return (
      <div>
        <b
          {...bindTooltip}
          id={`Juz-mark-${chapterId}-${verseNumber}`}
          key={`Juz-${juzNumber}`}
          className="col-xs-1 icon-juzMarker"
          title={`${intl.formatMessage({
            id: 'juz.index.heading',
            defaultMessage: 'juz'
          })} ${juzNumber}`}
          // Used dangerously... to prevent onhover staying even after onmouseOut
          dangerouslySetInnerHTML={{
            __html: renderToString(<Decoration juzNumber={juzNumber} />)
          }}
        />
        <StyledAyah className="col-xs-11">
          <p>{text}</p>
        </StyledAyah>
      </div>
    );
  }
  return <p>{text}</p>;
};

ShowAyahAndJuzMark.propTypes = {
  chapterId: PropTypes.number.isRequired,
  verseNumber: PropTypes.number.isRequired,
  juzNumber: PropTypes.number.isRequired,
  text: PropTypes.instanceOf(Array),
  intl: intlShape.isRequired
};

export default injectIntl(ShowAyahAndJuzMark);
