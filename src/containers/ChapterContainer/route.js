import loadable from 'loadable-components';

export default [
  {
    path: '/:chapterId(\\d+)/:range/:translations',
    component: loadable(
      () => import(/* webpackChunkName: "ChapterContainer" */ './index') // import('./components/GlobalNav/Surah')
    )
    // onEnter: checkValidChapterOrVerse
  },
  {
    path: '/:chapterId(\\d+)/:range?',
    component: loadable(
      () => import(/* webpackChunkName: "ChapterContainer" */ './index') // import('./components/GlobalNav/Surah')
    )
    // onEnter: checkValidChapterOrVerse
  }
];
