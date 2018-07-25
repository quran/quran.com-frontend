import PropTypes from 'prop-types';

const TransliterationShape = PropTypes.shape({
  languageName: PropTypes.string,
  text: PropTypes.string,
});

interface TransliterationShape {
  languageName?: string;
  text?: string;
}

export default TransliterationShape;
