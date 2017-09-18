import loadable from 'loadable-components';

export default [
  {
    path: '/:chapterId/:verseNumber/tafsirs/:tafsirId',
    component: loadable(() =>
      import(/* webpackChunkName: "VerseTafsir" */ './index')
    )
    // onEnter: checkValidChapterOrVerse
  }
];
