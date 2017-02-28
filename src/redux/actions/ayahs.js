import cookie from 'react-cookie';
import { ayahsSchema } from 'redux/schemas';

import {
  LOAD,
  LOAD_SUCCESS,
  LOAD_FAIL,
  CLEAR_CURRENT,
  SET_CURRENT_AYAH,
  SET_CURRENT_WORD,
  CLEAR_CURRENT_WORD
  } from 'redux/constants/ayahs.js';

// For safe measure
const defaultOptions = {
  recitation: 8,
  translations: [71]
};

function prepareParams(from, audio, content) {
  return { language: cookie.load('currentLocale') || config.defaultLocale,
           page: from,
           recitation: audio,
           translations: content
         };
}

export function load(id, from, to, options = defaultOptions) {
  const { audio, content } = options;

  cookie.save('lastVisit', JSON.stringify({ surahId: id, ayahId: from }));

  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    schema: [ayahsSchema],
    promise: client => client.get(`/api/v3/chapters/${id}/verses`, {
      params: prepareParams(
        from,
        audio,
        content
      )
    }),
    surahId: id
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

export function setCurrentAyah(id) {
  return {
    type: SET_CURRENT_AYAH,
    id
  };
}

export function setCurrentWord(id) {
  return {
    type: SET_CURRENT_WORD,
    id
  };
}
