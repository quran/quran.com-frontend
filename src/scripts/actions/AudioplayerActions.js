import * as AyahsActions from 'actions/AyahsActions';
import {navigateAction} from 'fluxible-router';

export function changeAyah(actionContext, payload, done) {
  var currentAyah = actionContext.getStore('AyahsStore').getAyahs().find((a) => {
    return a.ayah  === payload.ayah;
  });

  var params = actionContext.getStore('RouteStore')._currentRoute.get('params');
  if (params.get('range')) {
    var rangeArray = params.get('range').split('-');
  } else {
    var rangeArray = [1, 10]; //The default
  }

  if ((actionContext.getStore('AyahsStore').getLast() - 3) === payload.ayah) {
    var range = rangeArray.map(x => parseInt(x)),
        spread = range[1] - range[0] + 1,
        fromAyah = range[1] + 1,
        toAyah = fromAyah + spread;

    actionContext.executeAction(AyahsActions.getAyahs, {
      surahId: params.get('surahId'),
      from: fromAyah,
      to: toAyah
    });
  }

  // If the ayah is beyond the range
  if (currentAyah === undefined) {
    var range = rangeArray.map(x => parseInt(x)),
        spread = range[1] - range[0] + 1,
        fromAyah = payload.ayah,
        toAyah = fromAyah + spread;

    if ((range[1] + spread) < payload.ayah) {
      actionContext.executeAction(navigateAction, {
        url: `/${params.get('surahId')}/${fromAyah}-${toAyah}`
      });

      actionContext.dispatch('audioplayerAyahChange', {
        ayah: payload.ayah,
        shouldPlay: false
      });

      return;
    }
  }

  actionContext.dispatch('audioplayerAyahChange', {
    ayah: payload.ayah,
    shouldPlay: payload.shouldPlay || false
  });
}
