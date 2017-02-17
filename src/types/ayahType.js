import { PropTypes } from 'react';
import wordType from './wordType';

export default PropTypes.shape({
  chapterId: PropTypes.number.isRequired,
  verseNumber: PropTypes.number.isRequired,
  pageNumber: PropTypes.number.isRequired,
  juzNumber: PropTypes.number.isRequired,
  hizbNumber: PropTypes.number.isRequired,
  rubNumber: PropTypes.number.isRequired,
  textMadani: PropTypes.string.isRequired,
  verseKey: PropTypes.string.isRequired,
  sajdah: PropTypes.bool,
  sajdahNumber: PropTypes.number,
  words: PropTypes.arrayOf(wordType).isRequired,
  translations: PropTypes.array, // NOTE: In search, it is not required.
  audio: PropTypes.object // NOTE: In search, it is not required.
});
