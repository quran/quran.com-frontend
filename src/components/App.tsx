import React, { Fragment } from 'react';
import { asyncComponent } from 'react-async-component';
import { metrics } from 'react-metrics';
import metricsConfig from '../metrics';
import Navbars from './Navbars';
import Routes from './Routes';
import Footer from './Footer';
import NoScript from './NoScript';
import AppHelmet from './AppHelmet';

const SmartBanner = asyncComponent({
  resolve: () => import(/* webpackChunkName: "SmartBanner" */ './SmartBanner'),
});

const App = () => (
  <Fragment>
    <AppHelmet />
    <Navbars />
    <SmartBanner title="The Noble Quran - القرآن الكريم" button="Install" />
    <NoScript />
    <Routes />
    <Footer />
  </Fragment>
);

export default metrics(metricsConfig)(App);
