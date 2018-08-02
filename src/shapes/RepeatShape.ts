import PropTypes from 'prop-types';

const RepeatShape = PropTypes.shape({
  from: PropTypes.number,
  to: PropTypes.number,
  time: PropTypes.number,
});

interface RepeatShape {
  from?: number;
  to?: number;
  time?: number;
}

export default RepeatShape;
