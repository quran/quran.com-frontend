/* eslint-disable no-extra-boolean-cast, consistent-return */
var Promise = require('promise');
var request = require('superagent-promise')(require('superagent'), Promise);

import urlSettings from 'constants/Settings';
import debug from 'utils/Debug';

export function getSurahs(actionContext, payload, done) {
  if (actionContext.getStore('SurahsStore').hasAllSurahs()) {
    return;
  }

  debug('ACTIONS-SURAHS');

  return request.get(urlSettings.url + 'surahs')
  .end()
  .then(function(res) {
    debug('SURAHS RECEIVED....');

    actionContext.dispatch('surahsReceived', {surahs: res.body, surah: payload});
    done();
  });
}

export function currentSurah(actionContext, payload, done) {
  actionContext.dispatch('currentSurahChange', payload);
  done();
}

export function showInfo(actionContext) {
  actionContext.dispatch('showInfo');
}
