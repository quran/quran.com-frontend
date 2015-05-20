import * as SurahsActions from 'actions/SurahsActions';
import * as AyahsActions from 'actions/AyahsActions';
import debug from 'debug';
const debugRoutes = debug('quran-com');


export default {
    index: {
      path: '/',
      method: 'get',
      page: 'index',
      title: 'Quran.com',
      handler: require('../routes/Index'),
      action(actionContext, currentRoute, done) {
        actionContext.executeAction(
          SurahsActions.getSurahs,
          null,
          done
        );
      }
    },
    surah: {
        path: '/:surahId/:range?',
        method: 'get',
        page: 'surah',
        title: 'About',
        handler: require('../routes/Surah'),
        action(actionContext, currentRoute, done) {
          console.log('ROUTES TRIGGERED')
          let fromParam,
              toParam,
              surahId = currentRoute.get('params').get('surahId');

          actionContext.executeAction(
            SurahsActions.getSurahs,
            currentRoute.get('params').get('surahId')
          );

          if (currentRoute.get('params').get('range')) {
            fromParam = currentRoute.get('params').get('range').split('-')[0];
            toParam = currentRoute.get('params').get('range').split('-')[1];
          }
          else {
            fromParam = 1;
            toParam = 10;
          }

          actionContext.executeAction(AyahsActions.getAyahs, {
            surahId: surahId,
            from: fromParam,
            to: toParam
          }, done);

        }
    }
};

//
// handler: () => {
//   // Do something which i havent brainstormed yet but somehow injects to the handler...
//     return require('../routes/Index')
// }
//
//
// statics: {
//   resolve: {
//     getUser() {
//       return superagent.get('some_url').end().then((response) => {
//         return response.user;
//       })
//     }
//   }
// }
// console.log(Object.keys(require('../routes/Index')))
