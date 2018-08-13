import PropTypes from 'prop-types';

const SuggestionShape = PropTypes.shape({
  ayah: PropTypes.string,
  href: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
});

interface SuggestionShape {
  ayah?: string;
  href: string;
  text: string;
}

export default SuggestionShape;
