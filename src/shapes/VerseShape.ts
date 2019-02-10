import PropTypes from 'prop-types';
import WordShape from './WordShape';
import TranslationShape from './TranslationShape';

const VerseShape = PropTypes.shape({
  id: PropTypes.number.isRequired,
  verseNumber: PropTypes.number.isRequired,
  chapterId: PropTypes.number.isRequired,
  pageNumber: PropTypes.number.isRequired,
  juzNumber: PropTypes.number.isRequired,
  hizbNumber: PropTypes.number.isRequired,
  rubNumber: PropTypes.number.isRequired,
  verseKey: PropTypes.string.isRequired,
  sajdah: PropTypes.bool,
  words: PropTypes.arrayOf(WordShape).isRequired,
  textMadani: PropTypes.string.isRequired,
  textSimple: PropTypes.string.isRequired,
  translations: PropTypes.arrayOf(TranslationShape), // NOTE: In search, it is not required.
  audio: PropTypes.object, // NOTE: In search, it is not required.
});

interface VerseShape {
  id: number;
  verseNumber: number;
  chapterId: number | string;
  pageNumber: number;
  juzNumber: number;
  hizbNumber: number;
  rubNumber: number;
  verseKey: string;
  words: Array<WordShape>;
  textMadani: string;
  textSimple: string;
  sajdah?: boolean | null;
  translations?: Array<TranslationShape>;
  audio?: $TsFixMe;
}

export default VerseShape;
