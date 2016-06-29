import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { camelize } from 'humps';

// Redux
import {
  start,
  stop,
  next,
  previous,
  toggleRepeat,
  toggleScroll,
  buildOnClient,
  update,
  setCurrentFile,
  setCurrentWord
} from '../../redux/modules/audioplayer';

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
    currentFile: state.audioplayer.currentFile,
    currentAyah: state.audioplayer.currentAyah,
    currentWord: state.audioplayer.currentWord,
    surahId: state.audioplayer.surahId,
    isSupported: state.audioplayer.isSupported,
    isPlaying: state.audioplayer.isPlaying,
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
    next,
    previous,
    toggleRepeat,
    toggleScroll,
    setCurrentWord,
    buildOnClient,
    update,
    setCurrentFile
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
    setCurrentWord: PropTypes.func.isRequired,
    setCurrentFile: PropTypes.func.isRequired,
    start: PropTypes.func.isRequired,
    stop: PropTypes.func.isRequired,
    next: PropTypes.func.isRequired,
    previous: PropTypes.func.isRequired,
    update: PropTypes.func.isRequired,
    toggleRepeat: PropTypes.func.isRequired,
    toggleScroll: PropTypes.func.isRequired,
    isPlaying: PropTypes.bool,
    progress: PropTypes.number,
    currentTime: PropTypes.number,
    duration: PropTypes.number,
    currentFile: PropTypes.object
  };

  static defaultProps = {
    className: 'col-md-3'
  };

  componentDidMount() {
    const { isLoadedOnClient, buildOnClient, surah, currentFile } = this.props; // eslint-disable-line no-shadow, max-len

    debug('component:Audioplayer', 'componentDidMount');

    if (!isLoadedOnClient && __CLIENT__) {
      debug('component:Audioplayer', 'componentDidMount on client');

      return buildOnClient(surah.id);
    }

    return this.handleAddFileListeners(currentFile);
  }

  componentWillReceiveProps(nextProps) {
    // When you go directly to the surah page, /2, the files are not loaded yet
    if (this.props.isLoadedOnClient !== nextProps.isLoadedOnClient) {
      return this.handleAddFileListeners(nextProps.currentFile);
    }

    if (this.props.currentAyah !== nextProps.currentAyah) {
      this.handleAddFileListeners(nextProps.currentFile);

      if (this.props.currentFile) {
        this.handleRemoveFileListeneres(this.props.currentFile);
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

  getPrevious() {
    const { currentAyah, files } = this.props;
    const ayahIds = Object.keys(files);
    const index = ayahIds.findIndex(id => id === currentAyah);

    return ayahIds[index - 1];
  }

  getNext() {
    const { currentAyah, surah, files, onLoadAyahs } = this.props;
    const ayahIds = Object.keys(files);
    const ayahNum = currentAyah.split(':')[1];
    const index = ayahIds.findIndex(id => id === currentAyah);

    if (surah.ayat === ayahNum + 1) {
      // We are at the end of the surah!
      return false;
    }

    if (ayahIds.length - 3 <= index + 1) {
      // Need to load the next set of ayahs!
      onLoadAyahs();
    }

    return ayahIds[index + 1];
  }

  handleAyahChange = (direction = 'next') => {
    const { isPlaying, start, stop, currentAyah } = this.props; // eslint-disable-line no-shadow, max-len
    const previouslyPlaying = isPlaying;

    if (isPlaying) stop();

    if (!this[camelize(`get_${direction}`)]()) return stop();

    this.props[direction]();

    this.handleScrollTo(currentAyah);

    this.preloadNext();

    if (previouslyPlaying) start();

    return false;
  }

  handleScrollTo = (ayahNum = this.props.currentAyah) => {
    const { shouldScroll } = this.props;

    if (shouldScroll) {
      scroller.scrollTo(`ayah:${ayahNum}`, -150);
    }
  }

  start = () => {
    this.handleScrollTo();

    this.props.start();
    this.preloadNext();
  }

  preloadNext() {
    const { currentAyah, files } = this.props;
    const ayahIds = Object.keys(files);
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

    const { shouldScroll, currentAyah } = this.props;

    if (!shouldScroll) { // we use the inverse (!) here because we're toggling, so false is true
      const elem = document.getElementsByName(`ayah:${currentAyah}`)[0];
      if (elem && elem.getBoundingClientRect().top < 0) { // if the ayah is above our scroll offset
        scroller.scrollTo(`ayah:${currentAyah}`, -150);
      } else {
        scroller.scrollTo(`ayah:${currentAyah}`, -80);
      }
    }

    this.props.toggleScroll();
  }

  handleAddFileListeners(file) {
    const { update } = this.props; // eslint-disable-line no-shadow
    debug('component:Audioplayer', `Attaching listeners to ${file.src}`);
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

      return this.handleAyahChange();
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
    file.currentTime = 0; // eslint-disable-line no-param-reassign
    file.onloadeddata = null; // eslint-disable-line no-param-reassign
    file.ontimeupdate = null; // eslint-disable-line no-param-reassign
    file.onplay = null; // eslint-disable-line no-param-reassign
    file.onended = null; // eslint-disable-line no-param-reassign
  }

  handleTrackChange = (fraction) => {
    const { currentFile, update } = this.props; // eslint-disable-line no-shadow

    update({
      progress: fraction * 100,
      currentTime: fraction * currentFile.duration
    });

    currentFile.currentTime = fraction * currentFile.duration;
  }

  renderPlayStopButtons() {
    const { isPlaying, stop } = this.props; // eslint-disable-line no-shadow

    let icon = <i className="ss-icon ss-play" />;

    if (isPlaying) {
      icon = <i className="ss-icon ss-pause" />;
    }

    return (
      <a className={`pointer ${style.buttons}`} onClick={isPlaying ? stop : this.start}>
        {icon}
      </a>
    );
  }

  renderPreviousButton() {
    const { currentAyah, files } = this.props;
    const index = Object.keys(files).findIndex(id => id === currentAyah);

    return (
      <a
        className={`pointer ${style.buttons} ${!index ? style.disabled : ''}`}
        onClick={() => index && this.handleAyahChange('previous')}
      >
        <i className="ss-icon ss-skipback" />
      </a>
    );
  }

  renderNextButton() {
    const { surah, currentAyah } = this.props;
    const isEnd = surah.ayat === parseInt(currentAyah.split(':')[1], 10);

    return (
      <a
        className={`pointer ${style.buttons} ${isEnd ? style.disabled : ''}`}
        onClick={() => !isEnd && this.handleAyahChange()}
      >
        <i className="ss-icon ss-skipforward" />
      </a>
    );
  }

  render() {
    debug('component:Audioplayer', 'render');

    const {
      className,
      currentFile,
      segments,
      currentAyah,
      currentWord,
      currentTime,
      setCurrentWord, // eslint-disable-line no-shadow
      isSupported,
      isLoadedOnClient,
      progress,
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

    if (!currentAyah) {
      return (
        <li className={`${style.container} ${className}`}>
          <Loader />
        </li>
      );
    }

    return (
      <div className={`${style.padding_left} ${style.container} ${className}`}>
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
        <div className={style.wrapper}>
          {isLoadedOnClient ?
            <Track
              progress={progress}
              onTrackChange={this.handleTrackChange}
            /> : null}
          {isLoadedOnClient && segments[currentAyah] ?
            <Segments
              audio={currentFile}
              segments={segments[currentAyah]}
              currentAyah={currentAyah}
              currentWord={currentWord}
              onSetCurrentWord={setCurrentWord}
              currentTime={currentTime}
            /> : null}
        </div>
      </div>
    );
  }
}
