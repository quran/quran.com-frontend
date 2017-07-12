import loadable from 'loadable-components';
import { search } from 'redux/actions/search.js';

export default [
  {
    path: '/search',
    component: loadable(() =>
      import(/* webpackChunkName: "search" */ './index')
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
  }
];
