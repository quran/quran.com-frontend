/* global document */
// TODO: This file is too too large.
import styled from 'styled-components';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as customPropTypes from 'customPropTypes';
import { connect } from 'react-redux';
import Loadable from 'react-loadable';
import LocaleFormattedMessage from 'components/LocaleFormattedMessage';

// Helpers
import debug from 'helpers/debug';
import scroller from 'utils/scroller';

// Redux
import * as AudioActions from 'redux/actions/audioplayer';

import ComponentLoader from 'components/ComponentLoader';
import Track from './Track';
import Segments from './Segments';
import ScrollButton from './ScrollButton';

const style = require('./style.scss');

const RepeatDropdown = Loadable({
  loader: () =>
    import(/* webpackChunkName: "repeatdropdown" */ './RepeatDropdown'),
  loading: ComponentLoader
});

const Wrapper = styled.div`
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  height: 10%;
`;

const ControlItem = styled.li`
  vertical-align: middle;
  padding-right: 20px;
  color: #939598;
`;

export class Audioplayer extends Component {
  state = {
    loadingFile: false
  };

  componentDidMount() {
    const { currentFile } = this.props; // eslint-disable-line no-shadow, max-len

    debug('component:Audioplayer', 'componentDidMount');

    if (currentFile) {
      return this.handleAddFileListeners(currentFile);
    }

    return false;
  }

  componentWillReceiveProps({
    currentFile: nextFile,
  }) {
    const { currentFile } = this.props;

    if (!currentFile && nextFile) {
      this.handleAddFileListeners(nextFile);
    }

    if (currentFile !== nextFile) {
      this.handleAddFileListeners(nextFile);
    }
  }

  componentDidUpdate({ isPlaying: previousPlaying, currentFile: previousFile }) {
    const { currentFile, isPlaying } = this.props;

    if (!currentFile) return false;

    if (isPlaying !== previousPlaying) {
      if (isPlaying) {
        debug('component:Audioplayer', 'play');
        const playPromise = currentFile.play();
        // Catch/silence error when a pause interrupts a play request
        // on browsers which return a promise
        if (
          playPromise !== undefined &&
          typeof playPromise.then === 'function'
        ) {
          playPromise.then(null, () => {});
        }
      }

      if (!isPlaying) {
        debug('component:Audioplayer', 'pause');
        return currentFile.pause();
      }
    }

    if (currentFile !== previousFile) {
      if (isPlaying) {
        debug('component:Audioplayer', 'play');
        const playPromise = currentFile.play();
        // Catch/silence error when a pause interrupts a play request
        // on browsers which return a promise
        if (
          playPromise !== undefined &&
          typeof playPromise.then === 'function'
        ) {
          playPromise.then(null, () => {});
        }
      }
    }

    return false;
  }

  getPrevious() {
    const { currentVerse, verseIds } = this.props;
    const index = verseIds.findIndex(id => id === currentVerse.verseKey);

    return verseIds[index - 1];
  }

  getNext() {
    const { currentVerse, chapter, onLoadAyahs, verseIds } = this.props;
    const ayahNum = currentVerse.verseNumber;
    const index = verseIds.findIndex(id => id === currentVerse.verseKey);

    if (chapter.versesCount === ayahNum + 1) {
      // We are at the end of the chapter!
      return false;
    }

    if (verseIds.length - 3 <= index + 1) {
      // Need to load the next set of ayahs!
      onLoadAyahs();
    }

    return verseIds[index + 1];
  }

  handleVerseChange = (direction = 'next') => {
    const { pause, currentVerse } = this.props; // eslint-disable-line no-shadow, max-len
    const directions = {
      next: 'getNext',
      previous: 'getPrevious'
    };

    const nextVerse = this[directions[direction]]();
    if (!nextVerse) return pause();

    this.props[direction](currentVerse.verseKey);

    this.handleScrollTo(nextVerse);

    return false;
  };

  scrollToVerse = (verseNumber = this.props.currentVerse.verseKey) => {
    scroller.scrollTo(`verse:${verseNumber}`, -45);
  };

  handleScrollTo = (verseNumber) => {
    const { shouldScroll } = this.props;

    if (shouldScroll) {
      this.scrollToVerse(verseNumber);
    }
  };

