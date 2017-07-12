import loadable from 'loadable-components';
import { isAllLoaded, loadAll } from 'redux/actions/chapters.js';

export default [
  {
    path: '/',
    component: loadable(() =>
      import(/* webpackChunkName: "contact" */ './index')
    ),
    exact: true,
    loadData: [
      ({ store: { getState, dispatch } }) => {
        if (!isAllLoaded(getState())) {
          return dispatch(loadAll());
        }

        return true;
      }
    ]
  }
];
