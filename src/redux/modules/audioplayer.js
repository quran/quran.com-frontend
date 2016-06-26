/* eslint-disable no-case-declarations */
import { buildAudioFromHash, testIfSupported } from '../../helpers/buildAudio';

import {
  LOAD_SUCCESS as AYAHS_LOAD_SUCCESS,
  LOAD as AYAHS_LOAD,
  CLEAR_CURRENT as AYAHS_CLEAR_CURRENT,
  SET_CURRENT_AYAH
} from './ayahs';

const SET_USER_AGENT = '@@quran/audioplayer/SET_USER_AGENT';
const SET_CURRENT_FILE = '@@quran/audioplayer/SET_CURRENT_FILE';
const SET_CURRENT_WORD = '@@quran/audioplayer/SET_CURRENT_WORD';
const START = '@@quran/audioplayer/START';
const STOP = '@@quran/audioplayer/STOP';
const NEXT = '@@quran/audioplayer/NEXT';
const PREVIOUS = '@@quran/audioplayer/PREVIOUS';
const TOGGLE_REPEAT = '@@quran/audioplayer/TOGGLE_REPEAT';
const TOGGLE_SCROLL = '@@quran/audioplayer/TOGGLE_SCROLL';
const BUILD_ON_CLIENT = '@@quran/audioplayer/BUILD_ON_CLIENT';
const UPDATE = '@@quran/audioplayer/UPDATE';

const initialState = {
  files: {},
  segments: {},
  userAgent: null,
  currentFile: null,
  currentAyah: null,
  currentWord: null,
  currentTime: 0,
  isSupported: true,
  isPlaying: false,
  shouldRepeat: false,
  shouldScroll: false,
  isLoadedOnClient: false,
  progress: 0
};

let audioFromHash;
let files;
let segments;

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case BUILD_ON_CLIENT:
      audioFromHash = buildAudioFromHash(state.files[action.surahId], state.userAgent);

      return {
        ...state,
        isLoadedOnClient: true,
        files: {
          ...state.files,
          [action.surahId]: {
            ...state.files[action.surahId],
            ...audioFromHash.files
          }
        },
        segments: {
          ...state.segments,
          [action.surahId]: {
            ...state.segments[action.surahId],
            ...audioFromHash.segments
          }
        },
        currentFile: Object.values(audioFromHash.files)[0],
        currentAyah: Object.keys(audioFromHash.files)[0]
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

      if (!isSupported) {
        return {
          ...state,
          isSupported: false
        };
      }

      const incoming = action.result.entities.ayahs;
      audioFromHash = __CLIENT__ ? buildAudioFromHash(incoming, state.userAgent) : incoming;
      files = Object.assign(
        {},
        state.files[action.surahId],
        __CLIENT__ ? audioFromHash.files : audioFromHash
      );
      segments = Object.assign({}, state.segments[action.surahId], audioFromHash.segments);

      return {
        ...state,
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
    case UPDATE:
      return {
        ...state,
        ...action.payload
      };
    case SET_USER_AGENT:
      return {
        ...state,
        userAgent: action.userAgent
      };
    case START:
      state.currentFile.play();

      return {
        ...state,
        isPlaying: true
      };
    case STOP:
      state.currentFile.pause();

      return {
        ...state,
        isPlaying: false
      };

    case NEXT: {
      const surahId = state.currentAyah.split(':')[0];
      const ayahNum = state.currentAyah.split(':')[1];
      const nextId = `${surahId}:${parseInt(ayahNum, 10) + 1}`;

      return {
        ...state,
        currentAyah: nextId,
        currentFile: state.files[surahId][nextId],
        progress: 0
      };
    }
    case PREVIOUS: {
      const surahId = state.currentAyah.split(':')[0];
      const ayahNum = state.currentAyah.split(':')[1];
      const nextId = `${surahId}:${parseInt(ayahNum, 10) - 1}`;

      return {
        ...state,
        currentAyah: nextId,
        currentFile: state.files[surahId][nextId],
        progress: 0
      };
    }
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
    case SET_CURRENT_WORD:
      return {
        ...state,
        currentWord: action.word
      };
    case SET_CURRENT_AYAH:
      return {
        ...state,
        currentAyah: action.id
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

export function setCurrentWord(word) {
  return {
    type: SET_CURRENT_WORD,
    word
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

export function next() {
  return {
    type: NEXT
  };
}

export function previous() {
  return {
    type: PREVIOUS
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

export function update(payload) {
  return {
    type: UPDATE,
    payload
  };
}
