import PropTypes from 'prop-types';

const JuzShape = PropTypes.shape({
  id: PropTypes.number.isRequired,
  juzNumber: PropTypes.number.isRequired,
  verseMapping: PropTypes.object.isRequired,
});

interface JuzShape {
  id: number;
  juzNumber: number;
  verseMapping: { [key: string]: string };
}

export default JuzShape;
