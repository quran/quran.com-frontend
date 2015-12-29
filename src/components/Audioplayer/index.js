import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Col } from 'react-bootstrap';

import { play, pause, repeat, setCurrentFile } from 'redux/modules/audioplayer';

import Track from './Track';

import debug from 'helpers/debug';

const style = require('./style.scss');

@connect(
  state => ({
    files: state.audioplayer.files,
    currentFile: state.audioplayer.currentFile,
    isSupported: state.audioplayer.isSupported,
    isPlaying: state.audioplayer.isPlaying,
    shouldRepeat: state.audioplayer.shouldRepeat
  }),
  (dispatch) => {
    return {
      play: bindActionCreators(play, dispatch),
      pause: bindActionCreators(pause, dispatch),
      repeat: bindActionCreators(repeat, dispatch),
      setCurrentFile: bindActionCreators(setCurrentFile, dispatch)
    };
  },
  (stateProps, dispatchProps, ownProps) => {
    if (!stateProps.isSupported) {
      return {
        ...stateProps, ...dispatchProps, ...ownProps
      };
    }

    const files = stateProps.files[ownProps.currentSurah.id];
    const ayahIds = Object.keys(files);

    return {
      ...stateProps, ...dispatchProps, ...ownProps,
      files,
      ayahIds
    };
  }
)
export default class Audioplayer extends Component {
  static propTypes = {
    currentSurah: PropTypes.object,
    files: PropTypes.object,
    currentFile: PropTypes.string,
    lazyLoadAyahs: PropTypes.func.isRequired,
    isPlaying: PropTypes.bool.isRequired,
    isSupported: PropTypes.bool.isRequired,
    shouldRepeat: PropTypes.bool.isRequired,
    setCurrentFile: PropTypes.func.isRequired,
    play: PropTypes.func.isRequired,
    pause: PropTypes.func.isRequired,
    repeat: PropTypes.func.isRequired,
    ayahIds: PropTypes.array
  }

  constructor() {
    super(...arguments);

    this.state = {
      isAudioLoaded: false,
      currentAudio: null,
      currentAyah: null
    };
  }

  componentWillUnmount() {
    this.props.pause();
    // this.props.currentAudio.src = null;
  }

  onPreviousAyah() {
    const { play, pause, setCurrentFile, isPlaying } = this.props; // eslint-disable-line no-shadow
    const previous = this.getPrevious();

    if (previous) {
      const wasPlaying = isPlaying;

      pause();

      setCurrentFile(previous);

      if (wasPlaying) {
        play();
      }
    }
  }

  onNextAyah() {
    const { play, pause, setCurrentFile, isPlaying } = this.props; // eslint-disable-line no-shadow
    const wasPlaying = isPlaying;

    pause();

    setCurrentFile(this.getNext());

    if (wasPlaying) {
      play();
    }
  }

  getPrevious() {
    const { currentFile, ayahIds } = this.props;
    const index = ayahIds.findIndex(id => id === currentFile) - 1;

    return ayahIds[index];
  }

  getNext() {
    const { currentFile, ayahIds, lazyLoadAyahs } = this.props;
    const index = ayahIds.findIndex(id => id === currentFile) + 1;

    if ((ayahIds.length - 3) <= index) {
      lazyLoadAyahs();
    }

    return ayahIds[index];
  }

  startStopPlayer(event) {
    const { isPlaying } = this.props;

    event.preventDefault();

    if (isPlaying) {
      return this.pause();
    }

    return this.play();
  }

  pause() {
    this.props.pause();
  }

  play() {
    this.props.play();
  }

  repeat(event) {
    event.preventDefault();

    this.props.repeat();
  }

  renderLoader() {
    return (
      <div className="sequence">
        <div className="seq-preloader">
          <svg height="16" width="42" className="seq-preload-indicator" xmlns="http://www.w3.org/2000/svg">
            <circle className="seq-preload-circle seq-preload-circle-1" cx="6" cy="8" r="5" />
            <circle className="seq-preload-circle seq-preload-circle-2" cx="20" cy="8" r="5" />
            <circle className="seq-preload-circle seq-preload-circle-3" cx="34" cy="8" r="5" />
          </svg>
        </div>
      </div>
    );
  }

  renderPlayStopButtons() {
    const { isPlaying } = this.props;

    let icon = <i className="ss-icon ss-play" />;

    if (isPlaying) {
      icon = <i className="ss-icon ss-pause" />;
    }

    return (
      <a className={`pointer ${style.buttons}`} onClick={this.startStopPlayer.bind(this)}>
        {icon}
      </a>
    );
  }

  renderPreviousButton() {
    const { currentFile, ayahIds } = this.props;
    const index = ayahIds.findIndex(id => id === currentFile);

    return (
      <a className={`pointer ${style.buttons} ${!index ? style.disabled : ''}`} onClick={index ? this.onPreviousAyah.bind(this) : null}>
        <i className="ss-icon ss-skipback" />
      </a>
    );
  }

  renderNextButton() {
    return (
      <a className={`pointer ${style.buttons}`} onClick={this.onNextAyah.bind(this)}>
        <i className="ss-icon ss-skipforward" />
      </a>
    );
  }

  renderRepeatButton() {
    const { shouldRepeat } = this.props;

    return (
      <Col xs={3} className="text-center">
        <input type="checkbox" id="repeat" className={style.checkbox} />
        <label
          htmlFor="repeat"
          className={`pointer ${style.buttons} ${shouldRepeat ? style.repeat : ''}`}
          onClick={this.repeat.bind(this)}>
          <i className="ss-icon ss-repeat" />
        </label>
      </Col>
    );
  }

  render() {
    debug('component:Audioplayer', 'Render');

    const {
      play, // eslint-disable-line no-shadow
      pause, // eslint-disable-line no-shadow
      files,
      currentFile,
      isPlaying,
      shouldRepeat,
      isSupported
    } = this.props; // eslint-disable-line no-shadow

    if (!isSupported) {
      return (
        <li className={style.container}>
          Your browser does not support this audio.
        </li>
      );
    }

    let content = (
      <ul className={`list-inline ${style.options}`}>
        {this.renderLoader()}
      </ul>
    );

    content = (
      <div className={`row ${style.options}`}>
        <Col xs={3} className="text-center">
          {this.renderPreviousButton()}
        </Col>
        <Col xs={3} className="text-center">
          {this.renderPlayStopButtons()}
        </Col>
        <Col xs={3} className="text-center">
          {this.renderNextButton()}
        </Col>

        {this.renderRepeatButton()}
      </div>
    );

    return (
      <li className={style.container}>
        <div className={style.verse}>{currentFile.split(':')[1]}</div>
        {content}
        <div className={style.wrapper}>
          <Track
            file={files[currentFile]}
            isPlaying={isPlaying}
            shouldRepeat={shouldRepeat}
            onPlay={play}
            onPause={pause}
            onEnd={this.onNextAyah.bind(this)} />
        </div>
      </li>
    );
  }
}
