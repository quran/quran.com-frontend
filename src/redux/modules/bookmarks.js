import {
  LOAD,
  LOAD_SUCCESS,
  LOAD_FAILURE,
  ADD_BOOKMARK,
  ADD_BOOKMARK_SUCCESS,
  ADD_BOOKMARK_FAILURE,
  REMOVE_BOOKMARK,
  REMOVE_BOOKMARK_SUCCESS,
  REMOVE_BOOKMARK_FAILURE
} from '../constants/bookmarks';

const initialState = {
  loaded: false,
  entities: {}
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD_SUCCESS: {
      const entities = state.entities;
      const { bookmarks } = action.result.entities;
      return {
        ...state,
        loaded: true,
        errored: false,
        entities: {
          ...entities,
          ...bookmarks
        }
      };
    }

    case ADD_BOOKMARK_SUCCESS: {
      return {
        ...state,
        entities: {
          ...state.entities,
          [action.ayahKey]: action.result
        }
      };
    }

    case REMOVE_BOOKMARK_SUCCESS: {
      return {
        ...state,
        entities: {
          ...state.entities,
          [action.ayahKey]: null
        }
      };
    }
    default:
      return state;
  }
}
