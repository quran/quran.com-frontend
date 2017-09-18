import loadable from 'loadable-components';

export default [
  {
    path: '/:chapterId/info/:language?',
    component: loadable(() =>
      import(/* webpackChunkName: "ChapterInfo" */ './index')
    )
    // onEnter: checkValidChapterOrVerse
  }
];
