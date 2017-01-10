import { PropTypes } from 'react';

export default PropTypes.shape({
  words: PropTypes.objectOf(PropTypes.shape({
    startTime: PropTypes.number.isRequired,
    endTime: PropTypes.number.isRequired,
    duration: PropTypes.number.isRequired,
  })),
  intervals: PropTypes.any // TODO: This should be done a better way.
});
