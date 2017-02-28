import { PropTypes } from 'react';

export default PropTypes.shape({
  versesCount: PropTypes.number.isRequired,
  bismillahPre: PropTypes.bool.isRequired,
  revelationOrder: PropTypes.number.isRequired,
  revelationPlace: PropTypes.string.isRequired,
  pages: PropTypes.array.isRequired,
  id: PropTypes.number.isRequired,
});

