import { LOAD, LOAD_SUCCESS, LOAD_FAIL } from 'redux/constants/juzs.js';

export const INITIAL_STATE = {
  errored: false,
  loaded: false,
  loading: false,
  entities: {}
};

export default function reducer(state = INITIAL_STATE, action = {}) {
  switch (action.type) {
    case LOAD_SUCCESS: {
      const entities = state.entities;
      const { juzs } = action.result.entities;
      return {
        ...state,
        loaded: true,
        loading: false,
        entities: {
          ...entities,
          ...juzs
        }
      };
    }
    case LOAD_FAIL:
      return {
        ...state,
        errored: true,
        loading: false
      };
    case LOAD:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
}
