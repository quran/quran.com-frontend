import { connect } from 'react-redux';

import ChapterInfoPanel from 'components/ChapterInfoPanel';
import { setOption } from 'redux/actions/options';

const mapStateToProps = (state, ownProps) => ({
  chapterInfo: state.chapterInfos.entities[ownProps.chapter.id],
  isShowingChapterInfo: state.options.isShowingChapterInfo
});

export default connect(mapStateToProps, { setOption })(ChapterInfoPanel);
