import { connect } from 'react-redux';
import ChapterInfoPanel from '../components/ChapterInfoPanel';
import { setSetting } from '../redux/actions/settings';
import ReduxState from '../types/ReduxState';
import { ChapterShape } from '../shapes';

type Props = {
  chapter: ChapterShape;
};

const mapStateToProps = (state: ReduxState, ownProps: Props) => ({
  chapterInfo: state.chapterInfos.entities[ownProps.chapter.id],
  isShowingChapterInfo: state.options.isShowingChapterInfo,
});

export default connect(
  mapStateToProps,
  { setSetting }
)(ChapterInfoPanel);
