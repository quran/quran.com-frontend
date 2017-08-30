import loadable from 'loadable-components';

export default [
  {
    path: '/:chapterId/:range/tafsirs/:tafsirId',
    component: loadable(() => import('./index'))
    // onEnter: checkValidChapterOrVerse
  }
];
