import { connect } from 'react-redux';
import ChapterInfoPanel from '../components/ChapterInfoPanel';
import { setSetting } from '../redux/actions/settings';
import ReduxState from '../types/ReduxState';
import { ChapterShape } from '../shapes';

type Props = {
  chapter: ChapterShape;
};

export const mapStateToProps = (state: ReduxState, ownProps: Props) => ({
  chapterInfo: state.chapterInfos.entities[ownProps.chapter.id],
  isShowingChapterInfo: state.settings.isShowingChapterInfo,
});

export default connect(
  mapStateToProps,
  { setSetting }
)(ChapterInfoPanel);
