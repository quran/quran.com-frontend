/* eslint-disable */
import Loadable from 'react-loadable';

import ComponentLoader from 'components/ComponentLoader';

// import checkValidChapterOrVerse from './utils/routeFilters';
import App from './containers/App';
// import Home from './containers/Home';

import surahRoute from './containers/Surah/route';
// import mobileLandingRoute from './containers/MobileLanding/route';
import donationsRoute from './containers/Donations/route';
// import pdfRoute from './containers/Pdf/route';
// import contactRoute from './containers/Contact/route';
// import ayatKursiRoute from './containers/AyatKursi/route';
// import chapterInfoRoute from './containers/ChapterInfo/route';
// import verseTafsirRoute from './containers/VerseTafsir/route';
import homeRoute from './containers/Home/route';
import searchRoute from './containers/Search/route';

export const routes = [
  ...homeRoute,
  ...donationsRoute,
  // ...ayatKursiRoute,
  // {
  //   path: '/about',
  //   component: Loadable({
  //     loader: () =>
  //       import(/* webpackChunkName: "about" */ './containers/About'),
  //     loading: ComponentLoader
  //   })
  // },
  // ...contactRoute,
  // ...mobileLandingRoute,
  // {
  //   path: '/error/:errorKey',
  //   component: Loadable({
  //     loader: () =>
  //       import(/* webpackChunkName: "error" */ './containers/Error'),
  //     loading: ComponentLoader
  //   })
  // },
  ...searchRoute,
  // {
  //   path: '/login',
  //   component: Loadable({
  //     loader: () =>
  //       import(/* webpackChunkName: "login" */ './containers/Login'),
  //     loading: ComponentLoader
  //   })
  // },

  // ...chapterInfoRoute,
  // ...verseTafsirRoute,
  ...surahRoute
  // ...pdfRoute,
];

export default () => {
  return [
    {
      component: App,
      // onEnter={shouldAuth}
      routes
    }
  ];
};

export const collectPromises = path => {
  const promises = [];

  routes.some(route => {
    // use `matchPath` here
    const match = matchPath(path, route);
    if (match && route.loadData) {
      promises.push(...route.loadData.map(loader => loader({ store, match })));
    }

    return match;
  });

  return promises;
};
