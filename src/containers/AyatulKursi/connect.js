import {
  clearCurrent,
  load as loadVerses,
  isLoaded
} from 'redux/actions/verses.js';

import { debug } from 'helpers';

export default ({ store: { dispatch, getState } }) => {
  debug('component:AyatulKursi:versesConnect', 'Init');

  const chapterId = 2;
  const paging = { offset: 254, limit: 1 };

  if (!isLoaded(getState(), chapterId, paging)) {
    debug('component:AyatulKursi:versesConnect', 'Not loaded');

    dispatch(clearCurrent(chapterId)); // In the case where you go to same surah but later ayahs.

    if (__CLIENT__) {
      dispatch(loadVerses(chapterId, paging, getState().options));
      return true;
    }

    return dispatch(loadVerses(chapterId, paging, getState().options));
  }

  return true;
};
