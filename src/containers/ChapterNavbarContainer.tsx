import { connect } from 'react-redux';
import toNumber from 'lodash/toNumber';
import { match } from 'react-router';
import ReduxState from '../types/ReduxState';
import ChapterNavbar from '../components/ChapterNavbar';
import { setSetting } from '../redux/actions/settings';
import { fetchVerses } from '../redux/actions/verses';
import { setCurrentVerseKey } from '../redux/actions/audioplayer';

type Props = {
  match: match<{ chapterId: string }>;
};

export const mapStateToProps = (state: ReduxState, ownProps: Props) => {
  const chapterId = toNumber(ownProps.match.params.chapterId);
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
    setCurrentVerseKey,
  }
)(ChapterNavbar);
