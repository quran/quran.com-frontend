// import cookie from 'react-cookie';

import {
  FACEBOOK,
  FACEBOOK_SUCCESS,
  FACEBOOK_FAILURE,
} from '../constants/auth';

const initialState = {
  loaded: false
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case FACEBOOK:
      return state;
    case FACEBOOK_SUCCESS:
      cookie.save('oauthToken', action.result.user.oauthToken);

      return {
        ...state,
        loading: false,
        user: action.result.user
      };
    case FACEBOOK_FAILURE:
      return state;
    case LOGOUT_SUCCESS:
      cookie.remove('oauthToken');

      return {
        ...state,
        loggingOut: false,
        user: null
      };
    default:
      return state;
  }
}
