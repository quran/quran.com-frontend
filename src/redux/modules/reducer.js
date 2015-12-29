import { combineReducers } from 'redux';
// import multireducer from 'multireducer';
import { routerStateReducer } from 'redux-router';

// import auth from './auth';
// import {reducer as form} from 'redux-form';
import surahs from './surahs';
import ayahs from './ayahs';
import options from './options';
import lines from './lines';
import audioplayer from './audioplayer';
import experiments from './experiments';

export default combineReducers({
  router: routerStateReducer,
  // auth,
  // form,
  ayahs,
  lines,
  surahs,
  experiments,
  options,
  audioplayer
});
