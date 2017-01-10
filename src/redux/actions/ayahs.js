import { ayahsSchema } from 'redux/schemas';

import { arrayOf } from 'normalizr';

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
  audio: 8,
  quran: 1,
  content: [19]
};

export function load(id, from, to, options = defaultOptions) {
  const { audio, quran, content } = options;

  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    schema: arrayOf(ayahsSchema),
    promise: client => client.get(`/v2/surahs/${id}/ayahs`, {
      params: {
        from,
        to,
        audio,
        quran,
        content
      }
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
