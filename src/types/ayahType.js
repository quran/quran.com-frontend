import { PropTypes } from 'react';
import wordType from './wordType';

export default PropTypes.shape({
  ayahIndex: PropTypes.number.isRequired,
  surahId: PropTypes.number.isRequired,
  ayahNum: PropTypes.number.isRequired,
  pageNum: PropTypes.number.isRequired,
  juzNum: PropTypes.number.isRequired,
  hizbNum: PropTypes.number.isRequired,
  rubNum: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  ayahKey: PropTypes.string.isRequired,
  sajdah: PropTypes.bool,
  words: PropTypes.arrayOf(wordType).isRequired,
  textTashkeel: PropTypes.string.isRequired,
  content: PropTypes.array, // NOTE: In search, it is not required.
  audio: PropTypes.object // NOTE: In search, it is not required.
});
