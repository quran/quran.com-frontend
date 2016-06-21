import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

import Tracker from './Tracker';

const style = require('./style.scss');

export default class Track extends Component {
  static propTypes = {
    file: PropTypes.object.isRequired,
    isStarted: PropTypes.bool.isRequired,
    doStop: PropTypes.func,
    onEnd: PropTypes.func.isRequired,
    shouldRepeat: PropTypes.bool.isRequired,
    surah: PropTypes.object.isRequired,
    currentAyah: PropTypes.string.isRequired
  };

  state = {
    progress: 0,
    currentTime: 0,
    listeners: {}
  };

  componentDidMount() {
    this.setState({ mounted: true }); // eslint-disable-line react/no-did-mount-set-state
    if (this.props.file && __CLIENT__) {
      this.onFileLoad(this.props.file);
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return [
      this.props.file.src !== nextProps.file.src,
      this.props.isStarted !== nextProps.isStarted,
      this.props.shouldRepeat !== nextProps.shouldRepeat,
      this.state.progress !== nextState.progress,       // do we need this??
      this.state.currentTime !== nextState.currentTime  // do we need this??
    ].some(test => test);
  }

  componentDidUpdate(prevProps) {
    if (this.props.file.src !== prevProps.file.src) {
      if (!prevProps.file.paused) {
        prevProps.file.pause();
      }
      prevProps.file.currentTime = 0; // eslint-disable-line no-param-reassign

      this.onFileUnload(prevProps.file);
      this.setState({ progress: 0 }); // eslint-disable-line react/no-did-update-set-state
      this.onFileLoad(this.props.file);

    }
  }

  componentWillUnmount() {
    this.setState({ mounted: false }); // TODO, yeah, this is bad but we unmount and mount when
    this.state.mounted = false;        // we lazy load, and it causes problems...
    // trace memory profile count
    this.onFileUnload(this.props.file);
  }

  onFileLoad(file) {
    // Preload file
    file.setAttribute('preload', 'auto');

    const loadeddata = () => {
      // Default current time to zero. This will change
      file.currentTime = 0; // eslint-disable-line no-param-reassign
    };
    file.onloadeddata = loadeddata; // eslint-disable-line no-param-reassign

    const timeupdate = () => {
      if (!this.state.mounted) return; // TODO needed?

      const progress = (
        file.currentTime /
        file.duration * 100
      );

      this.setState({ progress });
    };

    file.ontimeupdate = timeupdate; // eslint-disable-line no-param-reassign

    const ended = () => {
      const { shouldRepeat, onEnd, isStarted, doStop, currentAyah, surah } = this.props;

      // if we're on the last ayah, do a full stop at the playback end
      if (`${currentAyah === surah.id}:${surah.ayat}`) return doStop();

      if (isStarted && shouldRepeat) {
        file.pause();
        file.currentTime = 0; // eslint-disable-line no-param-reassign
        file.play();
      } else {
        onEnd();
      }

      return false;
    };

    file.onended = ended; // eslint-disable-line no-param-reassign

    const play = () => {
      if (!this.state.mounted) return;

      const { progress } = this.state;
      const currentTime = progress / 100 * file.duration;

      this.setState({ currentTime });
    };

    file.onplay = play; // eslint-disable-line no-param-reassign

    return false;
  }

  onFileUnload(file) {
    if (!file.paused) {
      file.pause();
    }
  }

  onTrackerMove = (event) => {
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
    const { isStarted, file } = this.props;

    if (file.readyState >= 3) {
      // the Math.round bit prevents us from trying to play again when we're
      // effectively at the end of the audio file; this should allow
      // shouldRepeat to work without getting overridden:
      // ...but at the time I monkey-patched it, so we might be able to get
      // rid of it since we cleaned up? Let's not for now...
      if (
        isStarted &&
        file.paused &&
        file.readyState >= 3 &&
        Math.round(file.currentTime) !== Math.round(file.duration)) {
        file.play();
      } else if (!isStarted && !file.paused) {
        file.pause();
      }
    }

    return (
      <div className={style.track} onClick={this.onTrackerMove}>
        <Tracker progress={progress} />
      </div>
    );
  }
}
