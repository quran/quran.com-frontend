import { connect } from 'react-redux';
import Audioplayer from '../components/Audioplayer';
import ReduxState from '../types/ReduxState';
import {
  fetchAudio,
  play,
  pause,
  update,
  setCurrentVerseKey,
} from '../redux/actions/audioplayer';

export const mapStateToProps = (state: ReduxState, ownProps: $TsFixMe) => {
  const { chapter } = ownProps;
  const { currentVerseKey, files } = state.audioplayer;
  const currentFile =
    currentVerseKey &&
    files[ownProps.chapter.id] &&
    files[ownProps.chapter.id][currentVerseKey];

  return {
    segments: state.audioplayer.segments[chapter.id],
    isPlaying: state.audioplayer.isPlaying,
    repeat: state.audioplayer.repeat,
    shouldScroll: state.audioplayer.shouldScroll,
    duration: state.audioplayer.duration,
    currentTime: state.audioplayer.currentTime,
    currentVerseKey,
    currentFile,
    files: state.audioplayer.files[chapter.id],
    audioSetting: state.settings.audio,
    isNightMode: state.settings.isNightMode,
  };
};

export default connect(
  mapStateToProps,
  {
    fetchAudio,
    play,
    pause,
    update,
    setCurrentVerseKey,
  }
)(Audioplayer);
