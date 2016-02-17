import { combineReducers } from 'redux';
// import multireducer from 'multireducer';
import { routeReducer } from 'react-router-redux';
import { reducer as reduxAsyncConnect } from 'redux-async-connect';

// import auth from './auth';
// import {reducer as form} from 'redux-form';
import surahs from './surahs';
import ayahs from './ayahs';
import searchResults from './searchResults';
import options from './options';
import lines from './lines';
import audioplayer from './audioplayer';
import experiments from './experiments';

export default combineReducers({
  routing: routeReducer,
  reduxAsyncConnect,
  // auth,
  // form,
  ayahs,
  searchResults,
  lines,
  surahs,
  experiments,
  options,
  audioplayer
});
