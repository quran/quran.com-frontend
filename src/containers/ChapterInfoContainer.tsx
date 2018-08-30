import { connect } from 'react-redux';
import ReduxState from '../types/ReduxState';
import { match } from '../../node_modules/@types/react-router';
import ChapterInfo from '../components/ChapterInfo';

type Props = {
  match: match<{ chapterId: string }>;
};

function mapStateToProps(state: ReduxState, ownProps: Props) {
  const chapterId = parseInt(ownProps.match.params.chapterId, 10);

  return {
    chapter: state.chapters.entities[chapterId],
    chapterInfo: state.chapterInfos.entities[chapterId],
  };
}

export default connect(mapStateToProps)(ChapterInfo);
