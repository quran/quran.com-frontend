import loadable from 'loadable-components';
import { chaptersConnect, versesConnect } from '../Surah/connect';

export default [
  {
    path: '/:chapterId(/:range).pdf',
    component: loadable(
      () => import(/* webpackChunkName: "pdf" */ './index') // import(/* webpackChunkName: "pdf-footer" */ './components/Footer/PdfFooter')
    ),
    loadData: [chaptersConnect, versesConnect]
    // onEnter: checkValidChapterOrVerse
  }
];
