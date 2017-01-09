import { PropTypes } from 'react';

export default PropTypes.shape({
  arabic: PropTypes.string,
  ayahKey: PropTypes.string.isRequired,
  charTypeId: PropTypes.number.isRequired,
  className: PropTypes.string.isRequired,
  code: PropTypes.string.isRequired,
  codeDec: PropTypes.number.isRequired,
  codeHex: PropTypes.string.isRequired,
  lineNum: PropTypes.number.isRequired,
  pageNum: PropTypes.number.isRequired,
  position: PropTypes.number.isRequired,
  resourceId: PropTypes.number.isRequired,
  translation: PropTypes.string,
  transliteration: PropTypes.string,
  wordId: PropTypes.number,
});
