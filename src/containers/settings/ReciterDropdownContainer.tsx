import { connect } from 'react-redux';
import { fetchReciters } from '../../redux/actions/options';
import { setSetting } from '../../redux/actions/settings';
import ReduxState from '../../types/ReduxState';
import ReciterDropdown from '../../components/settings/ReciterDropdown';

export default connect(
  (state: ReduxState) => ({
    recitationsOptions: state.options.recitations,
    audioSetting: state.settings.audio,
  }),
  { fetchReciters, setSetting }
)(ReciterDropdown);
