import { PropTypes } from 'react';

export default PropTypes.shape({
  id: PropTypes.string.isRequired,
  ayahKey: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  updatedAt: PropTypes.string.isRequired,
});
