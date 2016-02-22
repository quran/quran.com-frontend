const TOGGLE_READING_MODE = '@@quran/options/TOGGLE_READING_MODE';
const SET_OPTION = '@@quran/options/SET_OPTION';

const initialState = {
  isReadingMode: false,
  audio: 8,
  quran: 1,
  content: [19]
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case TOGGLE_READING_MODE:
      return {
        ...state,
        isReadingMode: !state.isReadingMode
      };
    case SET_OPTION:
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
}

export function isReadingMode(globalState) {
  return globalState.options.isReadingMode;
}

export function setOption(payload) {
  return {
    type: SET_OPTION,
    payload
  };
}

export function toggleReadingMode() {
  return {
    type: TOGGLE_READING_MODE
  };
}
