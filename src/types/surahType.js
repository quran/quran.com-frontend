import { PropTypes } from 'react';

export default PropTypes.shape({
  id: PropTypes.number.isRequired,
  ayat: PropTypes.number.isRequired,
  bismillahPre: PropTypes.bool.isRequired,
  revelationOrder: PropTypes.number.isRequired,
  revelationPlace: PropTypes.string.isRequired,
  page: PropTypes.array.isRequired,
  name: PropTypes.shape({
    complex: PropTypes.string.isRequired,
    simple: PropTypes.string.isRequired,
    english: PropTypes.string.isRequired,
    arabic: PropTypes.string.isRequired,
  }).isRequired,
  revelation: PropTypes.shape({
    order: PropTypes.number,
    place: PropTypes.string
  }).isRequired,
  id: PropTypes.number.isRequired,
});
