import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { camelize } from 'humps';

// Redux
import * as AudioActions from 'redux/actions/audioplayer';

// Components
import Track from './Track';
import Segments from './Segments';
import ScrollButton from './ScrollButton';
import RepeatDropdown from './RepeatDropdown';

// Helpers
import debug from 'helpers/debug';
import scroller from 'utils/scroller';

const style = require('./style.scss');

export class Audioplayer extends Component {
  static propTypes = {
    className: PropTypes.string,
    surah: PropTypes.object.isRequired,
    onLoadAyahs: PropTypes.func.isRequired,
    segments: PropTypes.object,
    files: PropTypes.object,
    currentAyah: PropTypes.string,
    buildOnClient: PropTypes.func.isRequired,
    isLoadedOnClient: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired,
    play: PropTypes.func.isRequired,
    pause: PropTypes.func.isRequired,
    next: PropTypes.func.isRequired,
    previous: PropTypes.func.isRequired,
    update: PropTypes.func.isRequired,
    repeat: PropTypes.object.isRequired,
    shouldScroll: PropTypes.bool.isRequired,
    setRepeat: PropTypes.func.isRequired,
    setAyah: PropTypes.func.isRequired,
    toggleScroll: PropTypes.func.isRequired,
    isPlaying: PropTypes.bool,
    currentTime: PropTypes.number,
    duration: PropTypes.number,
    currentFile: PropTypes.object
  };

  componentDidMount() {
    const { isLoadedOnClient, buildOnClient, surah, currentFile } = this.props; // eslint-disable-line no-shadow, max-len

    debug('component:Audioplayer', 'componentDidMount');

    if (!isLoadedOnClient && __CLIENT__) {
      debug('component:Audioplayer', 'componentDidMount on client');

      return buildOnClient(surah.id);
    }

    if (currentFile) {
      return this.handleAddFileListeners(currentFile);
    }

    return false;
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
    const { isPlaying, play, pause, currentAyah } = this.props; // eslint-disable-line no-shadow, max-len
    const previouslyPlaying = isPlaying;

    if (isPlaying) pause();

    if (!this[camelize(`get_${direction}`)]()) return pause();

    this.props[direction](currentAyah);

    this.handleScrollTo(currentAyah);

    this.preloadNext();

    if (previouslyPlaying) play();

    return false;
  }

  handleScrollTo = (ayahNum = this.props.currentAyah) => {
    const { shouldScroll } = this.props;

    if (shouldScroll) {
      scroller.scrollTo(`ayah:${ayahNum}`, -150);
    }
  }

