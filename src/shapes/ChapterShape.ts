import PropTypes from 'prop-types';

const ChapterShape = PropTypes.shape({
  id: PropTypes.number.isRequired,
  versesCount: PropTypes.number.isRequired,
  bismillahPre: PropTypes.bool.isRequired,
  revelationOrder: PropTypes.number.isRequired,
  revelationPlace: PropTypes.string.isRequired,
  pages: PropTypes.arrayOf(PropTypes.number).isRequired,
  nameComplex: PropTypes.string.isRequired,
  nameSimple: PropTypes.string.isRequired,
  nameArabic: PropTypes.string.isRequired,
  chapterNumber: PropTypes.number.isRequired,
});

interface ChapterShape {
  id: number;
  versesCount: number;
  bismillahPre: boolean;
  revelationOrder: number;
  revelationPlace: string;
  pages: Array<number>;
  nameComplex: string;
  nameSimple: string;
  nameArabic: string;
  chapterNumber: number;
  translatedName: $TsFixMe;
  languageName: $TsFixMe;
}

export default ChapterShape;
