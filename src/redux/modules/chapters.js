import {
  LOAD_SUCCESS,
  LOAD_FAIL,
  LOAD_INFO,
  LOAD_INFO_SUCCESS,
  SET_CURRENT
} from 'redux/constants/chapters.js';

const initialState = {
  errored: false,
  loaded: false,
  loading: false,
  infoLoading: false,
  current: null,
  entities: {}
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case SET_CURRENT:
      return {
        ...state,
        current: action.current
      };
    case LOAD_SUCCESS: {
      const entities = state.entities;
      const { chapters } = action.result.entities;
      return {
        ...state,
        loaded: true,
        errored: false,
        entities: {
          ...entities,
          ...chapters
        }
      };
    }
    case LOAD_FAIL:
      return state;
    case LOAD_INFO:
      return {
        ...state,
        infoLoading: true
      };
    case LOAD_INFO_SUCCESS:
      return {
        ...state,
        entities: {
          ...state.entities,
          [action.id]: {
            ...state.entities[action.id],
            info: action.result
          }
        }
      };
    default:
      return state;
  }
}
