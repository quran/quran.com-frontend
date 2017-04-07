import {
  LOAD,
  LOAD_SUCCESS,
  LOAD_FAIL
} from 'redux/constants/audioFiles.js';

export {
  LOAD,
  LOAD_SUCCESS
};

const initialState = {
  errored: false,
  loaded: false,
  loading: false,
  entities: {},
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD: {
      return {
        ...state,
        loaded: false,
        loading: true
      };
    }
    case LOAD_SUCCESS: {
      return {
        ...state,
        loaded: true,
        loading: false,
        errored: false,
        entities: {
          ...state.entities,
          [action.verseKey]: action.result.audioFile
        }
      };
    }
    case LOAD_FAIL: {
      return state;
    }
    default:
      return state;
  }
}
