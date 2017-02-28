import { PropTypes } from 'react';

export default PropTypes.shape({
  textMadani: PropTypes.string,
  textIndopak: PropTypes.string,
  textSimple: PropTypes.string,
  verseKey: PropTypes.string.isRequired,
  charType: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  code: PropTypes.string.isRequired,
  lineNumber: PropTypes.number.isRequired,
  position: PropTypes.number.isRequired,
  translation: PropTypes.object,
  transliteration: PropTypes.object,
  audio: PropTypes.object,
  id: PropTypes.number,
});
