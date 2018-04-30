import PropTypes from 'prop-types';

export default PropTypes.shape({
  chapterId: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  source: PropTypes.string.isRequired,
  shortText: PropTypes.string.isRequired,
  languageName: PropTypes.string.isRequired,
});
