import loadable from 'loadable-components';

import { chaptersConnect, chapterInfoConnect, versesConnect } from './connect';

export default [
  {
    path: '/:chapterId/:range/:translations',
    component: loadable(
      () => import('./index') // import('./components/GlobalNav/Surah')
    ),
    loadData: [chaptersConnect, chapterInfoConnect, versesConnect]
    // onEnter: checkValidChapterOrVerse
  },
  {
    path: '/:chapterId(/:range)',
    component: loadable(
      () => import('./index') // import('./components/GlobalNav/Surah')
    ),
    loadData: [chaptersConnect, chapterInfoConnect, versesConnect]
    // onEnter: checkValidChapterOrVerse
  }
];
