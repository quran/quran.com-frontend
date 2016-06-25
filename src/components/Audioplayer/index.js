import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

// Redux
import {
  start,
  stop,
  toggleRepeat,
  toggleScroll,
  buildOnClient,
  update
} from '../../redux/modules/audioplayer';
import { setCurrentAyah, setCurrentWord } from '../../redux/modules/ayahs';

// Components
import Track from './Track';
import Segments from './Segments';
import ScrollButton from './ScrollButton';
import RepeatButton from './RepeatButton';

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
    isStarted: state.audioplayer.isStarted,
    isLoadedOnClient: state.audioplayer.isLoadedOnClient,
    shouldRepeat: state.audioplayer.shouldRepeat,
    shouldScroll: state.audioplayer.shouldScroll,
    progress: state.audioplayer.progress,
    duration: state.audioplayer.duration,
    currentTime: state.audioplayer.currentTime,
  }),
  {
    start,
    stop,
    toggleRepeat,
    toggleScroll,
    setCurrentAyah,
    setCurrentWord,
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
    onLoadAyahs: PropTypes.func.isRequired,
    segments: PropTypes.object,
    files: PropTypes.object,
    currentAyah: PropTypes.string,
    currentWord: PropTypes.string,
    buildOnClient: PropTypes.func.isRequired,
    isLoadedOnClient: PropTypes.bool.isRequired,
    isSupported: PropTypes.bool.isRequired,
    shouldRepeat: PropTypes.bool.isRequired,
    shouldScroll: PropTypes.bool.isRequired,
    setCurrentAyah: PropTypes.func.isRequired,
    setCurrentWord: PropTypes.func.isRequired,
    start: PropTypes.func.isRequired,
    stop: PropTypes.func.isRequired,
    toggleRepeat: PropTypes.func.isRequired,
    toggleScroll: PropTypes.func.isRequired,
    ayahIds: PropTypes.array,
    isStarted: PropTypes.bool,
    progress: PropTypes.number,
    currentTime: PropTypes.number,
    duration: PropTypes.number
  };

  static defaultProps = {
    className: 'col-md-3'
  };

  componentDidMount() {
    const { isLoadedOnClient, buildOnClient, surah } = this.props; // eslint-disable-line no-shadow

    debug('component:Audioplayer', 'componentDidMount');

    if (!isLoadedOnClient && __CLIENT__) {
      debug('component:Audioplayer', 'componentDidMount on client');

      return buildOnClient(surah.id);
    }

    return false;
  }

  componentWillUnmount() {
    debug('component:Audioplayer', 'componentWillUnmount');

    return this.stop();
  }

  getCurrentAyah() {
    const { currentAyah, ayahIds } = this.props;
    const index = ayahIds.findIndex(id => id === currentAyah);

    return ayahIds[index];
  }

  getPrevious() {
    const { currentAyah, ayahIds } = this.props;
    const index = ayahIds.findIndex(id => id === currentAyah) - 1;

    return ayahIds[index];
  }

  getNext() {
    const { currentAyah, ayahIds, onLoadAyahs } = this.props;
    const index = ayahIds.findIndex(id => id === currentAyah) + 1;

    if ((ayahIds.length - 3) <= index) {
      onLoadAyahs(); // this doesnt look right, should probably be returned or promise.then?
    }

    return ayahIds[index];
  }

  handlePreviousAyah = () => {
    const { setCurrentAyah, isStarted } = this.props; // eslint-disable-line no-shadow
    const prevAyah = this.getPrevious();

    if (prevAyah) {
      const ayahNum = prevAyah.replace(/^\d+:/, '');

      setCurrentAyah(prevAyah);

      this.handleScrollTo(ayahNum);

      if (isStarted) return this.props.files[prevAyah].play();

      return false;
    }

    return false;
  }

  handleNextAyah = () => {
    const { setCurrentAyah, isStarted } = this.props; // eslint-disable-line no-shadow

    const nextAyah = this.getNext();
    if (!nextAyah) return this.stop();
    const ayahNum = nextAyah.replace(/^\d+:/, '');

    setCurrentAyah(nextAyah);

    this.handleScrollTo(ayahNum);

    this.preloadNext();

    if (isStarted) return this.props.files[nextAyah].play();

    return false;
  }

  handleStartStopPlayer = (event) => {
    event.preventDefault();
    const { isStarted } = this.props;

    if (isStarted) {
      return this.stop();
    }

    return this.start();
  }

  handleScrollTo(ayahNum = this.getCurrentAyah().replace(/^\d+:/, '')) {
    const { shouldScroll } = this.props;

    if (shouldScroll) {
      scroller.scrollTo(`ayah:${ayahNum}`, -150);
    }
  }

  start() {
    this.handleScrollTo();

    this.props.start();
    this.preloadNext();
  }

  stop() {
    this.props.stop();
  }

  preloadNext() {
    const { currentAyah, ayahIds, files } = this.props;
    const index = ayahIds.findIndex(id => id === currentAyah) + 1;

    for (let id = index; id <= index + 2; id++) {
      if (ayahIds[id]) {
        const ayahKey = ayahIds[id];

        if (files[ayahKey]) {
          files[ayahKey].setAttribute('preload', 'auto');
        }
      }
    }
  }

  handleScrollToggle = (event) => {
    event.preventDefault();

    const { shouldScroll } = this.props;
    const currentAyah = this.getCurrentAyah();
    const ayahNum = currentAyah.replace(/^\d+:/, '');

    if (!shouldScroll) { // we use the inverse (!) here because we're toggling, so false is true
      const elem = document.getElementsByName(`ayah:${ayahNum}`)[0];
      if (elem && elem.getBoundingClientRect().top < 0) { // if the ayah is above our scroll offset
        scroller.scrollTo(`ayah:${ayahNum}`, -150);
      } else {
        scroller.scrollTo(`ayah:${ayahNum}`, -80);
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
    const { isStarted } = this.props;

    let icon = <i className="ss-icon ss-play" />;

    if (isStarted) {
      icon = <i className="ss-icon ss-pause" />;
    }

    return (
      <a className={`pointer ${style.buttons}`} onClick={this.handleStartStopPlayer}>
        {icon}
      </a>
    );
  }

  renderPreviousButton() {
    const { currentAyah, ayahIds } = this.props;
    const index = ayahIds.findIndex(id => id === currentAyah);

    return (
      <a
        className={`pointer ${style.buttons} ${!index ? style.disabled : ''}`}
        onClick={index ? this.handlePreviousAyah : null}
      >
        <i className="ss-icon ss-skipback" />
      </a>
    );
  }

  renderNextButton() {
    return (
      <a className={`pointer ${style.buttons}`} onClick={this.handleNextAyah}>
        <i className="ss-icon ss-skipforward" />
      </a>
    );
  }

  render() {
    debug('component:Audioplayer', 'render');

    const {
      className,
      files,
      segments,
      currentAyah,
      currentWord,
      setCurrentWord, // eslint-disable-line no-shadow
      isStarted,
      isSupported,
      isLoadedOnClient,
      surah,
      shouldRepeat, // eslint-disable-line no-shadow
      shouldScroll, // eslint-disable-line no-shadow
      toggleRepeat // eslint-disable-line no-shadow
    } = this.props;

    if (!isSupported) {
      return (
        <li className={`${style.container} ${className}`}>
          Your browser does not support this audio.
        </li>
      );
    }

    let content = (
      <ul className={style.list}>
        <li className={style.verse}>
          Playing: {currentAyah.split(':')[1]}
        </li>
        <li>
          {this.renderPreviousButton()}
        </li>
        <li>
          {this.renderPlayStopButtons()}
        </li>
        <li>
          {this.renderNextButton()}
        </li>
        <li>
          <RepeatButton shouldRepeat={shouldRepeat} onRepeatToggle={toggleRepeat} />
        </li>
        <li>
          <ScrollButton shouldScroll={shouldScroll} onScrollToggle={this.handleScrollToggle} />
        </li>
      </ul>
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
        {content}
        <div className={style.wrapper}>
          {isLoadedOnClient ?
            <Track
              file={files[currentAyah]}
              isStarted={isStarted}
              doStop={this.stop.bind(this)} // eslint-disable-line react/jsx-no-bind
              onEnd={this.handleNextAyah}
              shouldRepeat={shouldRepeat}
              surah={surah}
              currentAyah={currentAyah}
            /> : null}
          {isLoadedOnClient && segments[currentAyah] ?
            <Segments
              audio={files[currentAyah]}
              segments={segments[currentAyah]}
              currentAyah={currentAyah}
              currentWord={currentWord}
              onSetCurrentWord={setCurrentWord}
            /> : null}
        </div>
      </div>
    );
  }
}
