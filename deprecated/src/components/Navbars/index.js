import React from 'react';
import PropTypes from 'prop-types';
import { asyncComponent } from 'react-async-component';

import { Switch, Route } from 'react-router';

import routes from '../../routes';

const GlobalNav = asyncComponent({
  resolve: () =>
    import(/* webpackChunkName: "GlobalNav" */ 'components/GlobalNav'),
});

// eslint-disable-next-line no-unused-vars
const Navbars = ({ match, ...props }) => (
  <Switch>
    {' '}
    {routes
      .filter(route => route.navbar)
      // eslint-disable-next-line no-unused-vars
      .map(({ navbar: Navbar, component, ...route }) => (
        <Route
          key={route.path}
          {...route}
          render={routeProps => <Navbar {...routeProps} {...props} />}
        />
      ))}{' '}
    <Route
      render={routeProps => <GlobalNav {...routeProps} {...props} isStatic />}
    />{' '}
  </Switch>
);

Navbars.propTypes = {
  // eslint-disable-next-line
  match: PropTypes.object,
};

export default Navbars;
