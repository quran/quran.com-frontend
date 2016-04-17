import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import Tracker from './Tracker';
// import debug from '../../../../scripts/helpers/debug';

import { clearCurrentWord, setCurrentWord } from '../../../redux/modules/ayahs';

const style = require('./style.scss');

@connect(
  (state, ownProps) => {
    const ayahKey = state.ayahs.current;
    const surahId = parseInt(ayahKey.match(/^\d+/)[0], 10);
    const ayahNum = parseInt(ayahKey.match(/\d+$/)[0], 10);
    const currentWord = state.ayahs.currentWord;

    return { currentWord, ayahNum, surahId, ayahKey };
  },
  { // dispatch functions, also lands in this.props
    setCurrentWord,
    clearCurrentWord
  }
)
export default class Track extends Component {
  static propTypes = {
    file: PropTypes.object.isRequired,
    isPlaying: PropTypes.bool.isRequired,
    shouldRepeat: PropTypes.bool.isRequired,
    onPlay: PropTypes.func.isRequired,
    onPause: PropTypes.func.isRequired,
    onEnd: PropTypes.func.isRequired
  };

  state = {
    progress: 0,
    currentTime: 0,
    listeners: {}
  };

  componentDidMount() {
    if (this.props.file) {
      this.onFileLoad(this.props.file);
    }
  }

  componentWillUnmount() {
    this.onFileUnload(this.props.file);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return [
      this.props.file.src !== nextProps.file.src,
      this.props.isPlaying !== nextProps.isPlaying,
      this.props.shouldRepeat !== nextProps.shouldRepeat,
      this.state.progress !== nextState.progress,
      this.state.currentTime !== nextState.currentTime
    ].some(test => test);
  }

  componentWillUpdate(nextProps) {
    if (this.props.file.src !== nextProps.file.src) {
      this.props.file.pause();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.file) return;
    if (this.props.file.src !== nextProps.file.src) {
      this.onFileUnload(this.props.file);
      this.setState({
        progress: 0
      });

      this.onFileLoad(nextProps.file);
    }
  }

  onFileLoad(file) {
    // debug('component:Track', `File loaded with src ${file.src}`);

    // Preload file
    file.setAttribute('preload', 'auto');

    const loadeddata = () => {
      // Default current time to zero. This will change
      file.currentTime = 0; // eslint-disable-line no-param-reassign

      // this.setState({isAudioLoaded: true});
    };
    file.addEventListener('loadeddata', loadeddata);

    const timeupdate = () => {
      const progress = (
        file.currentTime /
        file.duration * 100
      );

      this.setState({
        progress
      });
    };
    file.addEventListener('timeupdate', timeupdate, false);

    const ended = () => {
      const { shouldRepeat, onEnd } = this.props;

      //console.log('file.addEventListener(ended)', { shouldRepeat, file, state: this.state });

      if (shouldRepeat) {
        file.pause();
        file.currentTime = 0; // eslint-disable-line no-param-reassign
        file.play();
      } else {
        //console.log('onEnd was called');
        file.pause();
        onEnd();
      }
    };
    file.addEventListener('ended', ended, false);

    const play = () => {
      const { progress } = this.state;
      const { onPlay } = this.props;

      const currentTime = (
        progress / 100 * file.duration
      );

      //console.log('file.addEventListener(play)', { file, currentTime, progress });

      this.setState({
        currentTime
      });

      onPlay();
    };
    file.addEventListener('play', play, false);

    this.setState({
      listeners: {
        loadeddata,
        timeupdate,
        ended,
        play
      }
    });
  }

  onFileUnload(file) {
    this.props.file.pause();
    [ 'loadeddata', 'timeupdate', 'ended', 'play' ].forEach((listener) => {
      file.removeEventListener(listener, this.state.listeners[listener]);
    });
  }

  onTrackerMove(event) {
    const { file } = this.props;

    const fraction = (
      event.nativeEvent.offsetX /
      ReactDOM.findDOMNode(this).parentElement.getBoundingClientRect().width
    );

    this.setState({
      progress: fraction * 100,
      currentTime: fraction * file.duration
    });

    file.currentTime = (
      fraction * file.duration
    );
  }

  render() {
    const { progress } = this.state;
    const { isPlaying, file } = this.props;

    if (isPlaying) {
      file.play();
    } else {
      file.pause();
    }

    return (
      <div className={style.track} onClick={this.onTrackerMove.bind(this)}>
        <Tracker progress={progress}/>
      </div>
    );
  }
}
