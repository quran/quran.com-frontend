import { PropTypes } from 'react';

export default PropTypes.shape({
  score: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  languageCode: PropTypes.string.isRequired,
  subType: PropTypes.string.isRequired,
  cardinalityType: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  resourceId: PropTypes.number.isRequired,
  description: PropTypes.string,
  language: PropTypes.shape({
    beta: PropTypes.bool,
    direction: PropTypes.string.isRequired,
    english: PropTypes.string.isRequired,
    esAnalyzerDefault: PropTypes.string,
    languageCode: PropTypes.string.isRequired,
    priority: PropTypes.number.isRequired,
    unicode: PropTypes.string,
  }).isRequired,
  sourceId: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
  authorId: PropTypes.number.isRequired,
  slug: PropTypes.string.isRequired,
  isAvailable: PropTypes.bool
});
