import { versesSchema } from '../schemas';

import {
  FETCH_VERSES,
  CLEAR_CURRENT,
  SET_CURRENT_VERSE,
  SET_CURRENT_WORD,
  CLEAR_CURRENT_WORD,
} from '../constants/verses';
import apiClient from '../../apiClient';
import { ChapterId, VerseId, TafsirId } from '../../types';

// NOTE: For safe measure
const defaultOptions = {
  translations: [102],
};

// NOTE: From the API!
const perPage = 10;

const prepareParams = (params: any, options: any) => {
  // NOTE: first priority to options in URL, second to options and lastly fallback to defaultOptions
  let translations;

  if (params.translations && params.translations.length) {
    translations =
      typeof params.translations === 'string'
        ? params.translations.split(',')
        : params.translations;
  } else {
    // eslint-disable-next-line
    translations = options.translations; // || defaultOptions.translations;
  }

  return { translations };
};

export const fetchVerses = (
  chapterId: ChapterId,
  paging: $TsFixMe,
  params: $TsFixMe,
  options: $TsFixMe = defaultOptions
) => {
  const apiOptions = prepareParams(params, options);

  return {
    type: FETCH_VERSES,
    schema: { verses: [versesSchema] },
    promise: apiClient.get(`/api/v3/chapters/${chapterId}/verses`, {
      params: {
        ...paging,
        ...apiOptions,
      },
    }),
    meta: {
      chapterId,
    },
  };
};

export const clearCurrent = (chapterId: ChapterId) => {
  return {
    type: CLEAR_CURRENT,
    chapterId,
  };
};

export const clearCurrentWord = () => {
  return {
    type: CLEAR_CURRENT_WORD,
  };
};

export const setCurrentVerse = (chapterId: ChapterId) => {
  return {
    type: SET_CURRENT_VERSE,
    chapterId,
  };
};

export const setCurrentWord = (chapterId: ChapterId) => {
  return {
    type: SET_CURRENT_WORD,
    chapterId,
  };
};

export const isLoaded = (
  globalState: any,
  chapterId: ChapterId,
  paging = {} as $TsFixMe
) => {
  if (paging.offset) {
    return (
      globalState.verses.entities[chapterId] &&
      globalState.verses.entities[chapterId][
        `${chapterId}:${paging.offset ? paging.offset + 1 : 1}`
      ] &&
      globalState.verses.entities[chapterId][
        `${chapterId}:${
          paging.offset && paging.limit ? paging.offset + paging.limit : perPage
        }`
      ]
    );
  }

  return (
    globalState.verses.entities[chapterId] &&
    globalState.verses.entities[chapterId][`${chapterId}:1`]
  );
};

export const isTafsirLoaded = (
  globalState: any,
  chapterId: ChapterId,
  verseId: VerseId,
  tafsirId: TafsirId
) => {
  const verses = globalState.verses.entities[chapterId];
  const verseKey = `${chapterId}:${verseId}`;

  return !!verses && globalState.verses.tafsirs[`${verseKey}-${tafsirId}`];
};

export type ActionTypes =
  | typeof fetchVerses
  | typeof clearCurrent
  | typeof setCurrentVerse;
export type FetchVerses = typeof fetchVerses;
