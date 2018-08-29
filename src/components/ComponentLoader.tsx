import React from 'react';
import PropTypes from 'prop-types';

type Props = {
  isLoading: boolean;
  error: any;
  pastDelay: boolean;
};

const ComponentLoader: React.SFC<Props> = ({
  isLoading,
  error,
  pastDelay,
}: Props) => {
  if (isLoading) {
    return pastDelay ? <noscript /> : null;
  }
  if (error) {
    // TODO: Translation
    return <div>Error! Component failed to load</div>;
  }

  return null;
};

ComponentLoader.propTypes = {
  isLoading: PropTypes.bool,
  error: PropTypes.any, // eslint-disable-line
  pastDelay: PropTypes.bool,
};

ComponentLoader.defaultProps = {
  error: null,
  isLoading: false,
  pastDelay: false,
};

export default ComponentLoader;
