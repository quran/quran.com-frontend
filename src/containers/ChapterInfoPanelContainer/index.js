import { connect } from 'react-redux';

import ChapterInfoPanel from 'components/ChapterInfoPanel';
import { setOption } from 'redux/actions/options';

const mapStateToProps = (state, ownProps) => ({
  chapterInfo: state.chapterInfos.entities[ownProps.chapter.id],
  isShowingSurahInfo: state.options.isShowingSurahInfo
});

export default connect(mapStateToProps, { setOption })(ChapterInfoPanel);
