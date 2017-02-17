import { PropTypes } from 'react';
import wordType from './wordType';

export default PropTypes.shape({
  id: PropTypes.number.isRequired,
  chapterId: PropTypes.number.isRequired,
  pageNumber: PropTypes.number.isRequired,
  juzNumber: PropTypes.number.isRequired,
  hizbNumber: PropTypes.number.isRequired,
  rubNumber: PropTypes.number.isRequired,
  verseKey: PropTypes.string.isRequired,
  sajdah: PropTypes.bool,
  sajdahNumber: PropTypes.number,
  words: PropTypes.arrayOf(wordType).isRequired,
  textMadani: PropTypes.string.isRequired,
  textSimple: PropTypes.string.isRequired,
  translations: PropTypes.array, // NOTE: In search, it is not required.
  audio: PropTypes.object // NOTE: In search, it is not required.
});