  play = () => {
    this.handleScrollTo();

    this.props.play();
  };

  handleRepeat = (file) => {
    const {
      repeat,
      currentVerse,
      setRepeat, // eslint-disable-line no-shadow
      setAyah // eslint-disable-line no-shadow
    } = this.props;
    const [chapter, ayah] = currentVerse.verseKey
      .split(':')
      .map(val => parseInt(val, 10));

    file.pause();

    if (repeat.from > ayah && repeat.to < ayah) {
      // user selected a range where current ayah is outside
      return this.handleVerseChange();
    }

    if (repeat.from === repeat.to) {
      // user selected single ayah repeat
      if (ayah !== repeat.from) return this.handleVerseChange();

      if (repeat.times === 1) {
        // end of times
        setRepeat({});

        return this.handleVerseChange();
      }

      setRepeat({ ...repeat, times: repeat.times - 1 });
      file.currentTime = 0; // eslint-disable-line no-param-reassign

      return file.play();
    }

    if (repeat.from !== repeat.to) {
      // user selected a range
      if (ayah < repeat.to) {
        // still in range
        return this.handleVerseChange();
      }

      if (ayah === repeat.to) {
        // end of range
        if (repeat.times === 1) {
          // end of times
          setRepeat({});

          return this.handleVerseChange();
        }

        setRepeat({ ...repeat, times: repeat.times - 1 });
        setAyah(`${chapter}:${repeat.from}`);

        return this.play();
      }
    }

    return false;
  };

  handleScrollToggle = (event) => {
    event.preventDefault();

    const { shouldScroll, currentVerse } = this.props;

    if (!shouldScroll) {
      // we use the inverse (!) here because we're toggling, so false is true
      this.scrollToVerse(currentVerse.verseKey);
    }

    this.props.toggleScroll();
  };

  handleAddFileListeners(file) {
    // NOTE: if no file, just wait.
    if (!file) return false;

    const { update } = this.props; // eslint-disable-line no-shadow
    debug('component:Audioplayer', `Attaching listeners to ${file.src}`);

    // Preload file
    file.setAttribute('preload', 'auto');
    file.currentTime = 0; // eslint-disable-line

    const onLoadeddata = () =>
      update({
        duration: file.duration,
        isLoading: false
      });

    const onTimeupdate = () =>
      update({
        currentTime: file.currentTime,
        duration: file.duration
      });

    const onEnded = () => {
      const { repeat } = this.props;

      if (repeat.from) {
        return this.handleRepeat(file);
      }

      return this.handleVerseChange();
    };

    const onPlay = () => {
      file.ontimeupdate = onTimeupdate; // eslint-disable-line no-param-reassign
    };

    const onPause = () => {
      file.ontimeupdate = null; // eslint-disable-line no-param-reassign
    };

    file.onloadeddata = onLoadeddata; // eslint-disable-line no-param-reassign
    file.onpause = onPause; // eslint-disable-line no-param-reassign
    file.onplay = onPlay; // eslint-disable-line no-param-reassign
    file.onended = onEnded; // eslint-disable-line no-param-reassign

    return file;
  }

  handleTrackChange = (fraction) => {
    const { currentFile } = this.props;

    currentFile.currentTime = fraction * currentFile.duration;
  };

  renderPlayStopButtons() {
    const { isPlaying, pause } = this.props; // eslint-disable-line no-shadow

    return (
      <a
        tabIndex="-1"
        className={`pointer text-center ${style.playingButton} ${style.buttons}`}
        onClick={isPlaying ? pause : this.play}
      >
        <i className={`ss-icon ${isPlaying ? 'ss-pause' : 'ss-play'}`} />
      </a>
    );
  }

  renderPreviousButton() {
    const { currentVerse, files } = this.props;
    if (!files) return false;
    const index = Object.keys(files).findIndex(
      id => id === currentVerse.verseKey
    );

    return (
      <a
        tabIndex="-1"
        className={`pointer ${style.buttons} ${!index ? style.disabled : ''}`}
        onClick={() => index && this.handleVerseChange('previous')}
      >
        <i className="ss-icon ss-skipback" />
      </a>
    );
  }

