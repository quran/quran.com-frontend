/* eslint-disable no-case-declarations */
import { buildAudioFromHash, testIfSupported } from '../../helpers/buildAudio';

import { LOAD_SUCCESS as AYAHS_LOAD_SUCCESS, LOAD as AYAHS_LOAD, CLEAR_CURRENT as AYAHS_CLEAR_CURRENT, SET_CURRENT_AYAH } from './ayahs';

const SET_USER_AGENT = '@@quran/audioplayer/SET_USER_AGENT';
const SET_CURRENT_FILE = '@@quran/audioplayer/SET_CURRENT_FILE';
const START = '@@quran/audioplayer/START';
const STOP = '@@quran/audioplayer/STOP';
const TOGGLE_REPEAT = '@@quran/audioplayer/TOGGLE_REPEAT';
const TOGGLE_SCROLL = '@@quran/audioplayer/TOGGLE_SCROLL';
const BUILD_ON_CLIENT = '@@quran/audioplayer/BUILD_ON_CLIENT';

const initialState = {
  files: {},
  segments: {},
  userAgent: null,
  currentFile: null,
  isSupported: true,
  isStarted: false,
  shouldRepeat: false,
  shouldScroll: false,
  isLoadedOnClient: false
};

let audioFromHash;
let files;
let segments;

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case BUILD_ON_CLIENT:
      audioFromHash = buildAudioFromHash(state.files[action.surahId], state.userAgent);
      files = Object.assign({}, state.files[action.surahId], audioFromHash.files);
      segments = Object.assign({}, state.segments[action.surahId], audioFromHash.segments);

      return {
        ...state,
        isLoadedOnClient: true,
        files: {
          ...state.files,
          [action.surahId]: files
        },
        segments: {
          ...state.segments,
          [action.surahId]: segments
        }
      };
    case AYAHS_CLEAR_CURRENT:
      return {
        ...state,
        files: {
          ...state.files,
          [action.id]: {}
        },
        segments: {
          ...state.segments,
          [action.id]: {}
        },
      };
    case AYAHS_LOAD:
      return {
        ...state,
        isLoadedOnClient: false
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
      audioFromHash = __CLIENT__ ? buildAudioFromHash(incoming, state.userAgent) : incoming;
      files = Object.assign({}, state.files[action.surahId], __CLIENT__ ? audioFromHash.files : audioFromHash);
      segments = Object.assign({}, state.segments[action.surahId], audioFromHash.segments);

      return {
        ...state,
        currentFile,
        isSupported,
        surahId: action.surahId,
        isLoadedOnClient: __CLIENT__,
        files: {
          ...state.files,
          [action.surahId]: files
        },
        segments: {
          ...state.segments,
          [action.surahId]: segments
        }
      };
    case SET_USER_AGENT:
      return {
        ...state,
        userAgent: action.userAgent
      };
    case START:
      console.debug('START');
      return {
        ...state,
        isStarted: true
      };
    case STOP:
      console.debug('STOP');
      return {
        ...state,
        isStarted: false
      };
    case TOGGLE_REPEAT:
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
    case SET_CURRENT_AYAH:
      return {
        ...state,
        currentFile: action.id
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

export function start() {
  return {
    type: START
  };
}

export function stop() {
  return {
    type: STOP
  };
}

export function toggleRepeat() {
  return {
    type: TOGGLE_REPEAT
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
