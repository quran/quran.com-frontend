import { PropTypes } from 'react';

export default PropTypes.shape({
  id: PropTypes.number.isRequired,
  versesCount: PropTypes.number.isRequired,
  bismillahPre: PropTypes.bool.isRequired,
  revelationOrder: PropTypes.number.isRequired,
  revelationPlace: PropTypes.string.isRequired,
  pages: PropTypes.arrayOf(PropTypes.number).isRequired,
  nameComplex: PropTypes.string.isRequired,
  nameSimple: PropTypes.string.isRequired,
  nameArabic: PropTypes.string.isRequired,
});
