import cookie from 'react-cookie';

import {
  FACEBOOK,
  FACEBOOK_SUCCESS,
  FACEBOOK_FAILURE,
  LOGOUT_SUCCESS,
  SAVE,
  LOAD,
  LOAD_SUCCESS,
  LOAD_FAILURE
} from 'redux/constants/auth';

export function isLoaded(globalState) {
  return globalState.auth && globalState.auth.user;
}

export function load() {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAILURE],
    promise: client => client.get('/onequran/auth/validate_token')
  };
}

export function facebook() {
  return {
    types: [FACEBOOK, FACEBOOK_SUCCESS, FACEBOOK_FAILURE]
  };
}

export const save = data => ({
  type: SAVE,
  data
});

export function logout() {
  return {
    type: LOGOUT_SUCCESS
  };
}

export function hasAccessToken() {
  return !!cookie.load('accessToken');
}
