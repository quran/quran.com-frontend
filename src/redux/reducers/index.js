import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import chapters from './chapters';
import chapterInfos from './chapterInfos';
import verses from './verses';
import audioplayer from './audioplayer';
import lines from './lines';
import options from './options';
import searchResults from './searchResults';
import suggestResults from './suggestResults';
import fontFaces from './fontFaces';
import media from './media';
import juzs from './juzs';

export default combineReducers({
  audioplayer,
  chapterInfos,
  chapters,
  fontFaces,
  juzs,
  lines,
  media,
  options,
  routing: routerReducer,
  searchResults,
  suggestResults,
  verses
});
