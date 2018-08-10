import { connect } from 'react-redux';
import { fetchVerses } from '../redux/actions/verses';
import { fetchChapters } from '../redux/actions/chapters';
import ReduxState from '../types/ReduxState';
import AyatulKursi from '../components/AyatulKursi';

const mapStateToProps = (state: ReduxState) => {
  const chapter = state.chapters.entities[2];
  const verses = state.verses.entities[2];

  return {
    chapter,
    verses,
    chapters: state.chapters.entities,
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
  }
)(AyatulKursi);
