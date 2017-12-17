import cookie from 'react-cookie';

import {
  FACEBOOK_SUCCESS,
  FACEBOOK_FAILURE,
  LOGOUT_SUCCESS,
  LOAD_SUCCESS,
  LOAD_FAILURE,
  SAVE
} from 'redux/constants/auth';

const initialState = {
  loaded: false
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case SAVE: {
      cookie.save('auth', {
        client: action.data.client_id,
        expiry: action.data.expiry,
        uid: action.data.uid,
        'access-token': action.data.auth_token,
        'token-type': 'Bearer'
      });

      return {
        ...state,
        loading: false,
        loaded: true,
        user: action.data
      };
    }
    case LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        user: action.result.user
      };
    case FACEBOOK_SUCCESS:
      cookie.save('accessToken', action.result.user.accessToken);

      return {
        ...state,
        loading: false,
        loaded: true,
        user: action.result.user
      };
    case FACEBOOK_FAILURE:
    case LOAD_FAILURE:
    case LOGOUT_SUCCESS:
      cookie.remove('accessToken');

      return {
        ...state,
        loggingOut: false,
        loaded: false,
        loading: false,
        user: null
      };
    default:
      return state;
  }
}
