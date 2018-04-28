import React from 'react';
import PropTypes from 'prop-types';
import { forbidExtraProps } from 'airbnb-prop-types';

const ComponentLoader = ({ isLoading, error, pastDelay }) => {
  if (isLoading) {
    return pastDelay ? <noscript /> : null;
  } else if (error) {
    return <div>Error! Component failed to load</div>;
  }

  return null;
};

ComponentLoader.propTypes = forbidExtraProps({
  isLoading: PropTypes.bool,
  error: PropTypes.any, // eslint-disable-line
  pastDelay: PropTypes.bool,
});

ComponentLoader.defaultProps = {
  error: null,
  isLoading: false,
  pastDelay: false,
};

export default ComponentLoader;
