import { connect } from 'react-redux';
import { match } from 'react-router';
import { fetchVerses, setCurrentVerse } from '../redux/actions/verses';
import { fetchChapters } from '../redux/actions/chapters';
import { fetchChapterInfo } from '../redux/actions/chapterInfos';
import { ReduxState } from '../types';
import Chapter from '../components/Chapter';

type Props = {
  match: match<$TsFixMe>;
};

const mapStateToProps = (state: ReduxState, ownProps: Props) => {
  const chapterId = parseInt(ownProps.match.params.chapterId, 10);
  const chapter = state.chapters.entities[chapterId];
  const verses = state.verses.entities[chapterId];

  const currentVerse = state.audioplayer.currentVerse
    ? state.audioplayer.currentVerse
    : Object.keys(verses)[0];

  return {
    chapter,
    verses,
    currentVerse,
    isStarted: state.audioplayer.isStarted,
    isPlaying: state.audioplayer.isPlaying,
    currentWord: state.verses.currentWord,
    chapters: state.chapters.entities,
    isLoading: state.verses.loading,
    lines: state.lines.lines,
    options: state.options,
  };
};

export default connect(
  mapStateToProps,
  {
    fetchVerses,
    fetchChapters,
    fetchChapterInfo,
    setCurrentVerse,
  }
)(Chapter);
