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
  search: {
    path: '/search',
    method: 'get',
    page: 'search',
    title: 'Search',
    handler: require('../routes/Search'),
    action(actionContext, currentRoute, done) {
      console.log(currentRoute.toObject())
      actionContext.executeAction(
        AyahsActions.search,
        currentRoute.get('query').get('q'),
        done
      );
    }
  },
  surah: {
    path: '/:surahId/:range?',
    method: 'get',
    page: 'surah',
    title: 'Surah',
    handler: require('../routes/Surah'),
    action(actionContext, currentRoute, done) {
      console.log('ROUTES TRIGGERED')
      let fromParam,
          toParam,
          surahId = currentRoute.get('params').get('surahId');

      actionContext.executeAction(
        SurahsActions.getSurahs,
        currentRoute.get('params').get('surahId'),
        () => {
          if (currentRoute.get('params').get('range')) {
            if (currentRoute.get('params').get('range').indexOf('-') > -1) {
              fromParam = currentRoute.get('params').get('range').split('-')[0];
              toParam = currentRoute.get('params').get('range').split('-')[1];
            }
            else {
              fromParam = currentRoute.get('params').get('range');
              toParam = parseInt(fromParam) + 10
            }
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
      );
    }
  },
};
