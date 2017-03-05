import { bookmarksSchema } from 'redux/schemas';
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
    schema: [bookmarksSchema],
    promise: client => client.get('/onequran/api/v1/bookmarks.json')
  };
}

export function addBookmark(verseKey) {
  return {
    types: [ADD_BOOKMARK, ADD_BOOKMARK_SUCCESS, ADD_BOOKMARK_FAILURE],
    promise: client => client.post('/onequran/api/v1/bookmarks.json', {
      data: {
        bookmark: { verseKey }
      }
    }),
    verseKey
  };
}

export function removeBookmark(verseKey) {
  return {
    types: [REMOVE_BOOKMARK, REMOVE_BOOKMARK_SUCCESS, REMOVE_BOOKMARK_FAILURE],
    promise: client => client.del(`/onequran/api/v1/bookmarks/${verseKey}.json`),
    verseKey
  };
}
