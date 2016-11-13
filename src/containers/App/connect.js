import { isLoaded as isAuthLoaded } from 'redux/actions/auth';
import { load as loadBookmarks } from 'redux/actions/bookmarks';

export const authConnect = ({ store: { getState, dispatch } }) => {
  const promises = [];

  if (isAuthLoaded(getState())) {
    promises.push(dispatch(loadBookmarks()));
  }

  return Promise.all(promises);
};
