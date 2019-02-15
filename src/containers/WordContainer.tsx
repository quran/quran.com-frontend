import { connect } from 'react-redux';
import {
  pause,
  setCurrentVerseKey,
  setCurrentWord,
  playCurrentWord,
} from '../redux/actions/audioplayer';
import Word from '../components/Word';
import ReduxState from '../types/ReduxState';

export const mapStateToProps = (state: ReduxState, ownProps: $TsFixMe) => ({
  isCurrentVersePlaying:
    state.audioplayer.currentVerseKey === ownProps.word.verseKey &&
    state.audioplayer.isPlaying,
  tooltip: state.settings.tooltip,
});

export default connect(
  mapStateToProps,
  {
    setCurrentWord,
    pause,
    setCurrentVerseKey,
    playCurrentWord,
  }
)(Word);
