import {
  LOAD_SUCCESS,
  LOAD_FAIL,
  SET_CURRENT
  } from '../constants/surahsActionTypes.js';

const initialState = {
  errored: false,
  loaded: false,
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
    case LOAD_SUCCESS:
      const entities = state.entities;
      const {surahs} = action.result.entities;
      return {
        ...state,
        loaded: true,
        errored: false,
        entities: {
          ...entities,
          ...surahs
        }
      };
    case LOAD_FAIL:
      console.log(action);
      return state;
    default:
      return state;
  }
}
