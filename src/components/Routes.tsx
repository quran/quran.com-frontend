import React from 'react';
import { Switch, Route } from 'react-router';

import routes from '../routes';
import NotFound from './NotFound';

const defaultSetContext = (context: any) => ({
  ...context,
  status: 200,
});

const Routes: React.SFC = () => (
  <Switch>
    {routes.map(({ component: Component, setContext, ...route }) => (
      <Route
        key={route.path}
        {...route}
        render={({ staticContext, ...routeProps }) => {
          if (staticContext) {
            const contextFunction = setContext || defaultSetContext;

            Object.assign(staticContext, contextFunction(staticContext));
          }

          return <Component {...routeProps} />;
        }}
      />
    ))}
    <Route component={NotFound} />
  </Switch>
);

export default Routes;
