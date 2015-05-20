import request from 'superagent';
import request2 from 'superagent';
import settings from 'constants/Settings';


export function getSurahs(actionContext, payload, done) {
  if (actionContext.getStore('SurahsStore').hasAllSurahs()) {
    return;
  }
  console.log('SURAHS CALLED')
  return request.get(settings.url + 'surahs')
  .end(function(err, res) {
    actionContext.dispatch('surahsReceived', {surahs: res.body, surah: payload});

    done();
  });
}

export function currentSurah(actionContext, payload, done) {
  actionContext.dispatch('currentSurahChange', payload);
  done();
}
