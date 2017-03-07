import cookie from 'react-cookie';
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

// For safe measure
const defaultOptions = {
  audio: 8,
  translations: [20]
};

export function load(id, from, to, options = defaultOptions) {
  const { audio, translations } = options;

  cookie.save('lastVisit', JSON.stringify({ chapterId: id, verseId: from }));

  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    schema: { verses: [versesSchema] },
    promise: client => client.get(`/api/v3/chapters/${id}/verses`, {
      params: {
        from,
        to,
        recitation: audio,
        translations
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

export function setcurrentVerse(id) {
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
