import React from 'react';
import loadable from 'loadable-components';

// import checkValidChapterOrVerse from './utils/routeFilters';
import App from './containers/App';

import surahRoute from './containers/Surah/route';
import mobileLandingRoute from './containers/MobileLanding/route';
import donationsRoute from './containers/Donations/route';
import pdfRoute from './containers/Pdf/route';
import contactRoute from './containers/Contact/route';
import ayatulKursiRoute from './containers/AyatulKursi/route';
import chapterInfoRoute from './containers/ChapterInfo/route';
import verseTafsirRoute from './containers/VerseTafsir/route';
import homeRoute from './containers/Home/route';
import searchRoute from './containers/Search/route';

export const routes = [
  ...homeRoute,
  ...donationsRoute,
  ...ayatulKursiRoute,
  ...searchRoute,
  {
    path: '/about',
    component: loadable(() =>
      import(/* webpackChunkName: "about" */ './containers/About')
    )
  },
  ...contactRoute,
  ...mobileLandingRoute,
  {
    path: '/error/:errorKey',
    component: loadable(() =>
      import(/* webpackChunkName: "error" */ './containers/Error')
    )
  },
  {
    path: '/login',
    component: loadable(() =>
      import(/* webpackChunkName: "login" */ './containers/Login')
    )
  },

  ...chapterInfoRoute,
  ...verseTafsirRoute,
  ...surahRoute,
  ...pdfRoute
];

export const navs = [
  ...surahRoute.map(route => ({
    ...route,
    component: () => <noscript />
  })),
  {
    component: loadable(() =>
      import(/* webpackChunkName: "login" */ './components/GlobalNav')
    ),
    isStatic: true
  }
];

export default () => [
  {
    component: App,
    // onEnter={shouldAuth}
    routes
  }
];
