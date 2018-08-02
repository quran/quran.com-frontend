import PropTypes from 'prop-types';

const SegmentWord = PropTypes.shape({
  startTime: PropTypes.number.isRequired,
  endTime: PropTypes.number.isRequired,
  duration: PropTypes.number.isRequired,
});

const SegmentShape = PropTypes.shape({
  words: SegmentWord,
  intervals: PropTypes.oneOfType([PropTypes.array, PropTypes.object]), // TODO: This should be done a better way.
});

interface SegmentWord {
  startTime: number;
  endTime: number;
  duration: number;
}

interface SegmentShape {
  words: SegmentWord;
  intervals: $TsFixMe;
}

export default SegmentShape;
