import { INITIAL_STATE as SEARCH_INITIAL_STATE } from '../redux/reducers/search';

interface ReduxState {
  chapters: $TsFixMe;
  verses: $TsFixMe;
  audioplayer: $TsFixMe;
  lines: $TsFixMe;
  options: $TsFixMe;
  juzs: $TsFixMe;
  settings: $TsFixMe;
  chapterInfos: $TsFixMe;
  search: typeof SEARCH_INITIAL_STATE;
}

export default ReduxState;
