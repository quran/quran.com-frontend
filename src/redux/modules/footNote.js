import {
  LOAD,
  LOAD_SUCCESS,
  LOAD_FAIL
} from 'redux/constants/footNote';

const initialState = {
  footNote: null
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
        footNote: action.result.entities.foot_note,
        loaded: true,
        loading: false
      };
    }
    default:
      return state;
  }
}
