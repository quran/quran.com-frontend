import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router';

const propTypes = {
  code: PropTypes.number.isRequired,
  children: PropTypes.node.isRequired,
};

const Status = ({ code, children }) => (
  <Route
    render={({ staticContext }) => {
      if (staticContext) {
        // eslint-disable-next-line
        staticContext.status = code;
      }

      return children;
    }}
  />
);

Status.propTypes = propTypes;

export default Status;
