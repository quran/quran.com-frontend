import { connect } from 'react-redux';

import SurahInfo from 'components/SurahInfo';
import { setOption } from 'redux/actions/options';

const mapStateToProps = (state, ownProps) => ({
  chapterInfo: state.chapterInfos.entities[ownProps.chapter.id],
  isShowingSurahInfo: state.options.isShowingSurahInfo
});

export default connect(mapStateToProps, { setOption })(SurahInfo);
