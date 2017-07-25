import loadable from 'loadable-components';
import qs from 'qs';
import { search } from 'redux/actions/search.js';

export default [
  {
    path: '/search',
    component: loadable(() =>
      import(/* webpackChunkName: "search" */ './index')
    ),
    loadData: [
      ({ store: { dispatch }, location }) => {
        const query = location.query
          ? location.query
          : qs.parse(location.search, { ignoreQueryPrefix: true });

        if (__CLIENT__) {
          dispatch(search(query));
          return false;
        }

        return dispatch(search(query));
      }
    ]
  }
];
