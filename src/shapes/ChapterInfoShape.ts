import PropTypes from 'prop-types';

const ChapterInfoShape = PropTypes.shape({
  chapterId: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  source: PropTypes.string.isRequired,
  shortText: PropTypes.string.isRequired,
  languageName: PropTypes.string.isRequired,
});

interface ChapterInfoShape {
  chapterId: number;
  text: string;
  source: string;
  shortText: string;
  languageName: string;
}

export default ChapterInfoShape;
