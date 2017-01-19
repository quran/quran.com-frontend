import {
  LOAD_SUCCESS,
  ADD_BOOKMARK_SUCCESS,
  REMOVE_BOOKMARK_SUCCESS,
} from 'redux/constants/bookmarks';

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
