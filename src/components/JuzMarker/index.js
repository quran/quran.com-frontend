import React from 'react';
import PropTypes from 'prop-types';

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

const ShowJuzMarkAndAyah = ({ chapterId, verseNumber, text }) => {
  if (juzStart[chapterId] && juzStart[chapterId].includes(verseNumber)) {
    return (
      <div>
        <p>
          <b
            id={`Juz mark ${chapterId}-${verseNumber}`}
            className="p22 rub-el-hizb   pointer"
            title="juz mark"
          >
            ﭑ
          </b>
          {text}
        </p>
      </div>
    );
  }
  return <p>{text}</p>;
};

ShowJuzMarkAndAyah.propTypes = {
  chapterId: PropTypes.number.isRequired,
  verseNumber: PropTypes.number.isRequired,
  text: PropTypes.instanceOf(Array)
};

export default ShowJuzMarkAndAyah;
