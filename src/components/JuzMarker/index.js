import React from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';
import Element from 'react-scroll/lib/components/Element';

const juzStart = {
  1: [1],
  2: [142, 253],
  3: [92],
  4: [24, 148],
  5: [82],
  6: [111],
  7: [88],
  8: [41],
  9: [93],
  11: [6],
  12: [53],
  15: [1],
  17: [1],
  18: [75],
  21: [1],
  23: [1],
  25: [22],
  27: [56],
  29: [46],
  33: [31],
  36: [28],
  39: [32],
  41: [47],
  46: [1],
  51: [31],
  58: [1],
  67: [1],
  78: [1]
};

const StyledJuzMark = styled(Element)`
  padding: 0em;
  float: right;
  /*width:20%;*/
`;

const ShowJuzMark = ({ chapterId, verseNumber }) => {
  if (juzStart[chapterId] && juzStart[chapterId].includes(verseNumber)) {
    return (
      <div>
        <StyledJuzMark
          id={`Juz mark ${chapterId}-${verseNumber}`}
          className="col-xs-1 text-right text-arabic p22 rub-el-hizb   pointer"
          title="juz mark"
        >
          ﭑ
        </StyledJuzMark>
      </div>
    );
  }
  return <div />;
};

ShowJuzMark.propTypes = {
  chapterId: PropTypes.number.isRequired,
  verseNumber: PropTypes.number.isRequired
};

export default ShowJuzMark;
