import PropTypes from 'prop-types';
import WordShape from './WordShape';

export const SegmentShape = PropTypes.shape({
  words: PropTypes.arrayOf(WordShape),
  intervals: PropTypes.oneOfType([PropTypes.array, PropTypes.object]), // TODO: This should be done a better way.
});

interface SegmentShape {
  words: Array<WordShape>;
  intervals: $TsFixMe;
}

export default SegmentShape;
