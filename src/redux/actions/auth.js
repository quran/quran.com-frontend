import { FACEBOOK, FACEBOOK_SUCCESS, FACEBOOK_FAILURE, LOGOUT_SUCCESS } from '../constants/auth';

export function isLoaded(globalState) {
  return globalState.auth && globalState.auth.loaded;
}

// export function load() {
//   return {
//     types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
//     promise: (client) => client.get('/users/load_user')
//   };
// }

export function facebook() {
  return {
    types: [FACEBOOK, FACEBOOK_SUCCESS, FACEBOOK_FAILURE],
    promise: (client) => client.get('/onequran/auth/facebook/callback')
  };
}

export function logout() {
  return {
    type: LOGOUT_SUCCESS
  };
}
//
// export function hasAccessToken() {
//   return !!cookie.load('accessToken');
// }
