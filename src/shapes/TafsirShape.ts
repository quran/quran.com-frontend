import PropTypes from 'prop-types';

export default PropTypes.shape({
  id: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  verseKey: PropTypes.string.isRequired,
  verseId: PropTypes.number.isRequired,
  languageName: PropTypes.string.isRequired,
  resourceName: PropTypes.string.isRequired,
});
