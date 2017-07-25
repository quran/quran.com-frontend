import loadable from 'loadable-components';
import { chaptersConnect, chapterInfoConnect } from '../Surah/connect';

export default [
  {
    path: '/:chapterId/info/:language?',
    component: loadable(() =>
      import(/* webpackChunkName: "chapterinfo" */ './index')
    ),
    // onEnter: checkValidChapterOrVerse
    loadData: [chaptersConnect, chapterInfoConnect]
  }
];
