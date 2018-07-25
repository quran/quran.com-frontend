import { asyncComponent } from 'react-async-component';
import { matchPath } from 'react-router';

import Home from './containers/Home';

import {
  chaptersConnect,
  chapterInfoConnect,
  versesConnect,
  tafsirConnect,
  juzsConnect,
} from './containers/Chapter/connect';
import { search } from './redux/actions/search.js';
import validators from './utils/routeFilters';

const routes = [
  {
    path: '/',
    exact: true,
    component: Home,
    loadData: [chaptersConnect, juzsConnect],
  },
  {
    path: '/donations',
    component: asyncComponent({
      resolve: () =>
        import(/* webpackChunkName: "Donations" */ './containers/Donations'),
    }),
  },
  {
    path: '/contributions',
    component: asyncComponent({
      resolve: () =>
        import(/* webpackChunkName: "Donations" */ './containers/Donations'),
    }),
  },
  {
    path: '/about',
    component: asyncComponent({
      resolve: () =>
        import(/* webpackChunkName: "About" */ './containers/About'),
    }),
  },
  {
    path: '/contact',
    component: asyncComponent({
      resolve: () =>
        import(/* webpackChunkName: "Contact" */ './containers/Contact'),
    }),
  },
  {
    path: '/contactus',
    component: asyncComponent({
      resolve: () =>
        import(/* webpackChunkName: "Contact" */ './containers/Contact'),
    }),
  },
  {
    path: '/mobile',
    component: asyncComponent({
      resolve: () =>
        import(/* webpackChunkName: "Mobile" */ './containers/MobileLanding'),
    }),
  },
  {
    path: '/apps',
    component: asyncComponent({
      resolve: () =>
        import(/* webpackChunkName: "Mobile" */ './containers/MobileLanding'),
    }),
  },
  {
    path: '/error/:errorKey',
    component: asyncComponent({
      resolve: () =>
        import(/* webpackChunkName: "Error" */ './containers/Error'),
    }),
    setContext: context => ({
      ...context,
      status: 400,
    }),
  },
  {
    path: '/search',
    component: asyncComponent({
      resolve: () =>
        import(/* webpackChunkName: "Search" */ './containers/Search'),
    }),
    loadData: [
      ({ store: { dispatch }, location }) => {
        if (__CLIENT__) {
          dispatch(search(location.query || location.q));
          return false;
        }

        return dispatch(search(location.query || location.q));
      },
    ],
  },
  {
    path: '/ayatul-kursi',
    component: asyncComponent({
      resolve: () =>
        import(/* webpackChunkName: "AyatulKursi" */ './containers/AyatulKursi'),
    }),
    loadData: [
      chaptersConnect,
      ({ store }) =>
        versesConnect({
          store,
          params: {
            chapterId: '2',
            range: '255',
          },
        }),
    ],
  },
  {
    path: '/:chapterId/info/:language?',
    component: asyncComponent({
      resolve: () =>
        import(/* webpackChunkName: "ChapterInfo" */ './containers/ChapterInfo'),
    }),
    loadData: [chaptersConnect, chapterInfoConnect],
  },
  {
    path: '/:chapterId(\\d+)/:range/tafsirs/:tafsirId',
    component: asyncComponent({
      resolve: () =>
        import(/* webpackChunkName: "VerseTafsir" */ './containers/VerseTafsir'),
    }),
    loadData: [versesConnect, tafsirConnect],
  },
  {
    path: '/:chapterId(\\d+)/:range/:translations',
    component: asyncComponent({
      resolve: () =>
        import(/* webpackChunkName: "Chapter" */ './containers/Chapter'),
    }),
    loadData: [chaptersConnect, chapterInfoConnect, versesConnect],
    navbar: asyncComponent({
      resolve: () =>
        import(/* webpackChunkName: "GlobalNavChapter" */ './components/GlobalNav/Chapter'),
    }),
    onEnter: validators,
  },
  {
    path: '/:chapterId(\\d+)/:range?.pdf',
    component: asyncComponent({
      resolve: () => import(/* webpackChunkName: "Pdf" */ './containers/Pdf'),
    }),
    loadData: [chaptersConnect, versesConnect],
    footer: asyncComponent({
      resolve: () =>
        import(/* webpackChunkName: "PdfFooter" */ './components/Footer/PdfFooter'),
    }),
    onEnter: validators,
  },
  {
    path: '/:chapterId(\\d+)/:range?',
    component: asyncComponent({
      resolve: () =>
        import(/* webpackChunkName: "Chapter" */ './containers/Chapter'),
    }),
    loadData: [chaptersConnect, chapterInfoConnect, versesConnect],
    navbar: asyncComponent({
      resolve: () =>
        import(/* webpackChunkName: "GlobalNavChapter" */ './components/GlobalNav/Chapter'),
    }),
    onEnter: validators,
  },
  {
    path: '/:chapterId(\\d+)(:|-)?:range?',
    component: asyncComponent({
      resolve: () =>
        import(/* webpackChunkName: "Chapter" */ './containers/Chapter'),
    }),
    loadData: [chaptersConnect, chapterInfoConnect, versesConnect],
    navbar: asyncComponent({
      resolve: () =>
        import(/* webpackChunkName: "GlobalNavChapter" */ './components/GlobalNav/Chapter'),
    }),
    onEnter: validators,
  },
];

export const getMatchedRoute = url =>
  routes.find(route => matchPath(url, route));

export const checkOnEnterResult = url => {
  const matchedRoute = getMatchedRoute(url);
  const match = matchPath(url, matchedRoute);

  if (matchedRoute && matchedRoute.onEnter) {
    const result = matchedRoute.onEnter({
      match,
      params: match.params,
      location: {
        pathname: url,
      },
    });

    if (result) {
      return result;
    }
  }

  return null;
};

export const getPromises = (url, store) => {
  const matchedRoute = getMatchedRoute(url);
  const match = matchPath(url, matchedRoute);
  const promises = [];

  if (matchedRoute && matchedRoute.loadData) {
    matchedRoute.loadData.forEach(connector => {
      promises.push(
        connector({
          store,
          match,
          params: match.params,
          location: match.location,
        })
      );
    });
  }

  return promises;
};

export default routes;
