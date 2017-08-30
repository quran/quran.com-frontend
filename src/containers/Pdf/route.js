import loadable from 'loadable-components';

export default [
  {
    path: '/:chapterId/:range?.pdf',
    component: loadable(
      () => import(/* webpackChunkName: "pdf" */ './index') // import(/* webpackChunkName: "pdf-footer" */ './components/Footer/PdfFooter')
    )
    // onEnter: checkValidChapterOrVerse
  }
];
