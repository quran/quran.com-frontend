import { connect } from 'react-redux';
import { ReduxState } from '../types';
import { fetchTafsirs } from '../redux/actions/media';
import { pause, setVerse, play } from '../redux/actions/audioplayer';
import Verse from '../components/Verse';

export const mapStateToProps = (state: ReduxState) => {
  return {
    tooltip: state.options.tooltip,
    userAgent: state.options.userAgent,
    audio: state.options.audio,
  };
};

export default connect(
  mapStateToProps,
  { fetchTafsirs, pause, setVerse, play }
)(Verse);
