import { bookmarksSchema } from 'redux/schemas';
import { arrayOf } from 'normalizr';
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
} from 'redux/constants/bookmarks';

export function isLoaded(globalState) {
  return globalState.auth && globalState.auth.user;
}

export function load() {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAILURE],
    schema: arrayOf(bookmarksSchema),
    promise: client => client.get('/onequran/api/v1/bookmarks')
  };
}

export function addBookmark(ayahKey) {
  return {
    types: [ADD_BOOKMARK, ADD_BOOKMARK_SUCCESS, ADD_BOOKMARK_FAILURE],
    promise: client => client.post('/onequran/api/v1/bookmarks', {
      data: {
        bookmark: { ayahKey }
      }
    }),
    ayahKey
  };
}

export function removeBookmark(ayahKey) {
  return {
    types: [REMOVE_BOOKMARK, REMOVE_BOOKMARK_SUCCESS, REMOVE_BOOKMARK_FAILURE],
    promise: client => client.del(`/onequran/api/v1/bookmarks/${ayahKey}`),
    ayahKey
  };
}
