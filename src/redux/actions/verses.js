import { versesSchema } from 'redux/schemas';

import {
  LOAD,
  LOAD_SUCCESS,
  LOAD_FAIL,
  CLEAR_CURRENT,
  SET_CURRENT_VERSE,
  SET_CURRENT_WORD,
  CLEAR_CURRENT_WORD
} from 'redux/constants/verses.js';

// NOTE: For safe measure
const defaultOptions = {
  translations: [20]
};

// NOTE: From the API!
const perPage = 10;

function prepareParams(params, options) {
  // NOTE: first priority to options in URL, second to options and lastly fallback to defaultOptions
  let translations;

  if (params.translations && params.translations.length) {
    translations = params.translations.split(',');
  } else {
    translations = options.translations || defaultOptions.translations;
  }

  return { translations };
}

export function load(id, paging, params, options = defaultOptions) {
  const apiOptions = prepareParams(params, options);

  // TODO: move this to module/verses
  // cookie.save('lastVisit', JSON.stringify({ chapterId: id, verseId: from }));

  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    schema: { verses: [versesSchema] },
    promise: client => client.get(`/api/v3/chapters/${id}/verses`, {
      params: {
        ...paging,
        ...apiOptions
      }
    }),
    chapterId: id
  };
}

export function clearCurrent(id) {
  return {
    type: CLEAR_CURRENT,
    id
  };
}

export function clearCurrentWord() {
  return {
    type: CLEAR_CURRENT_WORD
  };
}

export function setCurrentVerse(id) {
  return {
    type: SET_CURRENT_VERSE,
    id
  };
}

export function setCurrentWord(id) {
  return {
    type: SET_CURRENT_WORD,
    id
  };
}

export function isLoaded(globalState, chapterId, paging) {
  return (
    globalState.verses.entities[chapterId] &&
    globalState.verses.entities[chapterId][`${chapterId}:${paging.offset || 1}`] &&
    globalState.verses.entities[chapterId][`${chapterId}:${paging.offset + paging.limit || perPage}`]
  );
}
