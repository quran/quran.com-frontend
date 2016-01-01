import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

import Tracker from './Tracker';
import debug from 'helpers/debug';

const style = require('./style.scss');

export default class Track extends Component {
  static propTypes = {
    file: PropTypes.object.isRequired,
    isPlaying: PropTypes.bool.isRequired,
    shouldRepeat: PropTypes.bool.isRequired,
    onPlay: PropTypes.func.isRequired,
    onPause: PropTypes.func.isRequired,
    onEnd: PropTypes.func.isRequired
  }

  constructor() {
    super(...arguments);

    this.state = {
      progress: 0,
      currentTime: 0
    };
  }

  componentDidMount() {
    this.onFileLoad(this.props.file);
  }

  componentWillUpdate(nextProps) {
    if (this.props.file.src !== nextProps.file.src) {
      this.props.file.pause();

      this.setState({
        progress: 0
      });
      this.onFileLoad(nextProps.file);
    }
  }

  onFileLoad(file) {
    debug('component:Track', `File loaded with src ${file.src}`);

    file.addEventListener('loadeddata', () => {
      // Default current time to zero. This will change
      file.currentTime = 0;

      // this.setState({isAudioLoaded: true});
    });

    file.addEventListener('timeupdate', () => {
      const progress = (
        file.currentTime /
        file.duration * 100
      );

      this.setState({
        progress
      });
    }, false);

    file.addEventListener('ended', () => {
      const { shouldRepeat, onEnd } = this.props;

      if (shouldRepeat) {
        file.pause();
        file.currentTime = 0;
        file.play();
      } else {
        file.pause();
        onEnd();
      }
    }, false);

    file.addEventListener('play', () => {
      const { progress } = this.state;

      const currentTime = (
        progress / 100 * file.duration
      );

      this.setState({
        currentTime
      });
    }, false);
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
    debug('component:Track', 'render');

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
