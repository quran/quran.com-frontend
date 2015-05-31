import * as AyahsActions from 'actions/AyahsActions';
import {navigateAction} from 'fluxible-router';

export function changeAyah(actionContext, payload, done) {
  var currentAyah = actionContext.getStore('AyahsStore').getAyahs().find((a) => {
    return a.ayah  === payload.ayah;
  });

  console.log('currentAyah', currentAyah);

  // If the ayah is beyond the range
  if (currentAyah === undefined) {
    var params = actionContext.getStore('RouteStore')._currentRoute.get('params');
    if (params.get('range')) {
      var rangeArray = params.get('range').split('-');
    } else {
      var rangeArray = [1, 10]; //The default
    }

    var range = rangeArray.map(x => parseInt(x)),
        spread = range[1] - range[0] + 1,
        fromAyah = payload.ayah,
        toAyah = fromAyah + spread;

    console.log(range, spread, fromAyah, toAyah);
    return actionContext.executeAction(navigateAction, {
      url: `/${params.get('surahId')}/${fromAyah}-${toAyah}`
    }, () => {
      actionContext.dispatch('audioplayerAyahChange', {
        ayah: payload.ayah,
        shouldPlay: false
      });
    });
    // actionContext.executeAction(AyahsActions.getAyahs, {
    //   surahId: params.get('surahId'),
    //   from: fromAyah,
    //   to: toAyah,
    // }, () => {
    //   actionContext.dispatch('audioplayerAyahChange', {
    //     ayah: payload.ayah,
    //     shouldPlay: payload.shouldPlay || false
    //   });
    // });
  }

  actionContext.dispatch('audioplayerAyahChange', {
    ayah: payload.ayah,
    shouldPlay: payload.shouldPlay || false
  });
}
