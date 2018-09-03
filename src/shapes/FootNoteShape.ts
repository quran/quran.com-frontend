import PropTypes from 'prop-types';

const FootNoteShape = PropTypes.shape({
  id: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  languageName: PropTypes.string.isRequired,
});

interface FootNoteShape {
  id: number;
  text: string;
  languageName: string;
}

export default FootNoteShape;
