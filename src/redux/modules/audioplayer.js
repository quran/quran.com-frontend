/* eslint-disable no-case-declarations */
import { buildAudioFromHash } from 'helpers/buildAudio';
import { buildSegments, extractSegments } from 'helpers/buildSegments';
import debug from 'helpers/debug';

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
  UPDATE
  } from 'redux/constants/audioplayer.js';

import {
  LOAD_SUCCESS as VERSES_LOAD_SUCCESS,
  LOAD as VERSES_LOAD,
  CLEAR_CURRENT as VERSES_CLEAR_CURRENT,
  SET_CURRENT_VERSE
} from './verses';

export { NEXT, SET_AYAH };

const initialState = {
  files: {},
  currentFile: null,
  currentVerse: null,
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
      const audioFromHash = buildAudioFromHash(state.files[action.chapterId], state.userAgent);

      debug('reducer:audioplayer', 'BUILD_ON_CLIENT return');

      const stateFiles = state.files;
      const filesById = stateFiles[action.chapterId];
      const filesFromHash = audioFromHash.files;

      return {
        ...state,
        isLoadedOnClient: true,
        files: {
          ...stateFiles,
          [action.chapterId]: {
            ...filesById,
            ...filesFromHash
          }
        },
        currentFile: Object.values(audioFromHash.files)[0],
        currentVerse: Object.keys(audioFromHash.files)[0]
      };
    }
    case VERSES_CLEAR_CURRENT: {
      const stateFilesCurrent = state.files;

      return {
        ...state,
        files: {
          ...stateFilesCurrent,
          [action.id]: {}
        }
      };
    }
    case VERSES_LOAD: {
      return {
        ...state,
        isLoading: false
      };
    }
    case VERSES_LOAD_SUCCESS: {
      debug('reducer:audioplayer', 'VERSES_LOAD_SUCCESS init');

      const verses = action.result.entities.verses;
      const audioFromHash = __CLIENT__ ? buildAudioFromHash(verses, state.userAgent) : verses;
      const files = Object.assign(
        {},
        state.files[action.chapterId],
        __CLIENT__ ? audioFromHash.files : audioFromHash
      );

      const currentVerse = state.currentVerse ? state.currentVerse : Object.keys(files)[0];

      let currentFile;
      if (state.currentFile && state.currentFile === Object.values(files)[0]) {
        // If the same file is being used, for example in lazy loading, then keep same file
        currentFile = state.currentFile;
      } else if (state.currentVerse || currentVerse) {
        // If the user changes the reciter, we want to maintain the file where
        // the user last left off
        currentFile = files[state.currentVerse || currentVerse];
      } else {
        // Otherwise, just choose the first file
        currentFile = Object.values(files)[0];
      }

      const stateFiles = state.files;
      const stateSegments = state.segments;

      debug('reducer:audioplayer', 'VERSES_LOAD_SUCCESS return');
      return {
        ...state,
        currentVerse,
        currentFile,
        chapterId: action.chapterId,
        isLoadedOnClient: __CLIENT__,
        files: {
          ...stateFiles,
          [action.chapterId]: files
        },
        segments: {
          ...stateSegments,
          [action.chapterId]: extractSegments(action.result.entities.verses)
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
      const [chapterId, ayahNum] = action.currentVerse.split(':');
      const nextId = `${chapterId}:${parseInt(ayahNum, 10) + 1}`;

      return {
        ...state,
        currentVerse: nextId,
        currentFile: state.files[chapterId][nextId],
        currentTime: 0
      };
    }
    case PREVIOUS: {
      const [chapterId, ayahNum] = action.currentVerse.split(':');
      const nextId = `${chapterId}:${parseInt(ayahNum, 10) - 1}`;

      return {
        ...state,
        currentVerse: nextId,
        currentFile: state.files[chapterId][nextId],
        currentTime: 0
      };
    }
    case SET_AYAH: {
      const [chapterId, ayahNum] = action.currentVerse.split(':');
      const currentVerse = `${chapterId}:${parseInt(ayahNum, 10)}`;
      const currentFile = state.files[chapterId][currentVerse];

      return {
        ...state,
        currentVerse,
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
      const [chapterId, ayahNum, word] = action.word.split(':');
      const nextId = `${chapterId}:${ayahNum}`;
      if (!state.segments[chapterId][nextId]) return state;
      if (state.files[chapterId][nextId] === state.currentFile) {
        // When the files are the same, set the current time to that word
        currentTime = state.segments[chapterId][nextId].words[word].startTime;
        state.currentFile.currentTime = currentTime; // eslint-disable-line no-param-reassign

        return {
          ...state,
          currentWord: action.word,
          currentTime
        };
      }

      // When the files are not the same.
      const currentFile = state.files[chapterId][nextId];
      const segment = buildSegments(state.segments[chapterId][nextId]);
      currentTime = segment.words[word].startTime;
      currentFile.currentTime = currentTime;
      const stateSegments = state.segments;
      const stateSegmentsId = state.segments[chapterId];

      return {
        ...state,
        currentWord: action.word,
        currentVerse: nextId,
        isPlaying: false,
        currentTime,
        currentFile,
        segments: {
          ...stateSegments,
          [chapterId]: {
            ...stateSegmentsId,
            [nextId]: segment
          }
        }
      };
    }
    case PLAY_CURRENT_WORD: {
      if (!action.payload) return state;

      const { word, position } = action.payload;
      const [chapterId, ayahNum] = word.verseKey.split(':');
      const nextId = `${chapterId}:${ayahNum}`;
      const currentFile = state.files[chapterId][nextId];

      if (!state.segments[chapterId][nextId].words[position]) return state;

      const currentTime = state.segments[chapterId][nextId].words[position].startTime;
      const endTime = state.segments[chapterId][nextId].words[position].endTime;
      currentFile.currentTime = currentTime;

      const int = setInterval(() => {
        if (currentFile.currentTime > endTime) {
          currentFile.pause();
          clearInterval(int);
        }
      }, 10);
      currentFile.play();

      return {
        ...state,
        currentWord: word
      };
    }
    case SET_CURRENT_VERSE: {
      return {
        ...state,
        currentVerse: action.id
      };
    }
    default: {
      return state;
    }
  }
}
