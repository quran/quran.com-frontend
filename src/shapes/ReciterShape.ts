import PropTypes from 'prop-types';

const ReciterShape = PropTypes.shape({
  id: PropTypes.number.isRequired,
  style: PropTypes.string.isRequired,
  reciterNameEng: PropTypes.string.isRequired,
});

interface ReciterShape {
  id: number;
  style: string;
  reciterNameEng: string;
}

export default ReciterShape;
