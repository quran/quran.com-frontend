/* eslint-disable max-len, no-console */
import React from 'react';
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

export const routes = [
  {
    path: '/',
    component: Home,
    loadData: [chaptersConnect, juzsConnect]
  },
  {
    path: '/donations',
    component: import(/* webpackChunkName: "donations" */ './containers/Donations')
      .then(module => module.default)
      .catch(err => console.trace(err))
  },
  {
    path: '/contributions',
    component: import(/* webpackChunkName: "donations" */ './containers/Donations')
      .then(module => module.default)
      .catch(err => console.trace(err))
  },
  {
    path: '/about',
    component: import(/* webpackChunkName: "about" */ './containers/About')
      .then(module => module.default)
      .catch(err => console.trace(err))
  },
  {
    path: '/contact',
    component: import(/* webpackChunkName: "contact" */ './containers/Contact')
      .then(module => module.default)
      .catch(err => console.trace(err))
  },
  {
    path: '/contactus',
    component: import(/* webpackChunkName: "contact" */ './containers/Contact')
      .then(module => module.default)
      .catch(err => console.trace(err))
  },
  {
    path: '/mobile',
    component: import(/* webpackChunkName: "mobile" */ './containers/MobileLanding')
      .then(module => module.default)
      .catch(err => console.trace(err))
  },
  {
    path: '/apps',
    component: import(/* webpackChunkName: "mobile" */ './containers/MobileLanding')
      .then(module => module.default)
      .catch(err => console.trace(err))
  },
  {
    path: '/error/:errorKey',
    component: import(/* webpackChunkName: "error" */ './containers/Error')
      .then(module => module.default)
      .catch(err => console.trace(err))
  },
  {
    path: '/search',
    component: import(/* webpackChunkName: "search" */ './containers/Search')
      .then(module => module.default)
      .catch(err => console.trace(err)),
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
    path: '/:chapterId/info(/:language)',
    component: import(/* webpackChunkName: "chapterinfo" */ './containers/ChapterInfo')
      .then(module => module.default)
      .catch(err => console.trace(err)),
    loadData: [chaptersConnect, chapterInfoConnect]
  },
  {
    path: '/ayatul-kursi',
    component: import(/* webpackChunkName: "ayatulkursi" */ './containers/AyatulKursi')
      .then(module => module.default)
      .catch(err => console.trace(err)),
    loadData: [
      chaptersConnect,
      ({ store }) =>
        versesConnect({ store, params: { chapterId: '2', range: '255' } })
    ]
  },
  {
    path: '/:chapterId/:range/tafsirs/:tafsirId',
    component: import(/* webpackChunkName: "VerseTafsir" */ './containers/VerseTafsir')
      .then(module => module.default)
      .catch(err => console.trace(err)),
    loadData: [versesConnect, tafsirConnect]
  },
  {
    path: '/:chapterId/:range/:translations',
    component: import('./containers/Surah')
      .then(module => module.default)
      .catch(err => console.trace(err)),
    loadData: [chaptersConnect, chapterInfoConnect, versesConnect]
    // import('./components/GlobalNav/Surah')
    // onEnter={checkValidChapterOrVerse}
  },
  {
    path: '/:chapterId(/:range).pdf',
    component: import(/* webpackChunkName: "pdf" */ './containers/Pdf')
      .then(module => module.default)
      .catch(err => console.trace(err)),
    loadData: [chaptersConnect, versesConnect]
    // import(
    //   /* webpackChunkName: "pdf-footer" */ './components/Footer/PdfFooter'
    // )
    // onEnter={checkValidChapterOrVerse}
  },
  {
    path: '/:chapterId(/:range)',
    component: import(/* webpackChunkName: "surah" */ './containers/Surah')
      .then(module => module.default)
      .catch(err => console.trace(err)),
    loadData: [chaptersConnect, chapterInfoConnect, versesConnect]
    // import(
    //   /* webpackChunkName: "globalnav-surah" */ './components/GlobalNav/Surah'
    // )
    // onEnter={checkValidChapterOrVerse}
  }
];

export default () =>
  <Switch>
    {routes.map(route => <Route {...route} />)}
    <Redirect from="/:chapterId:(:range)" to="/:chapterId(/:range)" />
    <Redirect from="/:chapterId/:from::to" to="/:chapterId/:from-:to" />
  </Switch>;
