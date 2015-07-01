import * as AyahsActions from 'actions/AyahsActions';
import {navigateAction} from 'fluxible-router';

export function changeAyah(actionContext, payload, done) {
  var rangeArray, spread, fromAyah, toAyah;
  var currentAyah = actionContext.getStore('AyahsStore').getAyahs().find((a) => {
    return a.ayah === payload.ayah;
  });

  var params = actionContext.getStore('RouteStore').getCurrentRoute().get('params');
  if (params.get('range')) {
    rangeArray = params.get('range').split('-').map(x => parseInt(x));
  } else {
    rangeArray = [1, 10]; //The default
  }

  if ((actionContext.getStore('AyahsStore').getLast() - 3) === payload.ayah) {
    spread = (rangeArray[1] - rangeArray[0] + 1);
    fromAyah = rangeArray[1] + 1;
    toAyah = fromAyah + spread;

    actionContext.executeAction(AyahsActions.getAyahs, {
      surahId: params.get('surahId'),
      from: fromAyah,
      to: toAyah
    });
  }

  // If the ayah is beyond the rangeArray
  if (currentAyah === undefined) {
    spread = (rangeArray[1] - rangeArray[0] + 1);
    fromAyah = payload.ayah;
    toAyah = fromAyah + spread;

    if ((rangeArray[1] + spread) < payload.ayah) {
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
