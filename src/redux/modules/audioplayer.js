/* eslint-disable no-case-declarations */
import { buildAudioFromHash, testIfSupported } from '../../helpers/buildAudio';
import { buildSegments, extractSegments } from '../../helpers/buildSegments';
import debug from '../../helpers/debug';

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
export const NEXT = '@@quran/audioplayer/NEXT';
export const SET_AYAH = '@@quran/audioplayer/SET';
const PREVIOUS = '@@quran/audioplayer/PREVIOUS';
const TOGGLE_REPEAT = '@@quran/audioplayer/TOGGLE_REPEAT';
const TOGGLE_SCROLL = '@@quran/audioplayer/TOGGLE_SCROLL';
const BUILD_ON_CLIENT = '@@quran/audioplayer/BUILD_ON_CLIENT';
const UPDATE = '@@quran/audioplayer/UPDATE';

const initialState = {
  files: {},
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
  isLoading: true
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case BUILD_ON_CLIENT: {
      debug('reducer:audioplayer', 'BUILD_ON_CLIENT init');
      const audioFromHash = buildAudioFromHash(state.files[action.surahId], state.userAgent);

      debug('reducer:audioplayer', 'BUILD_ON_CLIENT return');
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
        currentFile: Object.values(audioFromHash.files)[0],
        currentAyah: Object.keys(audioFromHash.files)[0]
      };
    }
    case AYAHS_CLEAR_CURRENT:
      return {
        ...state,
        files: {
          ...state.files,
          [action.id]: {}
        }
      };
    case AYAHS_LOAD:
      return {
        ...state,
        isLoading: false
      };
    case AYAHS_LOAD_SUCCESS: {
      debug('reducer:audioplayer', 'AYAHS_LOAD_SUCCESS init');
      let currentFile;
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

      const ayahs = action.result.entities.ayahs;
      const audioFromHash = __CLIENT__ ? buildAudioFromHash(ayahs, state.userAgent) : ayahs;
      const files = Object.assign(
        {},
        state.files[action.surahId],
        __CLIENT__ ? audioFromHash.files : audioFromHash
      );

      const currentAyah = state.currentAyah ? state.currentAyah : Object.keys(files)[0];

      if (state.currentFile && state.currentFile === Object.values(files)[0]) {
        // If the same file is being used, for example in lazy loading, then keep same file
        currentFile = state.currentFile;
      } else {
        if (state.currentAyah || currentAyah) {
          // If the user changes the reciter, we want to maintain the file where
          // the user last left off
          currentFile = files[state.currentAyah || currentAyah];
        } else {
          // Otherwise, just choose the first file
          currentFile = Object.values(files)[0];
        }
      }

      debug('reducer:audioplayer', 'AYAHS_LOAD_SUCCESS return');
      return {
        ...state,
        isSupported,
        currentAyah,
        currentFile,
        surahId: action.surahId,
        isLoadedOnClient: __CLIENT__,
        files: {
          ...state.files,
          [action.surahId]: files
        },
        segments: {
          ...state.segments,
          [action.surahId]: extractSegments(action.result.entities.ayahs)
        }
      };
    }
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
      const [surahId, ayahNum] = action.currentAyah.split(':');
      const nextId = `${surahId}:${parseInt(ayahNum, 10) + 1}`;

      return {
        ...state,
        segments: {
          ...state.segments,
          [surahId]: {
            ...state.segments[surahId],
            [nextId]: buildSegments(state.segments[surahId][nextId])
          }
        },
        currentAyah: nextId,
        currentFile: state.files[surahId][nextId],
        currentTime: 0
      };
    }

    case SET_AYAH: {

      const [surahId, ayahNum] = action.currentAyah.split(':');
      const currentAyah = `${surahId}:${parseInt(ayahNum, 10)}`;

      return {
        ...state,
        segments: {
          ...state.segments,
          [surahId]: {
            ...state.segments[surahId],
            [currentAyah]: buildSegments(state.segments[surahId][currentAyah])
          }
        },
        currentAyah,
        currentFile: state.files[surahId][currentAyah],
        currentTime: 0
      };
    }

    case PREVIOUS: {
      const [surahId, ayahNum] = action.currentAyah.split(':');
      const nextId = `${surahId}:${parseInt(ayahNum, 10) - 1}`;

      return {
        ...state,
        currentAyah: nextId,
        currentFile: state.files[surahId][nextId],
        currentTime: 0
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
    case SET_CURRENT_WORD: {
      if (!action.word) return state;

      const [surahId, ayahNum, word] = action.word.split(':');
      let currentTime = null;

      if (state.files[surahId][`${surahId}:${ayahNum}`] === state.currentFile) {
        // When the files are the same, set the current time to that word
        currentTime = state.segments[surahId][`${surahId}:${ayahNum}`].words[word].startTime;
        state.currentFile.currentTime = currentTime; // eslint-disable-line no-param-reassign

        return {
          ...state,
          currentWord: action.word,
          currentTime
        };
      }

      // When the files are not the same.
      const nextId = `${surahId}:${ayahNum}`;
      const currentFile = state.files[surahId][nextId];
      const segment = buildSegments(state.segments[surahId][nextId]);
      currentTime = segment.words[word].startTime;
      currentFile.currentTime = currentTime;

      return {
        ...state,
        currentWord: action.word,
        currentAyah: nextId,
        isPlaying: false,
        currentTime,
        currentFile,
        segments: {
          ...state.segments,
          [surahId]: {
            ...state.segments[surahId],
            [nextId]: segment
          }
        }
      };

    }
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
