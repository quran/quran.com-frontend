import cookie from 'react-cookie';

import {
  FACEBOOK_SUCCESS,
  FACEBOOK_FAILURE,
  LOGOUT_SUCCESS,
  LOAD_SUCCESS
} from '../constants/auth';

const initialState = {
  loaded: false
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.result.user
      };
    case FACEBOOK_SUCCESS:
      cookie.save('accessToken', action.result.user.accessToken);

      return {
        ...state,
        loading: false,
        user: action.result.user
      };
    case FACEBOOK_FAILURE:
      return state;
    case LOGOUT_SUCCESS:
      cookie.remove('accessToken');

      return {
        ...state,
        loggingOut: false,
        user: null
      };
    default:
      return state;
  }
}
