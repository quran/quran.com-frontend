import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { renderToString } from 'react-dom/server';
import bindTooltip from 'utils/bindTooltip';
import { intlShape, injectIntl } from 'react-intl';
import { juzStart } from './markNumbers';
import Decoration from './decoration';

const StyledAyah = styled.div`
  margin-top: 3%;
`;

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
          dangerouslySetInnerHTML={{
            /* Used dangerously... to prevent onhover staying even after onmouseOut */
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
