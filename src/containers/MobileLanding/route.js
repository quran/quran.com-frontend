import loadable from 'loadable-components';

export default [
  {
    path: '/mobile',
    component: loadable(() =>
      import(/* webpackChunkName: "mobile" */ './index')
    )
  },
  {
    path: '/apps',
    component: loadable(() =>
      import(/* webpackChunkName: "mobile" */ './index')
    )
  }
];
