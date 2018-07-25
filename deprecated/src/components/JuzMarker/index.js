import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Tooltip } from 'react-tippy';
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
  intl,
}) => {
  if (juzStart[chapterId] && juzStart[chapterId].includes(verseNumber)) {
    return (
      <div>
        <b
          id={`Juz-mark-${chapterId}-${verseNumber}`}
          key={`Juz-${juzNumber}`}
          className="col-xs-1"
        >
          <Tooltip
            arrow
            title={`${intl.formatMessage({
              id: 'juz.index.heading',
              defaultMessage: 'juz',
            })} ${juzNumber}`}
          >
            <Decoration juzNumber={juzNumber} />
          </Tooltip>
        </b>
        <StyledAyah className="col-xs-11">
          <span>{text}</span>
        </StyledAyah>
      </div>
    );
  }
  return <span>{text}</span>;
};

ShowAyahAndJuzMark.propTypes = {
  chapterId: PropTypes.number.isRequired,
  verseNumber: PropTypes.number.isRequired,
  juzNumber: PropTypes.number.isRequired,
  text: PropTypes.instanceOf(Array),
  intl: intlShape.isRequired,
};

export default injectIntl(ShowAyahAndJuzMark);
