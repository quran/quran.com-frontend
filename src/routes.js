import React from 'react';
import PropTypes from 'prop-types';
import loadable from 'loadable-components';
import { Switch, Redirect, Route } from 'react-router';

import Home from './containers/Home';

import {
  chaptersConnect,
  chapterInfoConnect,
  versesConnect,
  tafsirConnect,
  juzsConnect
} from './containers/Surah/connect';
import { search } from './redux/actions/search.js';
import routePromises from './utils/routePromises';

export const routes = [
  {
    path: '/',
    exact: true,
    component: Home,
    loadData: [chaptersConnect, juzsConnect]
  },
  {
    path: '/donations',
    component: loadable(() =>
      import(/* webpackChunkName: "donations" */ './containers/Donations')
    )
  },
  {
    path: '/contributions',
    component: loadable(() =>
      import(/* webpackChunkName: "donations" */ './containers/Donations')
    )
  },
  {
    path: '/about',
    component: loadable(() =>
      import(/* webpackChunkName: "about" */ './containers/About')
    )
  },
  {
    path: '/contact',
    component: loadable(() =>
      import(/* webpackChunkName: "contact" */ './containers/Contact')
    )
  },
  {
    path: '/contactus',
    component: loadable(() =>
      import(/* webpackChunkName: "contact" */ './containers/Contact')
    )
  },
  {
    path: '/mobile',
    component: loadable(() =>
      import(/* webpackChunkName: "mobile" */ './containers/MobileLanding')
    )
  },
  {
    path: '/apps',
    component: loadable(() =>
      import(/* webpackChunkName: "mobile" */ './containers/MobileLanding')
    )
  },
  {
    path: '/error/:errorKey',
    component: loadable(() =>
      import(/* webpackChunkName: "error" */ './containers/Error')
    )
  },
  {
    path: '/search',
    component: loadable(() =>
      import(/* webpackChunkName: "search" */ './containers/Search')
    ),
    loadData: [
      ({ store: { dispatch }, location }) => {
        if (__CLIENT__) {
          dispatch(search(location.query || location.q));
          return false;
        }

        return dispatch(search(location.query || location.q));
      }
    ]
  },
  {
    path: '/:chapterId/info/:language?',
    component: loadable(() =>
      import(/* webpackChunkName: "chapterinfo" */ './containers/ChapterInfo')
    ),
    loadData: [chaptersConnect, chapterInfoConnect]
  },
  {
    path: '/ayatul-kursi',
    component: loadable(() =>
      import(/* webpackChunkName: "ayatulkursi" */ './containers/AyatulKursi')
    ),
    loadData: [
      chaptersConnect,
      ({ store }) =>
        versesConnect({ store, params: { chapterId: '2', range: '255' } })
    ]
  },
  {
    path: '/:chapterId(\\d+)/:range/tafsirs/:tafsirId',
    component: loadable(() =>
      import(/* webpackChunkName: "VerseTafsir" */ './containers/VerseTafsir')
    ),
    loadData: [versesConnect, tafsirConnect]
  },
  {
    path: '/:chapterId(\\d+)/:range/:translations',
    component: loadable(() => import('./containers/Surah')),
    loadData: [chaptersConnect, chapterInfoConnect, versesConnect]
    // import('./components/GlobalNav/Surah')
    // onEnter={checkValidChapterOrVerse}
  },
  {
    path: '/:chapterId(\\d+)/:range?.pdf',
    component: loadable(() =>
      import(/* webpackChunkName: "pdf" */ './containers/Pdf')
    ),
    loadData: [chaptersConnect, versesConnect]
    // import(
    //   /* webpackChunkName: "pdf-footer" */ './components/Footer/PdfFooter'
    // )
    // onEnter={checkValidChapterOrVerse}
  },
  {
    path: '/:chapterId(\\d+)/:range?',
    component: loadable(() =>
      import(/* webpackChunkName: "surah" */ './containers/Surah')
    ),
    loadData: [chaptersConnect, chapterInfoConnect, versesConnect]
    // import(
    //   /* webpackChunkName: "globalnav-surah" */ './components/GlobalNav/Surah'
    // )
    // onEnter={checkValidChapterOrVerse}
  }
];

const Routes = ({ store }) => (
  <Switch>
    {routes.map(({ component: Component, loadData, ...route }) => (
      <Route
        key={route.path}
        {...route}
        render={(routeProps) => {
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
    ))}
    <Redirect from="/:chapterId:(:range)" to="/:chapterId(/:range)" />
    <Redirect from="/:chapterId/:from::to" to="/:chapterId/:from-:to" />
  </Switch>
);

Routes.propTypes = {
  store: PropTypes.object.isRequired // eslint-disable-line
};

export default Routes;
