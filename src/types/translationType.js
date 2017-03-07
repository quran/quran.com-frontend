import { PropTypes } from 'react';

export default PropTypes.shape({
  languageName: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  resourceName: PropTypes.string.isRequired
});
