import PropTypes from 'prop-types';

export default PropTypes.shape({
  provider: PropTypes.string,
  uid: PropTypes.string,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  username: PropTypes.string,
  link: PropTypes.string,
  image: PropTypes.string,
  email: PropTypes.string,
  name: PropTypes.string,
});
