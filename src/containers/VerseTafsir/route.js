import loadable from 'loadable-components';

export default [
  {
    path: '/:chapterId/:verseNumber/tafsirs/:tafsirId',
    component: loadable(() => import('./index'))
    // onEnter: checkValidChapterOrVerse
  }
];
