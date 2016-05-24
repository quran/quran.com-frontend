import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as reduxAsyncConnect } from 'redux-connect';

import surahs from './surahs';
import ayahs from './ayahs';
import audioplayer from './audioplayer';
import lines from './lines';
import options from './options';
import searchResults from './searchResults';

export default combineReducers({
  routing: routerReducer,
  reduxAsyncConnect,
  surahs,
  ayahs,
  audioplayer,
  lines,
  searchResults,
  options
});
