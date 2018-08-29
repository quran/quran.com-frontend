import PropTypes from 'prop-types';

const TranslationShape = PropTypes.shape({
  id: PropTypes.number.isRequired,
  languageName: PropTypes.string,
  text: PropTypes.string,
  resourceName: PropTypes.string,
  resourceId: PropTypes.number.isRequired,
  authorName: PropTypes.string.isRequired,
});

interface TranslationShape {
  id: number;
  languageName?: string;
  text: string;
  resourceName?: string | null;
  resourceId: number;
  authorName?: string;
}

export default TranslationShape;
