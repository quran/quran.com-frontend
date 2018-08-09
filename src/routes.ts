import { asyncComponent } from 'react-async-component';
import HomeContainer from './containers/HomeContainer';
import { PATHS, CHAPTER_PATHS } from './constants/router';
import ChapterRoute from './components/ChapterRoute';

const routes = [
  {
    path: PATHS.HOME,
    exact: true,
    component: HomeContainer,
  },
  {
    path: PATHS.DONATIONS,
    component: asyncComponent({
      resolve: () =>
        import(/* webpackChunkName: "Donations" */ './components/Donations'),
    }),
  },
  {
    path: PATHS.CONTRIBUTIONS,
    component: asyncComponent({
      resolve: () =>
        import(/* webpackChunkName: "Donations" */ './components/Donations'),
    }),
  },
  {
    path: PATHS.ABOUT,
    component: asyncComponent({
      resolve: () =>
        import(/* webpackChunkName: "About" */ './components/About'),
    }),
  },
  {
    path: PATHS.CONTACT,
    component: asyncComponent({
      resolve: () =>
        import(/* webpackChunkName: "Contact" */ './components/Contact'),
    }),
  },
  {
    path: PATHS.CONTACTUS,
    component: asyncComponent({
      resolve: () =>
        import(/* webpackChunkName: "Contact" */ './components/Contact'),
    }),
  },
  {
    path: PATHS.MOBILE,
    component: asyncComponent({
      resolve: () =>
        import(/* webpackChunkName: "Mobile" */ './components/MobileLanding'),
    }),
  },
  {
    path: PATHS.APPS,
    component: asyncComponent({
      resolve: () =>
        import(/* webpackChunkName: "Mobile" */ './components/MobileLanding'),
    }),
  },
  {
    path: PATHS.ERROR,
    component: asyncComponent({
      resolve: () =>
        import(/* webpackChunkName: "Error" */ './components/Error'),
    }),
    setContext: (context: $TsFixMe) => ({
      ...context,
      status: 400,
    }),
  },
  {
    path: PATHS.SEARCH,
    component: asyncComponent({
      resolve: () =>
        import(/* webpackChunkName: "Search" */ './containers/SearchContainer'),
    }),
  },
  // {
  //   path: '/ayatul-kursi',
  //   component: asyncComponent({
  //     resolve: () =>
  //       import(/* webpackChunkName: "AyatulKursi" */ './containers/AyatulKursi'),
  //   }),
  //     chaptersConnect,
  //     ({ store }) =>
  //       versesConnect({
  //         store,
  //         params: {
  //           chapterId: '2',
  //           range: '255',
  //         },
  //       }),
  //   ],
  // },
  // {
  //   path: '/:chapterId/info/:language?',
  //   component: asyncComponent({
  //     resolve: () =>
  //       import(/* webpackChunkName: "ChapterInfo" */ './containers/ChapterInfo'),
  //   }),
  // },
  ...Object.values(CHAPTER_PATHS).map((path: string) => ({
    path,
    component: ChapterRoute,
  })),
];

export default routes;
