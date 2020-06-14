import { connect } from 'react-redux';
import { match } from 'react-router';
import { fetchVerses } from '../redux/actions/verses';
import { fetchChapters } from '../redux/actions/chapters';
import { fetchChapterInfo } from '../redux/actions/chapterInfos';
import ReduxState from '../types/ReduxState';
import Chapter from '../components/Chapter';
import { reset } from '../redux/actions/audioplayer';

type Props = {
  match: match<$TsFixMe>;
};

export const mapStateToProps = (state: ReduxState, ownProps: Props) => {
  const { chapterId } = ownProps.match.params;
  const chapter = state.chapters.entities[chapterId];
  const verses = state.verses.entities[chapterId];

  return {
    chapter,
    verses,
    chapters: state.chapters.entities,
    chapterInfo: state.chapterInfos.entities[chapterId],
    isVersesLoading: state.verses.isLoading,
    isChapterLoading: state.chapters.isLoading,
    lines: state.lines.entities,
    settings: state.settings,
  };
};

export default connect(
  mapStateToProps,
  {
    fetchVerses,
    fetchChapters,
    fetchChapterInfo,
    resetAudioPlayer: reset,
  }
)(Chapter);
