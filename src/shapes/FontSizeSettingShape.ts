import PropTypes from 'prop-types';

const FontSizeSettingShape = PropTypes.shape({
  arabic: PropTypes.number.isRequired,
  translation: PropTypes.number.isRequired,
});

interface FontSizeSettingShape {
  arabic: number;
  translation: number;
}

export default FontSizeSettingShape;
