import request from 'superagent-promise';
import settings from 'constants/Settings';
import debug from 'utils/Debug';

export function getSurahs(actionContext, payload, done) {
  if (actionContext.getStore('SurahsStore').hasAllSurahs()) {
    return;
  }
  debug('ACTIONS-SURAHS');
  return request.get(settings.url + 'surahs')
  .end()
  .then(function(res) {
    actionContext.dispatch('surahsReceived', {surahs: res.body, surah: payload});
    done();
  });
}

export function currentSurah(actionContext, payload, done) {
  actionContext.dispatch('currentSurahChange', payload);
  done();
}
