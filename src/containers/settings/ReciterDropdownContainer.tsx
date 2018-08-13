import { connect } from 'react-redux';
import { fetchReciters } from '../../redux/actions/options';
import { setSetting } from '../../redux/actions/settings';
import ReduxState from '../../types/ReduxState';
import ReciterDropdown from '../../components/settings/ReciterDropdown';

export const mapStateToProps = (state: ReduxState) => ({
  recitationsOptions: state.options.recitations,
  audioSetting: state.settings.audio,
});

export default connect(
  mapStateToProps,
  { fetchReciters, setSetting }
)(ReciterDropdown);
