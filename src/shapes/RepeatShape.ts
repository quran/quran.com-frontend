import PropTypes from 'prop-types';

const RepeatShape = PropTypes.shape({
  from: PropTypes.number,
  to: PropTypes.number,
  times: PropTypes.number,
});

interface RepeatShape {
  from?: number;
  to?: number;
  times?: number;
}

export default RepeatShape;
