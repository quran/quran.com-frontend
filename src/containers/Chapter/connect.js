import {
  isAllLoaded,
  loadAll,
  setCurrent as setCurrentSurah
} from 'redux/actions/chapters.js';
import {
  isChapterInfoLoaded,
  loadChapterInfo
} from 'redux/actions/chapterInfos';

import {
  clearCurrent,
  load as loadVerses,
  isLoaded,
  loadTafsir,
  isTafsirLoaded
} from 'redux/actions/verses.js';

import { isJuzsLoaded, loadJuzs } from 'redux/actions/juzs.js';

import { debug } from 'helpers';

const determinePage = (range) => {
  let from;
  let to;

  if (range) {
    if (range.includes('-')) {
      [from, to] = range.split('-').map(value => parseInt(value, 10));

      if (isNaN(from) || isNaN(to)) return {};

      return {
        offset: from - 1,
        limit: to - from
      };
    }

    const offset = parseInt(range, 10);

    if (isNaN(offset)) return {};

    return {
      offset: offset - 1,
      limit: 1
    };
  }

  return {};
};

export const chaptersConnect = ({ store: { getState, dispatch } }) => {
  debug('component:Surah:chaptersConnect', 'Init');
  if (isAllLoaded(getState())) return false;

  debug('component:Surah:chaptersConnect', 'Surahs not loaded');

  if (__CLIENT__) {
    dispatch(loadAll());
    return true;
  }

  return dispatch(loadAll());
};

export const juzsConnect = ({ store: { getState, dispatch } }) => {
  debug('component:JuzConnect', 'Init');

  if (isJuzsLoaded(getState())) return false;

  if (__CLIENT__) {
    dispatch(loadJuzs());
    return true;
  }

  return dispatch(loadJuzs());
};

export const chapterInfoConnect = ({
  store: { dispatch, getState },
  params
}) => {
  if (isChapterInfoLoaded(getState(), params.chapterId)) return false;

  if (__CLIENT__) {
    dispatch(loadChapterInfo(params));
    return true;
  }

  return dispatch(loadChapterInfo(params));
};

export const versesConnect = ({
  store: { dispatch, getState },
  params,
  location
}) => {
  debug('component:Surah:versesConnect', 'Init');

  const chapterId = parseInt(params.chapterId, 10);
  const paging = determinePage(params.range);
  const translations =
    params.translations || (location && location.query.translations);

  if (chapterId !== getState().chapters.current) {
    dispatch(setCurrentSurah(chapterId));
  }

  if (!isLoaded(getState(), chapterId, paging)) {
    debug('component:Surah:versesConnect', 'Not loaded');

    dispatch(clearCurrent(chapterId)); // In the case where you go to same surah but later ayahs.

    if (__CLIENT__) {
      dispatch(
        loadVerses(chapterId, paging, { translations }, getState().options)
      );
      return true;
    }

    return dispatch(
      loadVerses(chapterId, paging, { translations }, getState().options)
    );
  }

  return true;
};

export const tafsirConnect = ({ store: { dispatch, getState }, params }) => {
  if (
    isTafsirLoaded(getState(), params.chapterId, params.range, params.tafsirId)
  ) {
    return false;
  }

  if (__CLIENT__) {
    dispatch(loadTafsir(params.chapterId, params.range, params.tafsirId));
    return true;
  }

  return dispatch(loadTafsir(params.chapterId, params.range, params.tafsirId));
};
