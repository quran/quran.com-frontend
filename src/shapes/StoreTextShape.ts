import PropTypes from 'prop-types';

const StoreTextShape = PropTypes.shape({
  ios: PropTypes.string.isRequired,
  android: PropTypes.string.isRequired,
  windows: PropTypes.string.isRequired,
  kindle: PropTypes.string.isRequired,
});

interface StoreTextShape {
  ios: string;
  android: string;
  windows: string;
  kindle: string;
}

export default StoreTextShape;
