import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

import Tracker from './Tracker';
// import debug from '../../../../scripts/helpers/debug';

const style = require('./style.scss');

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
      if (!this.props.file.paused)
        this.props.file.pause();
      this.props.file.currentTime = 0;
    }
  }

  componentWillReceiveProps(nextProps) {
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

      if (shouldRepeat) {
        file.pause();
        file.currentTime = 0; // eslint-disable-line no-param-reassign
        file.play();
      } else {
        if (file.readyState >= 3 && file.paused) {
          file.pause();
        }
        onEnd();
      }
    };
    file.addEventListener('ended', ended, false);

    const play = () => {
      const { progress } = this.state;

      const currentTime = (
        progress / 100 * file.duration
      );

      this.setState({
        currentTime
      });
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
    if (!this.props.file.paused)
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
    // debug('component:Track', 'render');

    const { progress } = this.state;
    const { isPlaying, file } = this.props;

    if (isPlaying) {
      if (file.paused && file.readyState >= 3) {
        file.play(); // returns a promise, can do .then(() => {});
      }
    } else {
      if (!file.paused && file.readyState >= 3) {
        file.pause();
      }
    }

    return (
      <div className={style.track} onClick={this.onTrackerMove.bind(this)}>
        <Tracker progress={progress}/>
      </div>
    );
  }
}
