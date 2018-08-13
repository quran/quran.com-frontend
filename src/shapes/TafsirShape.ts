import PropTypes from 'prop-types';

const TafsirShape = PropTypes.shape({
  id: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  verseKey: PropTypes.string.isRequired,
  verseId: PropTypes.number.isRequired,
  languageName: PropTypes.string.isRequired,
  resourceName: PropTypes.string.isRequired,
});

interface TafsirShape {
  id: number;
  text: string;
  verseKey: string;
  verseId: number;
  languageName: string;
  resourceName: string;
}

export default TafsirShape;
