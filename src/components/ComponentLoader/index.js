import React from 'react';

const ComponentLoader = ({ isLoading, error, pastDelay }) => {
  if (isLoading) {
    return pastDelay ? <div>Loading...</div> : null;
  } else if (error) {
    return <div>Error! Component failed to load</div>;
  }

  return null;
};

export default ComponentLoader;
