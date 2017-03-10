import { PropTypes } from 'react';
import wordType from './wordType';
import translationType from './translationType';

export default PropTypes.shape({
  id: PropTypes.number.isRequired,
  chapterId: PropTypes.number.isRequired,
  pageNumber: PropTypes.number.isRequired,
  juzNumber: PropTypes.number.isRequired,
  hizbNumber: PropTypes.number.isRequired,
  rubNumber: PropTypes.number.isRequired,
  verseKey: PropTypes.string.isRequired,
  sajdah: PropTypes.bool,
  words: PropTypes.arrayOf(wordType).isRequired,
  textMadani: PropTypes.string.isRequired,
  textSimple: PropTypes.string.isRequired,
  translations: PropTypes.arrayOf(translationType), // NOTE: In search, it is not required.
  audio: PropTypes.object // NOTE: In search, it is not required.
});
