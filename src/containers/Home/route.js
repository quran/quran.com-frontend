import loadable from 'loadable-components';

export default [
  {
    path: '/',
    component: loadable(() =>
      import(/* webpackChunkName: "contact" */ './index')
    ),
    exact: true
  }
];
