/* eslint-disable no-extra-boolean-cast, consistent-return */
var Promise = require('promise');
var request = require('superagent-promise')(require('superagent'), Promise);

import urlSettings from 'constants/Settings';
import debug from 'utils/Debug';
import Keen from 'utils/Keen';

export function getSurahs(actionContext, payload) {
  if (actionContext.getStore('SurahsStore').hasAllSurahs()) {
    return;
  }

  debug('ACTIONS-SURAHS');

  return request.get(urlSettings.url + 'surahs')
  .end(function(err, res) {
    debug('SURAHS RECEIVED....');

    actionContext.dispatch('surahsReceived', {surahs: res.body, surah: payload});
  });
}

export function currentSurah(actionContext, payload, done) {
  Keen.addEvent('SurahsActions:currentSurah', payload);
  actionContext.dispatch('currentSurahChange', payload);
  done();
}

export function showInfo(actionContext) {
  actionContext.dispatch('showInfo');
}
