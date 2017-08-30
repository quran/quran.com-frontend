import loadable from 'loadable-components';

export default [
  {
    path: '/ayatul-kursi',
    component: loadable(() =>
      import(/* webpackChunkName: "ayatulkursi" */ './index')
    )
    // loadData: [
    //   chaptersConnect,
    //   ({ store }) =>
    //     versesConnect({ store, params: { chapterId: '2', range: '255' } })
    // ]
  }
];
