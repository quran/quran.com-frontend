import { connect } from 'react-redux';
import PageView from '../../components/chapter/PageView';
import ReduxState from '../../types/ReduxState';

export const mapStateToProps = (state: ReduxState) => ({
  userAgent: state.settings.userAgent,
});

export default connect(mapStateToProps)(PageView);
