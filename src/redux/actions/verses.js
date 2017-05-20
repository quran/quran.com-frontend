import { versesSchema } from 'redux/schemas';

import {
  LOAD,
  LOAD_SUCCESS,
  LOAD_FAIL,
  CLEAR_CURRENT,
  SET_CURRENT_VERSE,
  SET_CURRENT_WORD,
  CLEAR_CURRENT_WORD,
  LOAD_TAFSIR,
  LOAD_TAFSIR_SUCCESS,
  LOAD_TAFSIR_FAIL
} from 'redux/constants/verses.js';

// NOTE: For safe measure
const defaultOptions = {
  translations: [20]
};

// NOTE: From the API!
const perPage = 10;

export function load(id, paging, options = defaultOptions) {
  const { translations } = options;

  // TODO: move this to module/verses
  // cookie.save('lastVisit', JSON.stringify({ chapterId: id, verseId: from }));

  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    schema: { verses: [versesSchema] },
    promise: client =>
      client.get(`/api/v3/chapters/${id}/verses`, {
        params: {
          ...paging,
          translations
        }
      }),
    chapterId: id
  };
}

export function loadTafsir(chapterId, verseId, tafsirId) {
  return {
    types: [LOAD_TAFSIR, LOAD_TAFSIR_SUCCESS, LOAD_TAFSIR_FAIL],
    promise: client =>
      client.get(`/api/v3/chapters/${chapterId}/verses/${verseId}/tafsirs`, {
        params: {
          tafsirs: tafsirId
        }
      }),
    tafsirId
  };
}

export function isTafsirLoaded(globalState, chapterId, verseId, tafsirId) {
  const verses = globalState.verses.entities[chapterId];
  const verseKey = `${chapterId}:${verseId}`;

  return verses && globalState.verses.tafsirs[`${verseKey}-${tafsirId}`];
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
  if (paging.offset) {
    return (
      globalState.verses.entities[chapterId] &&
      globalState.verses.entities[chapterId][
        `${chapterId}:${paging.offset ? paging.offset + 1 : 1}`
      ] &&
      globalState.verses.entities[chapterId][
        `${chapterId}:${paging.offset && paging.limit ? paging.offset + paging.limit : perPage}`
      ]
    );
  }

  return (
    globalState.verses.entities[chapterId] &&
    globalState.verses.entities[chapterId][`${chapterId}:1`]
  );
}
