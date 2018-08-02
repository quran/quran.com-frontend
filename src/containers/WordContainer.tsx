import { connect } from 'react-redux';
import {
  pause,
  setCurrentVerse,
  setCurrentWord,
  playCurrentWord,
} from '../redux/actions/audioplayer';
import Word from '../components/Word';
import { ReduxState } from '../types';

const mapStateToProps = (state: ReduxState) => ({
  currentVerse: state.audioplayer.currentVerse,
  isPlaying: state.audioplayer.isPlaying,
  tooltip: state.settings.tooltip,
});

export default connect(
  mapStateToProps,
  {
    setCurrentWord,
    pause,
    setCurrentVerse,
    playCurrentWord,
  }
)(Word);
