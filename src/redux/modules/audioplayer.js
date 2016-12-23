/* eslint-disable no-case-declarations */
import { buildAudioFromHash } from 'helpers/buildAudio';
import { buildSegments, extractSegments } from 'helpers/buildSegments';
import debug from 'helpers/debug';

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
  } from 'redux/constants/audioplayer.js';

import {
  LOAD_SUCCESS as AYAHS_LOAD_SUCCESS,
  LOAD as AYAHS_LOAD,
  CLEAR_CURRENT as AYAHS_CLEAR_CURRENT,
  SET_CURRENT_AYAH
  } from './ayahs';

export { NEXT, SET_AYAH };

const initialState = {
  files: {},
  userAgent: null,
  currentFile: null,
  currentAyah: null,
  currentWord: null,
  currentTime: 0,
  isPlaying: false,
  repeat: {
    from: undefined,
    to: undefined,
    times: Infinity
  },
  shouldScroll: true,
  isLoadedOnClient: false,
  isLoading: true,
  segments: {}
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case BUILD_ON_CLIENT: {
      debug('reducer:audioplayer', 'BUILD_ON_CLIENT init');
      const audioFromHash = buildAudioFromHash(state.files[action.surahId], state.userAgent);

      debug('reducer:audioplayer', 'BUILD_ON_CLIENT return');

      const stateFiles = state.files;
      const filesById = stateFiles[action.surahId];
      const filesFromHash = audioFromHash.files;

      return {
        ...state,
        isLoadedOnClient: true,
        files: {
          ...stateFiles,
          [action.surahId]: {
            ...filesById,
            ...filesFromHash
          }
        },
        currentFile: Object.values(audioFromHash.files)[0],
        currentAyah: Object.keys(audioFromHash.files)[0]
      };
    }
    case AYAHS_CLEAR_CURRENT: {
      const stateFilesCurrent = state.files;

      return {
        ...state,
        files: {
          ...stateFilesCurrent,
          [action.id]: {}
        }
      };
    }
    case AYAHS_LOAD: {
      return {
        ...state,
        isLoading: false
      };
    }
    case AYAHS_LOAD_SUCCESS: {
      debug('reducer:audioplayer', 'AYAHS_LOAD_SUCCESS init');

      const ayahs = action.result.entities.ayahs;
      const audioFromHash = __CLIENT__ ? buildAudioFromHash(ayahs, state.userAgent) : ayahs;
      const files = Object.assign(
        {},
        state.files[action.surahId],
        __CLIENT__ ? audioFromHash.files : audioFromHash
      );

      const currentAyah = state.currentAyah ? state.currentAyah : Object.keys(files)[0];

      let currentFile;
      if (state.currentFile && state.currentFile === Object.values(files)[0]) {
        // If the same file is being used, for example in lazy loading, then keep same file
        currentFile = state.currentFile;
      } else if (state.currentAyah || currentAyah) {
        // If the user changes the reciter, we want to maintain the file where
        // the user last left off
        currentFile = files[state.currentAyah || currentAyah];
      } else {
        // Otherwise, just choose the first file
        currentFile = Object.values(files)[0];
      }

      const stateFiles = state.files;
      const stateSegments = state.segments;

      debug('reducer:audioplayer', 'AYAHS_LOAD_SUCCESS return');
      return {
        ...state,
        currentAyah,
        currentFile,
        surahId: action.surahId,
        isLoadedOnClient: __CLIENT__,
        files: {
          ...stateFiles,
          [action.surahId]: files
        },
        segments: {
          ...stateSegments,
          [action.surahId]: extractSegments(action.result.entities.ayahs)
        }
      };
    }
    case UPDATE: {
      const { payload } = action;
      return {
        ...state,
        ...payload
      };
    }
    case SET_USER_AGENT: {
      const { userAgent } = action;
      return {
        ...state,
        userAgent
      };
    }
    case PLAY: {
      if (state.currentFile) {
        state.currentFile.play();
        return {
          ...state,
          isPlaying: true
        };
      }

      return state;
    }
    case PAUSE: {
      if (state.currentFile) {
        state.currentFile.pause();

        return {
          ...state,
          isPlaying: false
        };
      }

      return state;
    }
    case NEXT: {
      const [surahId, ayahNum] = action.currentAyah.split(':');
      const nextId = `${surahId}:${parseInt(ayahNum, 10) + 1}`;
      const stateSegments = state.segments;
      const stateSegmentsId = stateSegments[surahId];

      return {
        ...state,
        currentAyah: nextId,
        currentFile: state.files[surahId][nextId],
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
    case SET_AYAH: {
      const [surahId, ayahNum] = action.currentAyah.split(':');
      const currentAyah = `${surahId}:${parseInt(ayahNum, 10)}`;
      const stateSegments = state.segments;
      const stateSegmentsId = state.segments[surahId];
      const currentFile = state.files[surahId][currentAyah];

      return {
        ...state,
        currentAyah,
        currentFile,
        currentTime: 0
      };
    }
    case SET_REPEAT: {
      const { repeat } = action;
      return {
        ...state,
        repeat
      };
    }
    case TOGGLE_SCROLL: {
      return {
        ...state,
        shouldScroll: !state.shouldScroll
      };
    }
    case SET_CURRENT_FILE: {
      return {
        ...state,
        currentFile: action.file
      };
    }
    case SET_CURRENT_WORD: {
      if (!action.word) return state;
      let currentTime = null;
      const [surahId, ayahNum, word] = action.word.split(':');
      const nextId = `${surahId}:${ayahNum}`;
      if (!state.segments[surahId][nextId]) return state;
      if (state.files[surahId][nextId] === state.currentFile) {
        // When the files are the same, set the current time to that word
        currentTime = state.segments[surahId][nextId].words[word].startTime;
        state.currentFile.currentTime = currentTime; // eslint-disable-line no-param-reassign

        return {
          ...state,
          currentWord: action.word,
          currentTime
        };
      }

      // When the files are not the same.
      const currentFile = state.files[surahId][nextId];
      const segment = buildSegments(state.segments[surahId][nextId]);
      currentTime = segment.words[word].startTime;
      currentFile.currentTime = currentTime;
      const stateSegments = state.segments;
      const stateSegmentsId = state.segments[surahId];

      return {
        ...state,
        currentWord: action.word,
        currentAyah: nextId,
        isPlaying: false,
        currentTime,
        currentFile,
        segments: {
          ...stateSegments,
          [surahId]: {
            ...stateSegmentsId,
            [nextId]: segment
          }
        }
      };
    }
    case SET_CURRENT_AYAH: {
      return {
        ...state,
        currentAyah: action.id
      };
    }
    default: {
      return state;
    }
  }
}
