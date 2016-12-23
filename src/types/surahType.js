import { PropTypes } from 'react';

export default {
  surahId: PropTypes.number.isRequired,
  ayat: PropTypes.number.isRequired,
  bismillahPre: PropTypes.bool.isRequired,
  revelationOrder: PropTypes.number.isRequired,
  revelationPlace: PropTypes.string.isRequired,
  page: PropTypes.array.isRequired,
  nameComplex: PropTypes.string.isRequired,
  nameSimple: PropTypes.string.isRequired,
  nameEnglish: PropTypes.string.isRequired,
  nameArabic: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  revelation: PropTypes.shape({
    order: PropTypes.number,
    place: PropTypes.string
  }).isRequired,
  id: PropTypes.number.isRequired,
};
