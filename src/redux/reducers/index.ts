import { combineReducers } from 'redux';

import audioplayer from './audioplayer';
import chapterInfos from './chapterInfos';
import chapters from './chapters';
import fontFaces from './fontFaces';
import footNotes from './footNotes';
import juzs from './juzs';
import lines from './lines';
import media from './media';
import options from './options';
import search from './search';
import settings from './settings';
import suggest from './suggest';
import verses from './verses';

export default combineReducers({
  audioplayer,
  chapterInfos,
  chapters,
  fontFaces,
  footNotes,
  juzs,
  lines,
  media,
  options,
  search,
  settings,
  suggest,
  verses,
});
