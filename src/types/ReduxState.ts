import { INITIAL_STATE as AUDIOPLAYER_INITIAL_STATE } from '../redux/reducers/audioplayer';
import { INITIAL_STATE as CHAPTER_INFOS_INITIAL_STATE } from '../redux/reducers/chapterInfos';
import { INITIAL_STATE as CHAPTERS_INITIAL_STATE } from '../redux/reducers/chapters';
import { INITIAL_STATE as FOOT_NOTES_INITIAL_STATE } from '../redux/reducers/footNotes';
import { INITIAL_STATE as JUZS_INITIAL_STATE } from '../redux/reducers/juzs';
import { INITIAL_STATE as LINES_INITIAL_STATE } from '../redux/reducers/lines';
import { INITIAL_STATE as OPTIONS_INITIAL_STATE } from '../redux/reducers/options';
import { INITIAL_STATE as SEARCH_INITIAL_STATE } from '../redux/reducers/search';
import { INITIAL_STATE as SETTINGS_INITIAL_STATE } from '../redux/reducers/settings';
import { INITIAL_STATE as SUGGEST_INITIAL_STATE } from '../redux/reducers/suggest';
import { INITIAL_STATE as VERSES_INITIAL_STATE } from '../redux/reducers/verses';

interface ReduxState {
  audioplayer: typeof AUDIOPLAYER_INITIAL_STATE;
  chapterInfos: typeof CHAPTER_INFOS_INITIAL_STATE;
  chapters: typeof CHAPTERS_INITIAL_STATE;
  footNotes: typeof FOOT_NOTES_INITIAL_STATE;
  juzs: typeof JUZS_INITIAL_STATE;
  lines: typeof LINES_INITIAL_STATE;
  options: typeof OPTIONS_INITIAL_STATE;
  search: typeof SEARCH_INITIAL_STATE;
  settings: typeof SETTINGS_INITIAL_STATE;
  suggest: typeof SUGGEST_INITIAL_STATE;
  verses: typeof VERSES_INITIAL_STATE;
}

export default ReduxState;
