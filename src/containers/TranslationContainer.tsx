import { connect } from 'react-redux';
import { fetchFootNote } from '../redux/actions/footNotes';
import Translation from '../components/Translation';
import ReduxState from '../types/ReduxState';

export const mapStateToProps = (state: ReduxState) => ({
  isNightMode: state.settings.isNightMode,
});

export default connect(
  mapStateToProps,
  { fetchFootNote }
)(Translation);
