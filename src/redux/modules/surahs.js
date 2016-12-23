import {
  LOAD_SUCCESS,
  LOAD_FAIL,
  LOAD_INFO,
  LOAD_INFO_SUCCESS,
  LOAD_INFO_FAIL,
  SET_CURRENT
} from 'redux/constants/surahs.js';

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
      const { surahs } = action.result.entities;
      return {
        ...state,
        loaded: true,
        errored: false,
        entities: {
          ...entities,
          ...surahs
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
