import { connect } from 'react-redux';
import ReduxState from '../types/ReduxState';
import { match } from '../../node_modules/@types/react-router';
import ChapterNavbar from '../components/ChapterNavbar';
import { setSetting } from '../redux/actions/settings';
import { fetchVerses } from '../redux/actions/verses';

type Props = {
  match: match<{ chapterId: string }>;
};

const mapStateToProps = (state: ReduxState, ownProps: Props) => {
  const chapterId = parseInt(ownProps.match.params.chapterId, 10);
  const chapter = state.chapters.entities[chapterId];
  const verses = state.verses.entities[chapterId];

  return {
    chapter,
    verses,
    chapters: state.chapters.entities,
    settings: state.settings,
  };
};

export default connect(
  mapStateToProps,
  {
    setSetting,
    fetchVerses,
  }
)(ChapterNavbar);
