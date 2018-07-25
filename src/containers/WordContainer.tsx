import { connect } from 'react-redux';
import {
  pause,
  setVerse,
  setCurrentWord,
  playCurrentWord,
} from '../redux/actions/audioplayer';
import Word from '../components/Word';
import { ReduxState } from '../types';

const mapStateToProps = (state: ReduxState) => {
  return {
    currentVerse: state.audioplayer.currentVerse,
    isPlaying: state.audioplayer.isPlaying,
    tooltip: state.options.tooltip,
  };
};

export default connect(
  mapStateToProps,
  {
    setCurrentWord,
    pause,
    setVerse,
    playCurrentWord,
  }
)(Word);
