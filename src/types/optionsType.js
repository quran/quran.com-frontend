import { PropTypes } from 'react';

export default PropTypes.shape({
  isReadingMode: PropTypes.bool,
  isShowingSurahInfo: PropTypes.bool,
  audio: PropTypes.number,
  quran: PropTypes.number,
  content: PropTypes.arrayOf(PropTypes.number),
  tooltip: PropTypes.string,
  fontSize: PropTypes.shape({
    arabic: PropTypes.number,
    translations: PropTypes.number
  }).isRequired
});
