import { buildAudioFromHash, testIfSupported } from 'helpers/buildAudio';

import { LOAD_SUCCESS as AYAHS_LOAD_SUCCESS } from './ayahs';

const SET_USER_AGENT = '@@quran/audioplayer/SET_USER_AGENT';
const SET_CURRENT_FILE = '@@quran/audioplayer/SET_CURRENT_FILE';
const PLAY = '@@quran/audioplayer/PLAY';
const PAUSE = '@@quran/audioplayer/PAUSE';
const PLAY_PAUSE = '@@quran/audioplayer/PLAY_PAUSE';
const REPEAT = '@@quran/audioplayer/REPEAT';

const initialState = {
  files: {},
  userAgent: null,
  currentFile: null,
  isSupported: true,
  isPlaying: false,
  shouldRepeat: false
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
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

      const [surahId] = action.result.result[0].split(':');
      const incoming = action.result.entities.ayahs;
      const newFiles = buildAudioFromHash(incoming, state.userAgent);
      const files = Object.assign({}, state.files[surahId], newFiles);

      return {
        ...state,
        currentFile: state.currentFile ? state.currentFile : action.result.result[0],
        files: {
          ...state.files,
          [surahId]: files
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
