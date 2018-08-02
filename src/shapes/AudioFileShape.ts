import PropTypes from 'prop-types';

const AudioFileShape = PropTypes.shape({
  duration: PropTypes.number.isRequired,
  format: PropTypes.string.isRequired,
  segments: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
  url: PropTypes.string.isRequired,
});

interface AudioFileShape {
  duration: number;
  format: string;
  segments: Array<Array<string>>;
  url: string;
}

export default AudioFileShape;
