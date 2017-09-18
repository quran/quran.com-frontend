import loadable from 'loadable-components';

export default [
  {
    path: '/',
    component: loadable(() => import(/* webpackChunkName: "Home" */ './index')),
    exact: true
  }
];
