import { connect } from 'react-redux';
import { ReduxState } from '../types';
import { pause, setVerse, play } from '../redux/actions/audioplayer';
import { fetchTafsirs } from '../redux/actions/tafsirs';
import Verse from '../components/Verse';

export const mapStateToProps = (state: ReduxState) => ({
  tooltip: state.options.tooltip,
  userAgent: state.options.userAgent,
  audio: state.options.audio,
});

export default connect(
  mapStateToProps,
  { fetchTafsirs, pause, setVerse, play }
)(Verse);
