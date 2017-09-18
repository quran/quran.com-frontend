import loadable from 'loadable-components';

export default [
  {
    path: '/mobile',
    component: loadable(() =>
      import(/* webpackChunkName: "Mobile" */ './index')
    )
  },
  {
    path: '/apps',
    component: loadable(() =>
      import(/* webpackChunkName: "Mobile" */ './index')
    )
  }
];
