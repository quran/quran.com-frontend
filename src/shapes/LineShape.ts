import PropTypes from 'prop-types';
import WordShape from './WordShape';

const LineShape = PropTypes.arrayOf(WordShape);

type LineShape = Array<WordShape>;

export default LineShape;
