import PropTypes from 'prop-types';
import FontSizeSettingShape from './FontSizeSettingShape';

const SettingsShape = PropTypes.shape({
  isReadingMode: PropTypes.bool.isRequired,
  isNightMode: PropTypes.bool.isRequired,
  isShowingChapterInfo: PropTypes.bool.isRequired,
  audio: PropTypes.number.isRequired,
  translations: PropTypes.arrayOf(PropTypes.number).isRequired,
  tooltip: PropTypes.oneOf(['translation', 'transliteration']),
  fontSize: FontSizeSettingShape.isRequired,
  userAgent: PropTypes.object,
  options: PropTypes.shape({
    recitations: PropTypes.arrayOf(PropTypes.number).isRequired,
    translations: PropTypes.arrayOf(PropTypes.number).isRequired,
  }).isRequired,
  loadingRecitations: PropTypes.bool.isRequired,
  loadingTranslations: PropTypes.bool.isRequired,
});

interface SettingsShape {
  isReadingMode: boolean;
  isNightMode: boolean;
  isShowingChapterInfo: boolean;
  audio: number;
  translations: Array<number>;
  tooltip: 'translation' | 'transliteration';
  fontSize: FontSizeSettingShape;
  userAgent?: { [key: string]: string };
}

export default SettingsShape;
