import loadable from 'loadable-components';

export default [
  {
    path: '/contact',
    component: loadable(() =>
      import(/* webpackChunkName: "contact" */ './index')
    )
  },
  {
    path: '/contactus',
    component: loadable(() =>
      import(/* webpackChunkName: "contact" */ './index')
    )
  }
];
