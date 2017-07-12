import loadable from 'loadable-components';
import { versesConnect, tafsirConnect } from '../Surah/connect';

export default [
  {
    path: '/:chapterId/:range/tafsirs/:tafsirId',
    component: loadable(() => import('./index')),
    loadData: [versesConnect, tafsirConnect]
    // onEnter: checkValidChapterOrVerse
  }
];
