import { asyncComponent } from 'react-async-component';

const navbars = [
  {
    path: '/aboutus',
    component: asyncComponent({
      resolve: () =>
        import(/* webpackChunkName: "Donations" */ './components/Donations'),
    }),
  },
];

export default navbars;
