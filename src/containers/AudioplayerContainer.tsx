import { connect } from 'react-redux';
import Audioplayer from '../components/Audioplayer';
import { ReduxState } from '../types';
import {
  fetchAudio,
  play,
  pause,
  update,
  setCurrentVerse,
} from '../redux/actions/audioplayer';

const mapStateToProps = (state: ReduxState, ownProps: $TsFixMe) => {
  const { currentVerse, files } = state.audioplayer;

  return {
    segments: state.audioplayer.segments[ownProps.chapter.id],
    chapterId: ownProps.chapter.id,
    isPlaying: state.audioplayer.isPlaying,
    isLoading: state.audioplayer.isLoading,
    repeat: state.audioplayer.repeat,
    shouldScroll: state.audioplayer.shouldScroll,
    duration: state.audioplayer.duration,
    currentTime: state.audioplayer.currentTime,
    currentVerse,
    currentFile:
      files[ownProps.chapter.id] && files[ownProps.chapter.id][currentVerse],
    files: state.audioplayer.files[ownProps.chapter.id],
    audioSetting: state.settings.audio,
  };
};

export default connect(
  mapStateToProps,
  {
    fetchAudio,
    play,
    pause,
    update,
    setCurrentVerse,
  }
)(Audioplayer);
