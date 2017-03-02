import {
  isAllLoaded,
  loadAll,
  loadInfo,
  setCurrent as setCurrentSurah
} from 'redux/actions/chapters.js';

import {
  clearCurrent,
  load as loadAyahs
  } from 'redux/actions/verses.js';

import { debug, isLoaded } from 'helpers';

const ayahRangeSize = 30;

export const chaptersConnect = ({ store: { getState, dispatch } }) => {
  debug('component:Surah:chaptersConnect', 'Init');

  if (!isAllLoaded(getState())) {
    debug('component:Surah:chaptersConnect', 'Surahs not loaded');

    if (__CLIENT__) {
      dispatch(loadAll());
      return true;
    }

    return dispatch(loadAll());
  }

  return true;
};

export const chapterInfoConnect = ({ store: { dispatch }, params }) => {
  if (__CLIENT__) {
    dispatch(loadInfo(params.chapterId));
    return true;
  }

  return dispatch(loadInfo(params.chapterId));
};

export const versesConnect = ({ store: { dispatch, getState }, params }) => {
  debug('component:Surah:versesConnect', 'Init');

  const range = params.range;
  const chapterId = parseInt(params.chapterId, 10);

  let from;
  let to;

  if (range) {
    if (range.includes('-')) {
      [from, to] = range.split('-');
    } else {
      // Single ayah. For example /2/30
      from = range;
      to = range;
    }

    if (isNaN(from) || isNaN(to)) {
      // Something wrong happened like /2/SOMETHING
      // going to rescue by giving beginning of surah.
      [from, to] = [1, ayahRangeSize];
    }
  } else {
    [from, to] = [1, ayahRangeSize];
  }

  from = parseInt(from, 10);
  to = parseInt(to, 10);

  if (chapterId !== getState().chapters.current) {
    dispatch(setCurrentSurah(chapterId));
  }

  if (!isLoaded(getState(), chapterId, from, to)) {
    debug('component:Surah:versesConnect', 'Not loaded');

    dispatch(clearCurrent(chapterId)); // In the case where you go to same surah but later ayahs.

    if (__CLIENT__) {
      dispatch(loadAyahs(chapterId, from, to, getState().options));
      return true;
    }

    return dispatch(loadAyahs(chapterId, from, to, getState().options));
  }

  return true;
};
