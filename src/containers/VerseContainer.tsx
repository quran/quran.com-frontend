import { connect } from 'react-redux';
import ReduxState from '../types/ReduxState';
import { pause, setCurrentVerseKey, play } from '../redux/actions/audioplayer';
import { fetchTafsirs } from '../redux/actions/tafsirs';
import Verse from '../components/Verse';
import { fetchFootNote } from '../redux/actions/footNotes';

export const mapStateToProps = (state: ReduxState, ownProps: $TsFixMe) => ({
  tooltip: state.settings.tooltip,
  userAgent: state.settings.userAgent,
  audio: state.settings.audio,
  footNote: state.footNotes.entities[ownProps.verse.verseKey],
  tafsir: state.tafsirs.entities[ownProps.verse.verseKey],
  isCurrentVersePlaying:
    state.audioplayer.currentVerseKey === ownProps.verse.verseKey &&
    state.audioplayer.isPlaying,
});

export default connect(
  mapStateToProps,
  { fetchTafsirs, pause, setCurrentVerseKey, play, fetchFootNote }
)(Verse);
