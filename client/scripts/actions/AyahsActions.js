import request from 'superagent-promise';
import Settings from 'constants/Settings';
import UserOptionsStore from 'stores/UserOptionsStore';
import debug from 'utils/Debug';

export function getAyahs(actionContext, params, done) {
  debug('ACTIONS-AYAHS');
  return request.get(Settings.url + 'surahs/' + params.surahId + '/ayat')
  .query(
    Object.assign({
        from: params.from,
        to: params.to
    }, actionContext.getStore(UserOptionsStore).getOptions())
  )
  .end()
  .then(function(res) {
    actionContext.dispatch('ayahsReceived', {
        ayahs: res.body,
        shouldReplace: params.shouldReplace
    });

    done();
  });
}

export function updateAyahs(actionContext, params, done) {
  var firstAndLast = actionContext.getStore('AyahsStore').getFirstAndLast(),
      surahId = actionContext.getStore('SurahsStore').getSurahId();

  actionContext.getStore(UserOptionsStore).setOptions(params);

  var queryParams = Object.assign({
    from: firstAndLast[0],
    to: firstAndLast[1]
  }, actionContext.getStore(UserOptionsStore).getOptions());

  request.get(Settings.url + 'surahs/' + surahId + '/ayat')
  .query(queryParams)
  .end(function(err, res) {
    actionContext.dispatch('ayahsUpdated', {
      ayahs: res.body
    });
  });
}
