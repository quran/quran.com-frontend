import request from 'superagent-promise';
import urlSettings from 'constants/Settings';
import UserStore from 'stores/UserStore';
import debug from 'utils/Debug';

export function getAyahs(actionContext, params, done) {
  debug('ACTIONS-AYAHS');
  return request.get(urlSettings.url + 'surahs/' + params.surahId + '/ayat')
  .query(
    Object.assign({
      from: params.from,
      to: params.to
    }, actionContext.getStore(UserStore).getOptions())
  )
  .end()
  .then(function(res) {
    actionContext.dispatch('ayahsReceived', {
      ayahs: res.body
    },
    function(err) {
      console.error(err);
    });

    actionContext.dispatch('lastVisit', {surah: params.surahId, ayah: params.from});

    done();
  });
}

export function updateAyahs(actionContext, params, done) {
  var firstAndLast = actionContext.getStore('AyahsStore').getFirstAndLast(),
    surahId = actionContext.getStore('SurahsStore').getSurahId();

  actionContext.getStore(UserStore).setSingleOption(Object.keys(params)[0], params[Object.keys(params)[0]]);

  var queryParams = Object.assign({
    from: firstAndLast[0],
    to: firstAndLast[1]
  }, actionContext.getStore(UserStore).getOptions());

  request.get(urlSettings.url + 'surahs/' + surahId + '/ayat')
  .query(queryParams)
  .end(function(err, res) {
    if (err) {
      console.error(err);
    }

    actionContext.dispatch('ayahsUpdated', {
      ayahs: res.body,
      difference: Object.keys(params)
    });
  });
}

export function toggleReadingMode(actionContext) {
  actionContext.dispatch('toggleReadingMode');
}

export function search(actionContext, payload, done) {
  debug('ACTIONS-AYAHS SEARCH');
  return request.get(urlSettings.url + 'search')
  .query({
    q: payload.q,
    p: payload.p
  })
  .end()
  .then((res) => {
    actionContext.dispatch('searchReceived', res.body);
    done();
  });
}

export function buildAllAudio(actionContext) {
  actionContext.dispatch('buildAllAudio');
}
