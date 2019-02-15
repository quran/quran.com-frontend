import React from 'react';
import { Switch, Route } from 'react-router';

import navbars from '../navbars';
import Navbar from '../containers/NavbarContainer';

const Navbars: React.SFC = () => (
  <Switch>
    {navbars.map(({ component: Component, ...route }: $TsFixMe) => (
      <Route key={route.path} {...route} component={Component} />
    ))}
    <Route component={Navbar} />
  </Switch>
);

export default Navbars;
