/* eslint-disable no-case-declarations */
import { buildAudioFromHash, testIfSupported } from '../../helpers/buildAudio';

import { LOAD_SUCCESS as AYAHS_LOAD_SUCCESS } from './ayahs';

const SET_USER_AGENT = '@@quran/audioplayer/SET_USER_AGENT';
const SET_CURRENT_FILE = '@@quran/audioplayer/SET_CURRENT_FILE';
const PLAY = '@@quran/audioplayer/PLAY';
const PAUSE = '@@quran/audioplayer/PAUSE';
const PLAY_PAUSE = '@@quran/audioplayer/PLAY_PAUSE';
const REPEAT = '@@quran/audioplayer/REPEAT';
const TOGGLE_SCROLL = '@@quran/audioplayer/TOGGLE_SCROLL';
const BUILD_ON_CLIENT = '@@quran/audioplayer/BUILD_ON_CLIENT';

const initialState = {
  files: {},
  userAgent: null,
  currentFile: null,
  isSupported: true,
  isPlaying: false,
  shouldRepeat: false,
  shouldScroll: false,
  isLoadedOnClient: false
};

let newFiles;
let files;

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case BUILD_ON_CLIENT:
      newFiles = buildAudioFromHash(state.files[action.surahId], state.userAgent);
      files = Object.assign({}, state.files[action.surahId], newFiles);

      return {
        ...state,
        isLoadedOnClient: true,
        files: {
          ...state.files,
          [action.surahId]: files
        }
      };
    case AYAHS_LOAD_SUCCESS:
      const isSupported = testIfSupported(
        action.result.entities.ayahs[action.result.result[0]],
        state.userAgent
      );

      let currentFile = state.currentFile ? state.currentFile : action.result.result[0];

      if (parseInt(state.surahId, 10) !== action.surahId) {
        currentFile = action.result.result[0];
      }

      if (!isSupported) {
        return {
          ...state,
          isSupported: false
        };
      }

      const incoming = action.result.entities.ayahs;
      newFiles = __CLIENT__ ? buildAudioFromHash(incoming, state.userAgent) : incoming;
      files = Object.assign({}, state.files[action.surahId], newFiles);

      return {
        ...state,
        currentFile,
        isSupported,
        surahId: action.surahId,
        isLoadedOnClient: __CLIENT__,
        files: {
          ...state.files,
          [action.surahId]: files
        }
      };
    case SET_USER_AGENT:
      return {
        ...state,
        userAgent: action.userAgent
      };
    case PLAY:
      return {
        ...state,
        isPlaying: true
      };
    case PAUSE:
      return {
        ...state,
        isPlaying: false
      };
    case PLAY_PAUSE:
      return {
        ...state,
        isPlaying: !state.isPlaying
      };
    case REPEAT:
      return {
        ...state,
        shouldRepeat: !state.shouldRepeat
      };
    case TOGGLE_SCROLL:
      return {
        ...state,
        shouldScroll: !state.shouldScroll
      };
    case SET_CURRENT_FILE:
      return {
        ...state,
        currentFile: action.file
      };
    default:
      return state;
  }
}

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

export function playPause() {
  return {
    type: PLAY_PAUSE
  };
}

export function repeat() {
  return {
    type: REPEAT
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
