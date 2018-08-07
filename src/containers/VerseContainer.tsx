import { connect } from 'react-redux';
import ReduxState from '../types/ReduxState';
import { pause, setCurrentVerseKey, play } from '../redux/actions/audioplayer';
import { fetchTafsirs } from '../redux/actions/tafsirs';
import Verse from '../components/Verse';

export const mapStateToProps = (state: ReduxState, ownProps: $TsFixMe) => ({
  tooltip: state.options.tooltip,
  userAgent: state.options.userAgent,
  audio: state.options.audio,
  isCurrentVersePlaying:
    state.audioplayer.currentVerse === ownProps.verse.verseKey &&
    state.audioplayer.isPlaying,
});

export default connect(
  mapStateToProps,
  { fetchTafsirs, pause, setCurrentVerseKey, play }
)(Verse);
