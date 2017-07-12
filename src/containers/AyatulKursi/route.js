import loadable from 'loadable-components';
import { chaptersConnect, versesConnect } from 'containers/Surah/connect';

export default [
  {
    path: '/ayatul-kursi',
    component: loadable(() =>
      import(/* webpackChunkName: "ayatulkursi" */ './containers/AyatulKursi')
    ),
    loadData: [
      chaptersConnect,
      ({ store }) =>
        versesConnect({ store, params: { chapterId: '2', range: '255' } })
    ]
  }
];
