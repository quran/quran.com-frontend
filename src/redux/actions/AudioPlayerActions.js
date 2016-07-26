import {
  SET_USER_AGENT,
  SET_CURRENT_FILE,
  SET_CURRENT_WORD,
  PLAY,
  PAUSE,
  NEXT,
  SET_AYAH,
  PREVIOUS,
  SET_REPEAT,
  TOGGLE_SCROLL,
  BUILD_ON_CLIENT,
  UPDATE
  } from '../constants/AudioPlayerActionTypes.js';

export function setUserAgent(userAgent) {
  return {
    type: SET_USER_AGENT,
    userAgent
  };
}

export function setCurrentFile(file) {
  return {
    type: SET_CURRENT_FILE,
    file
  };
}

export function setCurrentWord(word) {
  return {
    type: SET_CURRENT_WORD,
    word
  };
}

export function play() {
  return {
    type: PLAY
  };
}

export function pause() {
  return {
    type: PAUSE
  };
}

export function next(currentAyah) {
  return {
    type: NEXT,
    currentAyah
  };
}

export function setAyah(currentAyah) {
  return {
    type: SET_AYAH,
    currentAyah
  };
}

export function previous(currentAyah) {
  return {
    type: PREVIOUS,
    currentAyah
  };
}

export function setRepeat(repeat) {
  return {
    type: SET_REPEAT,
    repeat
  };
}

export function toggleScroll() {
  return {
    type: TOGGLE_SCROLL
  };
}

export function buildOnClient(surahId) {
  return {
    type: BUILD_ON_CLIENT,
    surahId
  };
}

export function update(payload) {
  return {
    type: UPDATE,
    payload
  };
}
