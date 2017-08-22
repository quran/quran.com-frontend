/* global document */
// TODO: This file is too too large.
<<<<<<< HEAD
<<<<<<< HEAD
import React, { Component, PropTypes } from 'react';
import styled from 'styled-components';
=======
import React, { Component } from 'react';
import PropTypes from 'prop-types';
>>>>>>> graphql + react router
import * as customPropTypes from 'customPropTypes';
=======
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
>>>>>>> working audioplayer
import { connect } from 'react-redux';
import * as customPropTypes from 'customPropTypes';
import { camelize } from 'humps';
import Loadable from 'react-loadable';
import LocaleFormattedMessage from 'components/LocaleFormattedMessage';
import * as AudioActions from 'redux/actions/audioplayer';

// Helpers
import debug from 'helpers/debug';
import scroller from 'utils/scroller';

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

<<<<<<< HEAD
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
=======
const ControlButton = styled.a`
  cursor: pointer;
  width: 100%;
  display: inline-block;
  cursor: pointer;
  padding-right: 1.5%;
  color: ${props => props.theme.textColor || '#939598'};
  outline: none;

  &:focus, &:active{
    outline: none;
  }
>>>>>>> working audioplayer

  ${props => (props.disabled ? `
      opacity: 0.5;
      cursor: not-allowed !important;
      pointer-events: none;
    ` : '')}
`;

export class Audioplayer extends React.PureComponent {
  componentDidMount() {
    const { currentFile } = this.props;

    debug('component:Audioplayer', 'componentDidMount');

    if (currentFile) {
      return this.handleAddFileListeners(currentFile);
    }

    return false;
  }

