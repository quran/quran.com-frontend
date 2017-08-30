import loadable from 'loadable-components';

export default [
  {
    path: '/:chapterId/info/:language?',
    component: loadable(() =>
      import(/* webpackChunkName: "chapterinfo" */ './index')
    )
    // onEnter: checkValidChapterOrVerse
  }
];
