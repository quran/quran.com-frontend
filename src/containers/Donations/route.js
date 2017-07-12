import loadable from 'loadable-components';

export default [
  {
    path: '/donations',
    component: loadable(() =>
      import(/* webpackChunkName: "donations" */ './index')
    )
  },
  {
    path: '/contributions',
    component: loadable(() =>
      import(/* webpackChunkName: "donations" */ './index')
    )
  }
];
