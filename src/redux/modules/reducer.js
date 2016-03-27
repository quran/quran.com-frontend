import { combineReducers } from 'redux';
import { routeReducer } from 'react-router-redux';
import { reducer as reduxAsyncConnect } from 'redux-async-connect';

import surahs from './surahs';
import ayahs from './ayahs';
import audioplayer from './audioplayer';
import lines from './lines';
import options from './options';
import searchResults from './searchResults';

export default combineReducers({
  routing: routeReducer,
  reduxAsyncConnect,
  surahs,
  ayahs,
  audioplayer,
  lines,
  searchResults,
  options
});
