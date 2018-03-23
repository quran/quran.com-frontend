import React from 'react';
import PropTypes from 'prop-types';
import loadable from 'loadable-components';
import { Switch, Route } from 'react-router';

import Home from './containers/Home';
import NotFound from './components/NotFound';

import {
  chaptersConnect,
  chapterInfoConnect,
  versesConnect,
  tafsirConnect,
  juzsConnect
} from './containers/Surah/connect';
import { search } from './redux/actions/search.js';
import routePromises from './utils/routePromises';
import validators from './utils/routeFilters';

const GlobalNav = loadable(() =>
  import(/* webpackChunkName: "GlobalNav" */ 'components/GlobalNav')
);

const defaultSetContext = context => ({
  ...context,
  status: 200
});

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
      import(/* webpackChunkName: "Donations" */ './containers/Donations')
    )
  },
  {
    path: '/contributions',
    component: loadable(() =>
      import(/* webpackChunkName: "Donations" */ './containers/Donations')
    )
  },
  {
    path: '/about',
    component: loadable(() =>
      import(/* webpackChunkName: "About" */ './containers/About')
    )
  },
  {
    path: '/contact',
    component: loadable(() =>
      import(/* webpackChunkName: "Contact" */ './containers/Contact')
    )
  },
  {
    path: '/contactus',
    component: loadable(() =>
      import(/* webpackChunkName: "Contact" */ './containers/Contact')
    )
  },
  {
    path: '/mobile',
    component: loadable(() =>
      import(/* webpackChunkName: "Mobile" */ './containers/MobileLanding')
    )
  },
  {
    path: '/apps',
    component: loadable(() =>
      import(/* webpackChunkName: "Mobile" */ './containers/MobileLanding')
    )
  },
  {
    path: '/error/:errorKey',
    component: loadable(() =>
      import(/* webpackChunkName: "Error" */ './containers/Error')
    ),
    setContext: context => ({
      ...context,
      status: 400
    })
  },
  {
    path: '/search',
    component: loadable(() =>
      import(/* webpackChunkName: "Search" */ './containers/Search')
    ),
    loadData: [
      ({ store: { dispatch }, location }) => {
        console.log(location);
        if (__CLIENT__) {
          dispatch(search(location.query || location.q));
          return false;
        }

        return dispatch(search(location.query || location.q));
      }
    ]
  },
  {
    path: '/ayatul-kursi',
    component: loadable(() =>
      import(/* webpackChunkName: "AyatulKursi" */ './containers/AyatulKursi')
    ),
    loadData: [
      chaptersConnect,
      ({ store }) =>
        versesConnect({
          store,
          params: {
            chapterId: '2',
            range: '255'
          }
        })
    ]
  },
  {
    path: '/:chapterId/info/:language?',
    component: loadable(() =>
      import(/* webpackChunkName: "ChapterInfo" */ './containers/ChapterInfo')
    ),
    loadData: [chaptersConnect, chapterInfoConnect]
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
    component: loadable(() =>
      import(/* webpackChunkName: "Surah" */ './containers/Surah')
    ),
    loadData: [chaptersConnect, chapterInfoConnect, versesConnect],
    navbar: loadable(() =>
      import(/* webpackChunkName: "GlobalNavSurah" */ './components/GlobalNav/Surah')
    ),
    onEnter: validators
  },
  {
    path: '/:chapterId(\\d+)/:range?.pdf',
    component: loadable(() =>
      import(/* webpackChunkName: "Pdf" */ './containers/Pdf')
    ),
    loadData: [chaptersConnect, versesConnect],
    footer: loadable(() =>
      import(/* webpackChunkName: "PdfFooter" */ './components/Footer/PdfFooter')
    ),
    onEnter: validators
  },
  {
    path: '/:chapterId(\\d+)/:range?',
    component: loadable(() =>
      import(/* webpackChunkName: "Surah" */ './containers/Surah')
    ),
    loadData: [chaptersConnect, chapterInfoConnect, versesConnect],
    navbar: loadable(() =>
      import(/* webpackChunkName: "GlobalNavSurah" */ './components/GlobalNav/Surah')
    ),
    onEnter: validators
  }
];

const Routes = ({ store }) => (
  <Switch>
    {routes.map(({ component: Component, loadData, setContext, ...route }) => (
      <Route
        key={route.path}
        {...route}
        render={({ staticContext, ...routeProps }) => {
          if (staticContext) {
            const contextFunction = setContext || defaultSetContext;

            Object.assign(staticContext, contextFunction(staticContext));
          }

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
    ))}{' '}
    <Route component={NotFound} />
  </Switch>
);

// eslint-disable-next-line no-unused-vars, react/prop-types
export const Navbars = ({ match, ...props }) => (
  <Switch>
    {' '}
    {routes
      .filter(route => route.navbar)
      // eslint-disable-next-line no-unused-vars
      .map(({ navbar: Navbar, component, ...route }) => (
        <Route
          key={route.path}
          {...route}
          render={routeProps => <Navbar {...routeProps} {...props} />}
        />
      ))}{' '}
    <Route
      render={routeProps => <GlobalNav {...routeProps} {...props} isStatic />}
    />{' '}
  </Switch>
);

Routes.propTypes = {
  store: PropTypes.object.isRequired // eslint-disable-line
};

export default Routes;
