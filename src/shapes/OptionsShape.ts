import PropTypes from 'prop-types';

const FontSizeShape = PropTypes.shape({
  arabic: PropTypes.number.isRequired,
  translation: PropTypes.number.isRequired,
}).isRequired;

const OptionsShape = PropTypes.shape({
  isReadingMode: PropTypes.bool.isRequired,
  isNightMode: PropTypes.bool.isRequired,
  isShowingChapterInfo: PropTypes.bool.isRequired,
  audio: PropTypes.number.isRequired,
  translations: PropTypes.arrayOf(PropTypes.number).isRequired,
  tooltip: PropTypes.oneOf(['translation', 'transliteration']),
  fontSize: FontSizeShape,
  userAgent: PropTypes.object,
  options: PropTypes.shape({
    recitations: PropTypes.arrayOf(PropTypes.number).isRequired,
    translations: PropTypes.arrayOf(PropTypes.number).isRequired,
  }).isRequired,
  loadingRecitations: PropTypes.bool.isRequired,
  loadingTranslations: PropTypes.bool.isRequired,
});

interface FontSizeShape {
  arabic: number;
  translation: number;
}

interface FetchedOptionShape {
  recitations: $TsFixMe;
  translations: $TsFixMe;
}

interface OptionsShape {
  isReadingMode: boolean;
  isNightMode: boolean;
  isShowingChapterInfo: boolean;
  audio: number;
  translations: Array<number>;
  tooltip: 'translation' | 'transliteration';
  fontSize: FontSizeShape;
  userAgent?: { [key: string]: string };
  options: FetchedOptionShape;
  loadingRecitations: boolean;
  loadingTranslations: boolean;
}

export default OptionsShape;
