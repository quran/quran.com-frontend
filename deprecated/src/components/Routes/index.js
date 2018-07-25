import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router';

import routes from '../../routes';
import NotFound from '../NotFound';
import routePromises from '../../utils/routePromises';

const defaultSetContext = context => ({
  ...context,
  status: 200
});

const Routes = ({ store }) => (
  <Switch>
    {routes.map(({ component: Component, loadData, setContext, ...route }) => (
      <Route
        key={route.path}
        {...route}
        render={({ staticContext, ...routeProps }) => {
          if (staticContext) {
            const contextFunction = setContext || defaultSetContext;

            Object.assign(staticContext, contextFunction(staticContext));
          }

          if (__CLIENT__) {
            routePromises({
              store,
              match: routeProps.match,
              loadData
            }).then(() => <Component {...routeProps} />);
          }

          return <Component {...routeProps} />;
        }}
      />
    ))}{' '}
    <Route component={NotFound} />
  </Switch>
);

Routes.propTypes = {
  store: PropTypes.object.isRequired // eslint-disable-line
};

export default Routes;
