var Promise = require('promise');
var request = require('superagent-promise')(require('superagent'), Promise);

import urlSettings from 'constants/Settings';
import UserStore from 'stores/UserStore';
import debug from 'utils/Debug';

export function getAyahs(actionContext, params) {
  debug('action:Ayahs', 'getAyahs');
  return request.get(urlSettings.url + 'surahs/' + params.surahId + '/ayat')
  .query(
    Object.assign({
      from: params.from,
      to: params.to
    }, actionContext.getStore(UserStore).getOptions())
  )
  .end()
  .then(function(res) {
    debug('action:Ayahs', 'getAyahs Resolved');

    actionContext.dispatch('ayahsReceived', {
      ayahs: res.body
    });

    actionContext.dispatch('lastVisit', {surah: params.surahId, ayah: params.from});

    // done();
  },
  function(err) {
    console.error(err);
  });
}

export function updateAyahs(actionContext, params, done) {
  var firstAndLast = actionContext.getStore('AyahsStore').getFirstAndLast(),
    surahId = actionContext.getStore('SurahsStore').getSurahId();

  debug('action:Ayahs', 'updateAyahs');

  actionContext.getStore(UserStore).setSingleOption(Object.keys(params)[0], params[Object.keys(params)[0]]);

  var queryParams = Object.assign({
    from: firstAndLast[0],
    to: firstAndLast[1]
  }, actionContext.getStore(UserStore).getOptions());

  request.get(urlSettings.url + 'surahs/' + surahId + '/ayat')
  .query(queryParams)
  .end()
  .then((res) => {
    debug('action:Ayahs', 'updateAyahs Resolved');

    actionContext.dispatch('ayahsUpdated', {
      ayahs: res.body,
      difference: Object.keys(params)
    });
  }, () => {
    if (err) {
      console.error(err);
    }
  });
}

export function toggleReadingMode(actionContext) {
  actionContext.dispatch('toggleReadingMode');
}

export function search(actionContext, payload, done) {
  debug('action:Ayahs', 'search');

  return request.get(urlSettings.url + 'search')
  .query({
    q: payload.q,
    p: payload.p
  })
  .end()
  .then((res) => {
    debug('action:Ayahs', 'search Resolved');

    actionContext.dispatch('searchReceived', res.body);
    done();
  });
}

export function buildAllAudio(actionContext) {
  actionContext.dispatch('buildAllAudio');
}
