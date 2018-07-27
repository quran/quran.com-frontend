import { asyncComponent } from 'react-async-component';
import HomeContainer from './containers/HomeContainer';

const routes = [
  {
    path: '/',
    exact: true,
    component: HomeContainer,
  },
  {
    path: '/donations',
    component: asyncComponent({
      resolve: () =>
        import(/* webpackChunkName: "Donations" */ './components/Donations'),
    }),
  },
  {
    path: '/contributions',
    component: asyncComponent({
      resolve: () =>
        import(/* webpackChunkName: "Donations" */ './components/Donations'),
    }),
  },
  {
    path: '/about',
    component: asyncComponent({
      resolve: () =>
        import(/* webpackChunkName: "About" */ './components/About'),
    }),
  },
  {
    path: '/contact',
    component: asyncComponent({
      resolve: () =>
        import(/* webpackChunkName: "Contact" */ './components/Contact'),
    }),
  },
  {
    path: '/contactus',
    component: asyncComponent({
      resolve: () =>
        import(/* webpackChunkName: "Contact" */ './components/Contact'),
    }),
  },
  {
    path: '/mobile',
    component: asyncComponent({
      resolve: () =>
        import(/* webpackChunkName: "Mobile" */ './components/MobileLanding'),
    }),
  },
  {
    path: '/apps',
    component: asyncComponent({
      resolve: () =>
        import(/* webpackChunkName: "Mobile" */ './components/MobileLanding'),
    }),
  },
  {
    path: '/error/:errorKey',
    component: asyncComponent({
      resolve: () =>
        import(/* webpackChunkName: "Error" */ './components/Error'),
    }),
    setContext: (context: $TsFixMe) => ({
      ...context,
      status: 400,
    }),
  },
  // {
  //   path: '/search',
  //   component: asyncComponent({
  //     resolve: () =>
  //       import(/* webpackChunkName: "Search" */ './containers/Search'),
  //   }),
  //     ({ store: { dispatch }, location }) => {
  //       if (__CLIENT__) {
  //         dispatch(search(location.query || location.q));
  //         return false;
  //       }

  //       return dispatch(search(location.query || location.q));
  //     },
  //   ],
  // },
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
  // {
  //   path: '/:chapterId(\\d+)/:range/tafsirs/:tafsirId',
  //   component: asyncComponent({
  //     resolve: () =>
  //       import(/* webpackChunkName: "VerseTafsir" */ './containers/VerseTafsir'),
  //   }),
  // },
  // {
  //   path: '/:chapterId(\\d+)/:range/:translations',
  //   component: asyncComponent({
  //     resolve: () =>
  //       import(/* webpackChunkName: "Chapter" */ './containers/Chapter'),
  //   }),
  //   navbar: asyncComponent({
  //     resolve: () =>
  //       import(/* webpackChunkName: "GlobalNavChapter" */ './components/GlobalNav/Chapter'),
  //   }),

  // },
  // {
  //   path: '/:chapterId(\\d+)/:range?.pdf',
  //   component: asyncComponent({
  //     resolve: () => import(/* webpackChunkName: "Pdf" */ './containers/Pdf'),
  //   }),
  //   footer: asyncComponent({
  //     resolve: () =>
  //       import(/* webpackChunkName: "PdfFooter" */ './components/Footer/PdfFooter'),
  //   }),

  // },
  // {
  //   path: '/:chapterId(\\d+)/:range?',
  //   component: asyncComponent({
  //     resolve: () =>
  //       import(/* webpackChunkName: "Chapter" */ './containers/Chapter'),
  //   }),
  //   navbar: asyncComponent({
  //     resolve: () =>
  //       import(/* webpackChunkName: "GlobalNavChapter" */ './components/GlobalNav/Chapter'),
  //   }),

  // },
  {
    path: '/:chapterId(\\d+)(:|-)?:range?',
    component: asyncComponent({
      resolve: () =>
        import(/* webpackChunkName: "Chapter" */ './containers/ChapterContainer'),
    }),
  },
];

export default routes;