  play = () => {
    this.handleScrollTo();

    this.props.play();
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

  handleRepeat = (file) => {
    const {
      repeat,
      currentAyah,
      setRepeat, // eslint-disable-line no-shadow
      setAyah // eslint-disable-line no-shadow
    } = this.props;
    const [surah, ayah] = currentAyah.split(':').map(val => parseInt(val, 10));

    file.pause();

    if (repeat.from > ayah && repeat.to < ayah) {
      // user selected a range where current ayah is outside
      return this.handleAyahChange();
    }

    if (repeat.from === repeat.to) {
      // user selected single ayah repeat
      if (ayah !== repeat.from) return this.handleAyahChange();

      if (repeat.times === 1) {
        // end of times
        setRepeat({});

        return this.handleAyahChange();
      }

      setRepeat({ ...repeat, times: repeat.times - 1 });
      file.currentTime = 0; // eslint-disable-line no-param-reassign

      return file.play();
    }

    if (repeat.from !== repeat.to) {
      // user selected a range
      if (ayah < repeat.to) {
        // still in range
        return this.handleAyahChange();
      }

      if (ayah === repeat.to) {
        // end of range
        if (repeat.times === 1) {
          // end of times
          setRepeat({});

          return this.handleAyahChange();
        }

        setRepeat({ ...repeat, times: repeat.times - 1 });
        setAyah(`${surah}:${repeat.from}`);

        return this.play();
      }
    }

    return false;
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
    const { update, currentTime } = this.props; // eslint-disable-line no-shadow
    console.log('component:Audioplayer', `Attaching listeners to ${file.src}`);

    // Preload file
    file.setAttribute('preload', 'auto');

    const onLoadeddata = () => {
      // Default current time to zero. This will change
      file.currentTime = ( // eslint-disable-line no-param-reassign
        file.currentTime ||
        currentTime ||
        0
      );

      return update({
        duration: file.duration,
        isLoading: false
      });
    };

    const onTimeupdate = () => update({
      currentTime: file.currentTime,
      duration: file.duration
    });

    const onEnded = () => {
      const { repeat } = this.props;

      if (repeat.from) {
        return this.handleRepeat(file);
      }

      if (file.readyState >= 3 && file.paused) {
        file.pause();
      }

      return this.handleAyahChange();
    };

    const onPlay = () => {
      file.ontimeupdate = onTimeupdate; // eslint-disable-line no-param-reassign
    };

    const onPause = () => {
      file.ontimeupdate = null; // eslint-disable-line no-param-reassign
    };

    const onProgress = () => {
    };

    file.onloadeddata = onLoadeddata;  // eslint-disable-line no-param-reassign
    file.onpause = onPause; // eslint-disable-line no-param-reassign
    file.onplay = onPlay; // eslint-disable-line no-param-reassign
    file.onended = onEnded; // eslint-disable-line no-param-reassign
    file.onprogress = onProgress; // eslint-disable-line no-param-reassign

    return file;
  }

  handleRemoveFileListeneres(file) {
    file.pause();
    file.currentTime = 0; // eslint-disable-line no-param-reassign
    file.onloadeddata = null; // eslint-disable-line no-param-reassign
    file.ontimeupdate = null; // eslint-disable-line no-param-reassign
    file.onplay = null; // eslint-disable-line no-param-reassign
    file.onPause = null; // eslint-disable-line no-param-reassign
    file.onended = null; // eslint-disable-line no-param-reassign
    file.onprogress = null; // eslint-disable-line no-param-reassign
  }

  handleTrackChange = (fraction) => {
    const { currentFile, update } = this.props; // eslint-disable-line no-shadow

    update({
      currentTime: fraction * currentFile.duration
    });

    currentFile.currentTime = fraction * currentFile.duration;
  }

  renderPlayStopButtons() {
    const { isPlaying, pause } = this.props; // eslint-disable-line no-shadow

    let icon = <i className="ss-icon ss-play" />;

    if (isPlaying) {
      icon = <i className="ss-icon ss-pause" />;
    }

    return (
      <a className={`pointer text-center ${style.playingButton} ${style.buttons}`} onClick={isPlaying ? pause : this.play}>
        {icon}
      </a>
    );
  }

  renderPreviousButton() {
    const { currentAyah, files } = this.props;
    if (!files) return false;
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
    if (!surah) return false;
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
      isLoading,
      currentAyah,
      currentTime,
      duration,
      surah,
      isPlaying,
      isLoadedOnClient,
      repeat, // eslint-disable-line no-shadow
      shouldScroll, // eslint-disable-line no-shadow
      setRepeat // eslint-disable-line no-shadow
    } = this.props;

    if (isLoading) {
      return (
        <li className={`${style.container} ${className}`}>
          <div>Loading...</div>
        </li>
      );
    }

    return (
      <div className={`${isPlaying && style.isPlaying} ${style.container} ${className}`}>
        <div className={style.wrapper}>
          {isLoadedOnClient ?
            <Track
              progress={currentTime / duration * 100}
              onTrackChange={this.handleTrackChange}
            /> : null}
          {isLoadedOnClient && segments[currentAyah] && typeof segments[currentAyah] !== 'string' ?
            <Segments
              audio={currentFile}
              segments={segments[currentAyah]}
              currentAyah={currentAyah}
              currentTime={currentTime}
            /> : null}
        </div>
        <ul className={`list-inline ${style.controls}`}>
          <li className={style.controlItem}>
            Ayah: {currentAyah.split(':')[1]}
          </li>
          <li className={style.controlItem}>
            {this.renderPreviousButton()}
          </li>
          <li className={style.controlItem}>
            {this.renderPlayStopButtons()}
          </li>
          <li className={style.controlItem}>
            {this.renderNextButton()}
          </li>
          <li className={style.controlItem}>
            <RepeatDropdown
              repeat={repeat}
              setRepeat={setRepeat}
              current={parseInt(currentAyah.split(':')[1], 10)}
              surah={surah}
            />
          </li>
          <li className={style.controlItem}>
            <ScrollButton shouldScroll={shouldScroll} onScrollToggle={this.handleScrollToggle} />
          </li>
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  files: state.audioplayer.files[ownProps.surah.id],
  segments: state.audioplayer.segments[ownProps.surah.id],
  currentFile: state.audioplayer.currentFile,
  currentAyah: state.audioplayer.currentAyah,
  surahId: state.audioplayer.surahId,
  isPlaying: state.audioplayer.isPlaying,
  isLoadedOnClient: state.audioplayer.isLoadedOnClient,
  isLoading: state.audioplayer.isLoading,
  repeat: state.audioplayer.repeat,
  shouldScroll: state.audioplayer.shouldScroll,
  duration: state.audioplayer.duration,
  currentTime: state.audioplayer.currentTime,
});

export default connect(mapStateToProps, AudioActions)(Audioplayer);
