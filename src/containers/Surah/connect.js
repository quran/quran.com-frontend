import {
  isAllLoaded,
  loadAll,
  loadInfo,
  setCurrent as setCurrentSurah
  } from 'redux/actions/surahs.js';

import {
  clearCurrent,
  load as loadAyahs
  } from 'redux/actions/ayahs.js';

import { debug, isLoaded } from 'helpers';

const ayahRangeSize = 30;

export const surahsConnect = ({ store: { getState, dispatch } }) => {
  debug('component:Surah:surahsConnect', 'Init');

  if (!isAllLoaded(getState())) {
    debug('component:Surah:surahsConnect', 'Surahs not loaded');

    if (__CLIENT__) {
      dispatch(loadAll());
      return true;
    }

    return dispatch(loadAll());
  }

  return true;
};

export const surahInfoConnect = ({ store: { dispatch }, params }) => {
  if (__CLIENT__) {
    dispatch(loadInfo(params.surahId));
    return true;
  }

  return dispatch(loadInfo(params.surahId));
};

export const ayahsConnect = ({ store: { dispatch, getState }, params }) => {
  debug('component:Surah:ayahsConnect', 'Init');

  const range = params.range;
  const surahId = parseInt(params.surahId, 10);

  let from;
  let to;

  if (range) {
    if (range.includes('-')) {
      [from, to] = range.split('-');
    } else {
      // Single ayah. For example /2/30
      from = range;
      to = parseInt(range, 10) + ayahRangeSize;
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

  if (surahId !== getState().surahs.current) {
    dispatch(setCurrentSurah(surahId));
  }

  if (!isLoaded(getState(), surahId, from, to)) {
    debug('component:Surah:ayahsConnect', 'Not loaded');

    dispatch(clearCurrent(surahId)); // In the case where you go to same surah but later ayahs.

    if (__CLIENT__) {
      dispatch(loadAyahs(surahId, from, to, getState().options));
      return true;
    }

    return dispatch(loadAyahs(surahId, from, to, getState().options));
  }

  return true;
};
