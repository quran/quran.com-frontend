import { PropTypes } from 'react';

export default PropTypes.shape({
  words: PropTypes.objectOf(PropTypes.shape({
    startTime: PropTypes.string.isRequired,
    endTime: PropTypes.string.isRequired,
    duration: PropTypes.number.isRequired,
  })),
  intervals: PropTypes.arrayOf(
    PropTypes.arrayOf(() => true)
  )
});
