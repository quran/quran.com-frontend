import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';

// Redux
import { play, pause, repeat, toggleScroll, buildOnClient } from '../../redux/modules/audioplayer';
import { setCurrentAyah, setCurrentWord, clearCurrentWord } from '../../redux/modules/ayahs';

// Components
import Track from './Track';

// Helpers
import debug from '../../helpers/debug';
import scroller from '../../utils/scroller';

const style = require('./style.scss');

@connect(
  state => ({
    files: state.audioplayer.files,
    segments: state.audioplayer.segments,
    currentAyah: state.ayahs.current,
    currentWord: state.ayahs.currentWord,
    surahId: state.audioplayer.surahId,
    isSupported: state.audioplayer.isSupported,
    isPlaying: state.audioplayer.isPlaying,
    isLoadedOnClient: state.audioplayer.isLoadedOnClient,
    shouldRepeat: state.audioplayer.shouldRepeat,
    shouldScroll: state.audioplayer.shouldScroll
  }),
  {
    play,
    pause,
    repeat,
    toggleScroll,
    setCurrentAyah,
    setCurrentWord,
    clearCurrentWord,
    buildOnClient
  },
  (stateProps, dispatchProps, ownProps) => {
    if (!stateProps.isSupported) {
      return {
        ...stateProps, ...dispatchProps, ...ownProps
      };
    }

    const files = stateProps.files[stateProps.surahId];
    const ayahIds = files ? Object.keys(files) : [];
    const segments = stateProps.segments[stateProps.surahId];

    return {
      ...stateProps, ...dispatchProps, ...ownProps,
      files,
      segments,
      ayahIds
    };
  }
)
export default class Audioplayer extends Component {
  static propTypes = {
    className: PropTypes.string,
    surah: PropTypes.object.isRequired,
    files: PropTypes.object,
    currentAyah: PropTypes.string,
    currentWord: PropTypes.string,
    buildOnClient: PropTypes.func.isRequired,
    onLoadAyahs: PropTypes.func.isRequired,
    isPlaying: PropTypes.bool.isRequired,
    isLoadedOnClient: PropTypes.bool.isRequired,
    isSupported: PropTypes.bool.isRequired,
    shouldRepeat: PropTypes.bool.isRequired,
    shouldScroll: PropTypes.bool.isRequired,
    setCurrentAyah: PropTypes.func.isRequired,
    setCurrentWord: PropTypes.func.isRequired,
    clearCurrentWord: PropTypes.func.isRequired,
    play: PropTypes.func.isRequired,
    pause: PropTypes.func.isRequired,
    repeat: PropTypes.func.isRequired,
    toggleScroll: PropTypes.func.isRequired,
    ayahIds: PropTypes.array
  };

  static defaultProps = {
    className: 'col-md-3'
  };

  state = {
    isAudioLoaded: false,
    currentAudio: null,
    currentAyah: null
  };

  componentDidMount() {
    const { isLoadedOnClient, buildOnClient, surah } = this.props; // eslint-disable-line no-shadow
    debug('component:Audioplayer', 'componentDidMount');

    if (!isLoadedOnClient && __CLIENT__) {
      debug('component:Audioplayer', 'componentDidMount on client');
      return buildOnClient(surah.id);
    }
  }

  componentWillUnmount() {
    debug('component:Audioplayer', 'componentWillUnmount');
    this.props.pause();
    // this.props.currentAudio.src = null;
  }

  onPreviousAyah() {
    const { play, pause, setCurrentAyah, isPlaying, shouldScroll } = this.props; // eslint-disable-line no-shadow
    const prevAyah = this.getPrevious();

    if (prevAyah) {
      const ayahNum = prevAyah.replace( /^\d+:/, '' );
      const wasPlaying = isPlaying;

      pause();

      setCurrentAyah(prevAyah);

      if (shouldScroll) {
        scroller.scrollTo('ayah:'+ ayahNum, -150);
      }

      if (wasPlaying) {
        play();
      }
    }
  }

  scrollTo(name, offset = 0) {
    const node = document.getElementsByName(name)[0];

    if (!node) {
      console.warn(`node [name=${name}] not found, could not scroll`);
      return;
    }

    const nodeRect = node.getBoundingClientRect();
    const bodyRect = document.body.getBoundingClientRect();
    const scrollOffset = nodeRect.top - bodyRect.top;

    window.scrollTo(0, scrollOffset + offset);
  }

  onNextAyah() {
    const { play, pause, setCurrentAyah, isPlaying, shouldScroll } = this.props; // eslint-disable-line no-shadow
    const wasPlaying = isPlaying;
    const nextAyah = this.getNext();
    const ayahNum = nextAyah.replace( /^\d+:/, '' );

    pause();

    setCurrentAyah(nextAyah);

    if (shouldScroll) {
      scroller.scrollTo('ayah:'+ ayahNum, -80);
    }

    if (wasPlaying) {
      play();
      this.preloadNext();
    }
  }

  getCurrent() {
    const { currentAyah, ayahIds } = this.props;
    const index = ayahIds.findIndex(id => id === currentAyah);

    return ayahIds[index];
  }

