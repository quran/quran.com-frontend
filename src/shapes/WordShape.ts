import PropTypes from 'prop-types';
import TranslationShape from './TranslationShape';
import TransliterationShape from './TransliterationShape';

const WordShape = PropTypes.shape({
  arabic: PropTypes.string,
  verseKey: PropTypes.string.isRequired,
  charType: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  code: PropTypes.string.isRequired,
  lineNumber: PropTypes.number.isRequired,
  pageNumber: PropTypes.number.isRequired,
  position: PropTypes.number.isRequired,
  translation: TranslationShape,
  transliteration: TransliterationShape,
  wordId: PropTypes.number,
  lineNum: PropTypes.number.isRequired,
  textMadani: PropTypes.string.isRequired,
  highlight: PropTypes.string,
});

interface WordShape {
  arabic?: string;
  verseKey: string;
  charType: string;
  className: string;
  code: string;
  lineNumber: number;
  lineNum: number;
  pageNumber: number;
  position: number;
  translation?: TranslationShape;
  transliteration?: TransliterationShape;
  wordId?: number;
  textMadani: string;
  highlight?: string;
  audio: $TsFixMe;
  [key: string]: $TsFixMe;
}

export default WordShape;
