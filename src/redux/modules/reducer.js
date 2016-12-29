import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as reduxAsyncConnect } from 'redux-connect';

import surahs from './surahs';
import ayahs from './ayahs';
import audioplayer from './audioplayer';
import lines from './lines';
import options from './options';
import searchResults from './searchResults';
import suggestResults from './suggestResults';
import fontFaces from './fontFaces';
import auth from './auth';
import bookmarks from './bookmarks';
import media from './media';

export default combineReducers({
  routing: routerReducer,
  reduxAsyncConnect,
  auth,
  bookmarks,
  media,
  surahs,
  ayahs,
  audioplayer,
  fontFaces,
  lines,
  searchResults,
  suggestResults,
  options
});