  getPrevious() {
    // TODO BUGFIX, we should be able to go to the previous ayah even when we started from within a range
    // i.e. lazyloading upwards; as this is defined, if you go to /2/100-110 then you can't go to 99 from
    // the previous button
    const { currentAyah, ayahIds } = this.props;
    const index = ayahIds.findIndex(id => id === currentAyah) - 1;
    return ayahIds[index];
  }

  getNext() {
    const { currentAyah, ayahIds, onLoadAyahs } = this.props;
    const index = ayahIds.findIndex(id => id === currentAyah) + 1;

    if ((ayahIds.length - 3) <= index) {
      onLoadAyahs();
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
    debug('component:Audioplayer', 'pause');
    this.props.pause();
  }

  play() {
    const { shouldScroll, files } = this.props;
    const currentAyah = this.getCurrent();
    const ayahNum = currentAyah.replace( /^\d+:/, '' );

    debug('component:Audioplayer', 'play');

    if (shouldScroll) {
      scroller.scrollTo('ayah:'+ ayahNum, -150);
    }

    this.props.play();
    this.preloadNext();
  }

  preloadNext() {
    const { currentAyah, ayahIds, files } = this.props;
    const index = ayahIds.findIndex(id => id === currentAyah) + 1;
    for (var i = index; i <= index + 2; i++) {
      if (ayahIds[i]) {
        const ayahKey = ayahIds[i];
        if (files[ayahKey]) {
          files[ayahKey].setAttribute('preload', 'auto');
        }
      }
    }
  }

  repeat(event) {
    event.preventDefault();

    this.props.repeat();
  }

  toggleScroll(event) {
    event.preventDefault();

    const { shouldScroll } = this.props;
    const currentAyah = this.getCurrent();
    const ayahNum = currentAyah.replace( /^\d+:/, '' );

    if (!shouldScroll) { // we use the inverse (!) here because we're toggling, so false is true
      const elem = document.getElementsByName('ayah:'+ ayahNum)[0];
      if (elem && elem.getBoundingClientRect().top < 0) { // if the ayah is above our scroll offset
        scroller.scrollTo('ayah:'+ ayahNum, -150);
      } else {
        scroller.scrollTo('ayah:'+ ayahNum, -80);
      }
    }


    this.props.toggleScroll();
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
    const { currentAyah, ayahIds } = this.props;
    const index = ayahIds.findIndex(id => id === currentAyah);

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
      <Col xs={2} className="text-center pull-right">
        <input type="checkbox" id="repeat" className={style.checkbox} />
        <label
          htmlFor="repeat"
          className={`pointer ${style.buttons} ${shouldRepeat ? style.repeat : ''}`}
          onClick={this.repeat.bind(this)}
        >
          <i className="ss-icon ss-repeat" />
        </label>
      </Col>
    );
  }

  renderScrollButton() {
    const { shouldScroll } = this.props;

    return (
      <Col xs={2} className="text-center pull-right">
        <input type="checkbox" id="scroll" className={style.checkbox} />
        <label
          htmlFor="scroll"
          className={`pointer ${style.buttons} ${shouldScroll ? style.scroll : ''}`}
          onClick={this.toggleScroll.bind(this)}
        >
          <i className="ss-icon ss-attach" />
        </label>
      </Col>
    );
  }


  render() {
    debug('component:Audioplayer', 'render');

    const {
      className,
      play, // eslint-disable-line no-shadow
      pause, // eslint-disable-line no-shadow
      files,
      segments,
      currentAyah,
      currentWord,
      setCurrentWord,
      clearCurrentWord,
      isPlaying,
      shouldRepeat,
      isSupported,
      isLoadedOnClient
    } = this.props; // eslint-disable-line no-shadow

    if (!isSupported) {
      return (
        <li className={`${style.container} ${className}`}>
          Your browser does not support this audio.
        </li>
      );
    }

    let content = (
      <Row className={style.options}>
        <Col xs={2} className="text-center">
          {this.renderPreviousButton()}
        </Col>
        <Col xs={3} className="text-center">
          {this.renderPlayStopButtons()}
        </Col>
        <Col xs={2} className="text-center">
          {this.renderNextButton()}
        </Col>

        {this.renderRepeatButton()}

        {this.renderScrollButton()}
      </Row>
    );

    if (!currentAyah) {
      return (
        <li className={`${style.container} ${className}`}>
          {this.renderLoader()}
        </li>
      );
    }

    return (
      <div className={`${style.padding_left} ${style.container} ${className}`}>
        <div className={style.verse}>{currentAyah.split(':')[1]}</div>
        {content}
        <div className={style.wrapper}>
          {isLoadedOnClient ?
            <Track
              file={files[currentAyah]}
              isPlaying={isPlaying}
              shouldRepeat={shouldRepeat}
              onPlay={play}
              onPause={pause}
              onEnd={this.onNextAyah.bind(this)}
            /> : null}
        </div>
      </div>
    );
  }
}
