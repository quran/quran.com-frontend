import { PropTypes } from 'react';

export default PropTypes.shape({
  arabic: PropTypes.string,
  verseKey: PropTypes.string.isRequired,
  charType: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  code: PropTypes.string.isRequired,
  lineNumber: PropTypes.number.isRequired,
  pageNumber: PropTypes.number.isRequired,
  position: PropTypes.number.isRequired,
  translation: PropTypes.shape({
    languageName: PropTypes.string,
    text: PropTypes.string
  }),
  transliteration: PropTypes.shape({
    languageName: PropTypes.string,
    text: PropTypes.string
  }),
  wordId: PropTypes.number,
});
