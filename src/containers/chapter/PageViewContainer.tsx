import { connect } from 'react-redux';
import PageView from '../../components/Chapter/PageView';
import { ReduxState } from '../../types';

export const mapStateToProps = (state: ReduxState) => ({
  userAgent: state.options.userAgent,
});

export default connect(mapStateToProps)(PageView);
