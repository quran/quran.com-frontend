import loadable from 'loadable-components';

export default [
  {
    path: '/contact',
    component: loadable(() =>
      import(/* webpackChunkName: "Contact" */ './index')
    )
  },
  {
    path: '/contactus',
    component: loadable(() =>
      import(/* webpackChunkName: "Contact" */ './index')
    )
  }
];