  componentDidUpdate(prevProps) {
    const { currentFile, isPlaying } = this.props;

    if (!currentFile) return false;

    if (prevProps.currentFile !== currentFile) {
      this.handleAddFileListeners(currentFile);
    }

    if (isPlaying) {
      const playPromise = currentFile.play();
      // Catch/silence error when a pause interrupts a play request
      // on browsers which return a promise
      if (playPromise !== undefined && typeof playPromise.then === 'function') {
        playPromise.then(null, () => {});
      }
    } else {
      currentFile.pause();
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
    const { isPlaying, play, pause, currentVerse } = this.props; // eslint-disable-line no-shadow, max-len
    const previouslyPlaying = isPlaying;

    if (isPlaying) pause();

    const nextVerse = this[camelize(`get_${direction}`)]();
    if (!nextVerse) return pause();

    this.props[direction](currentVerse.verseKey);

    this.handleScrollTo(nextVerse);

    // this.preloadNext();

    if (previouslyPlaying) play();

    return false;
  };

  scrollToVerse = (ayahNum = this.props.currentVerse.verseKey) => {
    scroller.scrollTo(`verse:${ayahNum}`, -45);
  };

  handleScrollTo = (ayahNum) => {
    const { shouldScroll } = this.props;

    if (shouldScroll) {
      this.scrollToVerse(ayahNum);
    }
  };

  play = () => {
    // this.handleScrollTo();

    this.props.play();
    // this.preloadNext();
  };

  preloadNext() {
    const { currentVerse, files } = this.props;
    const ayahIds = Object.keys(files);
    const index = ayahIds.findIndex(id => id === currentVerse.verseKey) + 1;

    for (let id = index; id <= index + 2; id += 1) {
      if (ayahIds[id]) {
        const verseKey = ayahIds[id];

        if (files[verseKey]) {
          files[verseKey].setAttribute('preload', 'auto');
        }
      }
    }
  }

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

    const onLoadeddata = () => {
      // Default current time to zero. This will change
      file.currentTime = 0; // eslint-disable-line
      // file.currentTime || currentTime || 0;

      return update({
        duration: file.duration,
        isLoading: false
      });
    };

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

      if (file.readyState >= 3 && file.paused) {
        file.pause();
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

<<<<<<< HEAD
  handleRemoveFileListeners = (file) => {
    file.pause();
    file.currentTime = 0; // eslint-disable-line no-param-reassign
    file.onloadeddata = null; // eslint-disable-line no-param-reassign
    file.ontimeupdate = null; // eslint-disable-line no-param-reassign
    file.onplay = null; // eslint-disable-line no-param-reassign
    file.onpause = null; // eslint-disable-line no-param-reassign
    file.onended = null; // eslint-disable-line no-param-reassign
    file.onprogress = null; // eslint-disable-line no-param-reassign
  };

=======
>>>>>>> working audioplayer
  handleTrackChange = (fraction) => {
    const { currentFile, update } = this.props; // eslint-disable-line no-shadow

    update({
      currentTime: fraction * currentFile.duration
    });

    currentFile.currentTime = fraction * currentFile.duration;
  };

  renderPlayOrPauseButton() {
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
    const { currentVerse } = this.props;

    const isStart = currentVerse.verseNumber === 1;

    return (
      <ControlButton
        tabIndex="-1"
        className={`pointer ${style.buttons} ${isStart ? style.disabled : ''}`}
        onClick={() => this.handleVerseChange('previous')}
      >
        <i className="ss-icon ss-skipback" />
      </ControlButton>
    );
  }

  renderNextButton() {
    const { chapter, currentVerse } = this.props;

    if (!chapter) return false;

    const isEnd = chapter.versesCount === currentVerse.verseNumber;

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
    debug('component:Audioplayer', 'render');

    const {
      className,
      segments,
      isLoading,
      currentVerse,
      currentFile,
      currentTime,
      duration,
      chapter,
      isPlaying,
      repeat, // eslint-disable-line no-shadow
      shouldScroll, // eslint-disable-line no-shadow
      setRepeat // eslint-disable-line no-shadow
    } = this.props;

    // if (isLoading) {
    //   return (
    //     <li className={`${style.container} ${className}`}>
    //       <div>
    //         <LocaleFormattedMessage
    //           id="app.loading"
    //           defaultMessage="Loading..."
    //         />
    //       </div>
    //     </li>
    //   );
    // }

    return (
      <div
        className={`${isPlaying &&
          style.isPlaying} ${style.container} ${className}`}
      >
        <Wrapper>
          {currentFile &&
            <Track
              progress={currentTime / duration * 100}
              onTrackChange={this.handleTrackChange}
            />}
          {segments &&
            segments[currentVerse.verseKey] &&
            <Segments
              segments={segments[currentVerse.verseKey]}
              currentVerse={currentVerse.verseKey}
              currentTime={currentTime}
            />}
        </Wrapper>
        <ul className="list-inline" style={{ margin: 0 }}>
          <ControlItem>
            <LocaleFormattedMessage
              id="player.currentVerse"
              defaultMessage="Ayah"
            />
<<<<<<< HEAD
            : {currentVerse.verseKey.split(':')[1]}
          </ControlItem>
          <ControlItem>
=======
            :
            {' '}
            {currentVerse.verseNumber}
          </li>
          <li className={style.controlItem}>
>>>>>>> graphql + react router
            {this.renderPreviousButton()}
<<<<<<< HEAD
          </ControlItem>
          <ControlItem>
            {this.renderPlayStopButtons()}
          </ControlItem>
          <ControlItem>
            {this.renderNextButton()}
          </ControlItem>
          <ControlItem>
=======
          </li>
          <li className={style.controlItem}>
            {this.renderPlayOrPauseButton()}
          </li>
          <li className={style.controlItem}>
            {this.renderNextButton()}
          </li>
          {/* <li className={style.controlItem}>
>>>>>>> working audioplayer
            <RepeatDropdown
              repeat={repeat}
              setRepeat={setRepeat}
              current={parseInt(currentVerse.verseNumber, 10)}
              chapter={chapter}
            />
<<<<<<< HEAD
          </ControlItem>
          <ControlItem>
=======
          </li> */}
          {/* <li className={style.controlItem}>
>>>>>>> working audioplayer
            <ScrollButton
              shouldScroll={shouldScroll}
              onScrollToggle={this.handleScrollToggle}
            />
<<<<<<< HEAD
          </ControlItem>
=======
          </li> */}
>>>>>>> working audioplayer
        </ul>
      </div>
    );
  }
}

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
  currentTime: PropTypes.number,
  duration: PropTypes.number,
  // NOTE: should be PropTypes.instanceOf(Audio) but not on server.
  currentFile: PropTypes.any, // eslint-disable-line
  verseIds: PropTypes.object // eslint-disable-line
};

const mapStateToProps = (state, ownProps) => {
  const verseIds = ownProps.verses.map(verse => verse.verseNumber);

  return {
    verseIds,
    isPlaying: state.audioplayer.isPlaying,
    isLoading: state.audioplayer.isLoading,
    repeat: state.audioplayer.repeat,
    shouldScroll: state.audioplayer.shouldScroll,
    duration: state.audioplayer.duration,
    currentTime: state.audioplayer.currentTime,
    audio: state.options.audio
  };
};

export default connect(mapStateToProps, AudioActions)(Audioplayer);
