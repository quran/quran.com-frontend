/* eslint-disable no-case-declarations */
import { buildAudioForAyah } from 'helpers/buildAudio';
import { buildSegments } from 'helpers/buildSegments';

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
  UPDATE,
  // LOAD,
  LOAD_SUCCESS
  // LOAD_FAIL
} from 'redux/constants/audioplayer.js';

import {
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
  duration: 1,
  isPlaying: false,
  repeat: {
    from: undefined,
    to: undefined,
    times: Infinity
  },
  shouldScroll: true,
  isLoading: true,
  segments: {}
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
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
    case LOAD_SUCCESS: {
      const data = buildAudioForAyah(action.result.audioFile);

      return {
        ...state,
        loaded: true,
        loading: false,
        errored: false,
        files: {
          ...state.files,
          [action.chapterId]: {
            ...state.files[action.chapterId],
            [action.verseKey]: data.audio
          }
        },
        segments: {
          ...state.segments,
          [action.chapterId]: {
            ...state.segments[action.chapterId],
            [action.verseKey]: buildSegments(data.segments)
          }
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
      return {
        ...state,
        isPlaying: true
      };
    }
    case PAUSE: {
      return {
        ...state,
        isPlaying: false
      };
    }
    case NEXT: {
      const [chapterId, ayahNum] = action.currentVerse.split(':');
      const nextId = `${chapterId}:${parseInt(ayahNum, 10) + 1}`;

      return {
        ...state,
        currentVerse: nextId
      };
    }
    case PREVIOUS: {
      const [chapterId, ayahNum] = action.currentVerse.split(':');
      const nextId = `${chapterId}:${parseInt(ayahNum, 10) - 1}`;

      return {
        ...state,
        currentVerse: nextId,
        currentFile: state.files[chapterId][nextId]
      };
    }
    case SET_AYAH: {
      const [chapterId, ayahNum] = action.currentVerse.split(':');
      const currentVerse = `${chapterId}:${parseInt(ayahNum, 10)}`;
      const currentFile = state.files[chapterId][currentVerse];

      return {
        ...state,
        currentVerse,
        currentFile
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

      const currentTime =
        state.segments[chapterId][nextId].words[position].startTime;

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
