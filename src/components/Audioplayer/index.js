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
import Loader from './Loader';

// Helpers
import debug from '../../helpers/debug';
import scroller from '../../utils/scroller';

const style = require('./style.scss');

@connect(
  (state, ownProps) => ({
    files: state.audioplayer.files[ownProps.surah.id],
    segments: state.audioplayer.segments[ownProps.surah.id],
    ayahIds: Object.keys(state.audioplayer.files[ownProps.surah.id]),
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
    buildOnClient,
    update
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
    update: PropTypes.func.isRequired,
    toggleRepeat: PropTypes.func.isRequired,
    toggleScroll: PropTypes.func.isRequired,
    ayahIds: PropTypes.array,
    isStarted: PropTypes.bool,
    progress: PropTypes.number,
    currentTime: PropTypes.number,
    duration: PropTypes.number,
    currentFile: PropTypes.string
  };

  static defaultProps = {
    className: 'col-md-3'
  };

  componentDidMount() {
    const { isLoadedOnClient, buildOnClient, surah, files, currentFile } = this.props; // eslint-disable-line no-shadow, max-len

    debug('component:Audioplayer', 'componentDidMount');

    if (!isLoadedOnClient && __CLIENT__) {
      debug('component:Audioplayer', 'componentDidMount on client');

      buildOnClient(surah.id);

      if (files[currentFile]) {
        return this.handleAddFileListeners(files[currentFile]);
      }

      return false;
    }

    return false;
  }

  componentWillUnmount() {
    const { files, currentFile } = this.props;
    debug('component:Audioplayer', 'componentWillUnmount');

    if (files[currentFile]) {
      return this.handleRemoveFileListeneres(files[currentFile]);
    }

    return false;
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
    const { setCurrentAyah, isStarted, stop } = this.props; // eslint-disable-line no-shadow

    const nextAyah = this.getNext();
    if (!nextAyah) return stop();
    const ayahNum = nextAyah.replace(/^\d+:/, '');

    setCurrentAyah(nextAyah);

    this.handleScrollTo(ayahNum);

    this.preloadNext();

    if (isStarted) return this.props.files[nextAyah].play();

    return false;
  }

  handleStartStopPlayer = (event) => {
    event.preventDefault();
    const { isStarted, stop } = this.props; // eslint-disable-line no-shadow

    if (isStarted) {
      return stop();
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

  handleAddFileListeners(file) {
    const { update } = this.props; // eslint-disable-line no-shadow

    // Preload file
    file.setAttribute('preload', 'auto');

    const onLoadeddata = () => {
      // Default current time to zero. This will change
      file.currentTime = 0; // eslint-disable-line no-param-reassign

      return update({
        duration: file.duration
      });
    };

    const onTimeupdate = () => {
      const progress = (
        file.currentTime /
        file.duration * 100
      );

      return update({
        progress,
        currentTime: file.currentTime
      });
    };

    const onEnded = () => {
      const { shouldRepeat } = this.props;

      if (shouldRepeat) {
        file.pause();
        file.currentTime = 0; // eslint-disable-line no-param-reassign
        return file.play();
      }

      if (file.readyState >= 3 && file.paused) {
        file.pause();
      }

      return update({
        isPlaying: false
      });
    };

    const onPlay = () => {};

    file.onloadeddata = onLoadeddata;  // eslint-disable-line no-param-reassign
    file.ontimeupdate = onTimeupdate; // eslint-disable-line no-param-reassign
    file.onplay = onPlay; // eslint-disable-line no-param-reassign
    file.onended = onEnded; // eslint-disable-line no-param-reassign

    return file;
  }

  handleRemoveFileListeneres(file) {
    file.pause();
    file.onloadeddata = null; // eslint-disable-line no-param-reassign
    file.ontimeupdate = null; // eslint-disable-line no-param-reassign
    file.onplay = null; // eslint-disable-line no-param-reassign
    file.onended = null; // eslint-disable-line no-param-reassign
  }

  renderPlayStopButtons() {
    const { isStarted, stop } = this.props; // eslint-disable-line no-shadow

    let icon = <i className="ss-icon ss-play" />;

    if (isStarted) {
      icon = <i className="ss-icon ss-pause" />;
    }

    return (
      <a className={`pointer ${style.buttons}`} onClick={isStarted ? stop : this.start}>
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
      stop, // eslint-disable-line no-shadow
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
          <Loader />
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
              doStop={stop} // eslint-disable-line react/jsx-no-bind
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
