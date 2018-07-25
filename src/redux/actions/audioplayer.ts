import {
  SET_CURRENT_FILE,
  SET_CURRENT_WORD,
  PLAY_CURRENT_WORD,
  PLAY,
  PAUSE,
  NEXT,
  SET_AYAH,
  PREVIOUS,
  SET_REPEAT,
  TOGGLE_SCROLL,
  BUILD_ON_CLIENT,
  FETCH_AUDIOPLAYER,
  UPDATE,
} from '../constants/audioplayer';
import apiClient from '../../apiClient';

export function setCurrentFile(file) {
  return {
    type: SET_CURRENT_FILE,
    file,
  };
}

export function setCurrentWord(word) {
  return {
    type: SET_CURRENT_WORD,
    word,
  };
}

export function playCurrentWord(payload) {
  return {
    type: PLAY_CURRENT_WORD,
    payload,
  };
}

export function play() {
  return {
    type: PLAY,
  };
}

export function pause() {
  return {
    type: PAUSE,
  };
}

export function next(currentVerse) {
  return {
    type: NEXT,
    currentVerse,
  };
}

export function setVerse(currentVerse) {
  return {
    type: SET_AYAH,
    currentVerse,
  };
}

export function previous(currentVerse) {
  return {
    type: PREVIOUS,
    currentVerse,
  };
}

export function setRepeat(repeat) {
  return {
    type: SET_REPEAT,
    repeat,
  };
}

export function toggleScroll() {
  return {
    type: TOGGLE_SCROLL,
  };
}

export function buildOnClient(chapterId) {
  return {
    type: BUILD_ON_CLIENT,
    chapterId,
  };
}

export function update(payload) {
  return {
    type: UPDATE,
    payload,
  };
}

export function load({ chapterId, verseId, verseKey, audio }) {
  // eslint-disable-line
  return {
    type: FETCH_AUDIOPLAYER,
    promise: apiClient.get(
      `/api/v3/chapters/${chapterId}/verses/${verseId}/audio_files`,
      {
        params: {
          recitation: audio || 7, // NOTE: default, but should never be used
        },
      }
    ),
    verseKey,
    chapterId,
  };
}

export function isLoaded(files, verse) {
  return files[verse.verseKey];
}