  renderNextButton() {
    const { chapter, currentVerse } = this.props;
    if (!chapter) return false;
    const isEnd =
      chapter.versesCount === parseInt(currentVerse.verseNumber, 10);

    return (
      <a
        tabIndex="-1"
        className={`pointer ${style.buttons} ${isEnd ? style.disabled : ''}`}
        onClick={() => !isEnd && this.handleVerseChange()}
      >
        <i className="ss-icon ss-skipforward" />
      </a>
    );
  }

  render() {
    const {
      className,
      segments,
      isLoading,
      currentVerse,
      currentFile,
      chapter,
      isPlaying,
      repeat, // eslint-disable-line no-shadow
      shouldScroll, // eslint-disable-line no-shadow
      setRepeat // eslint-disable-line no-shadow
    } = this.props;

    if (isLoading || !currentFile) {
      return (
        <li className={`${style.container} ${className}`}>
          <div>
            <LocaleFormattedMessage
              id="app.loading"
              defaultMessage="Loading..."
            />
          </div>
        </li>
      );
    }

    return (
      <div
        className={`${isPlaying && style.isPlaying} ${style.container} ${className}`}
      >
        <Wrapper>
          {currentFile &&
            <Track
              progress={currentFile.currentTime / currentFile.duration * 100}
              onTrackChange={this.handleTrackChange}
            />}
          {segments &&
            segments[currentVerse.verseKey] &&
            <Segments
              segments={segments[currentVerse.verseKey]}
              currentVerse={currentVerse.verseKey}
              currentTime={currentFile.currentTime}
            />}
        </Wrapper>
        <ul className="list-inline" style={{ margin: 0 }}>
          <ControlItem>
            <LocaleFormattedMessage
              id="player.currentVerse"
              defaultMessage="Ayah"
            />
            :
            {' '}
            {currentVerse.verseNumber}
          </ControlItem>
          <ControlItem>
            {this.renderPreviousButton()}
          </ControlItem>
          <ControlItem>
            {this.renderPlayStopButtons()}
          </ControlItem>
          <ControlItem>
            {this.renderNextButton()}
          </ControlItem>
          <ControlItem>
            <RepeatDropdown
              repeat={repeat}
              setRepeat={setRepeat}
              current={parseInt(currentVerse.verseNumber, 10)}
              chapter={chapter}
            />
          </ControlItem>
          <ControlItem>
            <ScrollButton
              shouldScroll={shouldScroll}
              onScrollToggle={this.handleScrollToggle}
            />
          </ControlItem>
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const files = state.audioplayer.files[ownProps.chapter.id];
  const verseIds = Object.keys(ownProps.verses);

  return {
    files,
    verseIds,
    chapterId: ownProps.chapter.id,
    isPlaying: state.audioplayer.isPlaying,
    isLoading: state.audioplayer.isLoading,
    repeat: state.audioplayer.repeat,
    shouldScroll: state.audioplayer.shouldScroll,
    duration: state.audioplayer.duration,
    currentTime: state.audioplayer.currentTime,
    audio: state.options.audio
  };
};

Audioplayer.propTypes = {
  className: PropTypes.string,
  chapter: customPropTypes.surahType,
  onLoadAyahs: PropTypes.func.isRequired,
  segments: customPropTypes.segments,
  // NOTE: should be PropTypes.instanceOf(Audio) but not on server.
  files: PropTypes.object, // eslint-disable-line
  currentVerse: PropTypes.verseType,
  isLoading: PropTypes.bool.isRequired,
  play: PropTypes.func.isRequired,
  pause: PropTypes.func.isRequired,
  next: PropTypes.func.isRequired, // eslint-disable-line
  previous: PropTypes.func.isRequired, // eslint-disable-line
  update: PropTypes.func.isRequired,
  repeat: customPropTypes.timeInterval.isRequired,
  shouldScroll: PropTypes.bool.isRequired,
  setRepeat: PropTypes.func.isRequired,
  setAyah: PropTypes.func.isRequired,
  toggleScroll: PropTypes.func.isRequired,
  isPlaying: PropTypes.bool,
  // NOTE: should be PropTypes.instanceOf(Audio) but not on server.
  currentFile: PropTypes.any, // eslint-disable-line
  verseIds: PropTypes.object // eslint-disable-line
};

export default connect(mapStateToProps, AudioActions)(Audioplayer);
