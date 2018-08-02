import { connect } from 'react-redux';
import { match } from 'react-router';
import { fetchVerses } from '../redux/actions/verses';
import { fetchChapters } from '../redux/actions/chapters';
import { fetchChapterInfo } from '../redux/actions/chapterInfos';
import { ReduxState } from '../types';
import Chapter from '../components/Chapter';

type Props = {
  match: match<$TsFixMe>;
};

const mapStateToProps = (state: ReduxState, ownProps: Props) => {
  const { chapterId } = ownProps.match.params;
  const chapter = state.chapters.entities[chapterId];
  const verses = state.verses.entities[chapterId];

  const currentVerse = state.audioplayer.currentVerse
    ? state.audioplayer.currentVerse
    : verses && Object.keys(verses)[0];

  return {
    chapter,
    verses,
    currentVerse,
    isStarted: state.audioplayer.isStarted,
    isPlaying: state.audioplayer.isPlaying,
    currentWord: state.verses.currentWord,
    chapters: state.chapters.entities,
    chapterInfo: state.chapterInfos.entities[chapterId],
    isVersesLoading: state.verses.isLoading,
    isChapterLoading: state.chapters.isLoading,
    lines: state.lines.lines,
    settings: state.settings,
  };
};

export default connect(
  mapStateToProps,
  {
    fetchVerses,
    fetchChapters,
    fetchChapterInfo,
  }
)(Chapter);
