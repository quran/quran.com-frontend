import { asyncComponent } from 'react-async-component';
import { CHAPTER_PATHS } from './constants/router';

const navbars = [
  ...Object.values(CHAPTER_PATHS).map((path: string) => ({
    path,
    component: asyncComponent({
      resolve: () =>
        import(/* webpackChunkName: "ChapterNavbar" */ './containers/ChapterNavbarContainer'),
    }),
  })),
];

export default navbars;
