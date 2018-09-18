import React, { Fragment } from 'react';
import { asyncComponent } from 'react-async-component';
import { metrics } from 'react-metrics';
import cookie from "react-cookie";
import metricsConfig from '../metrics';
import Navbars from './Navbars';
import Routes from './Routes';
import Footer from './Footer';
import NoScript from './NoScript';
import AppHelmet from './AppHelmet';

const SmartBanner = asyncComponent({
  resolve: () => import(/* webpackChunkName: "SmartBanner" */ './SmartBanner'),
});

const App = () => {
  const { isNightMode } = cookie.load("options");
  if (__CLIENT__)
    if (isNightMode)
      document.body.classList.add('night-mode');

  return (
    <Fragment>
      <AppHelmet />
      <Navbars />
      <SmartBanner title="The Noble Quran - القرآن الكريم" button="Install" />
      <NoScript />
      <Routes />
      <Footer />
    </Fragment>
  )
};

export default metrics(metricsConfig)(App);
