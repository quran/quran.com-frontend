/* global document */
// TODO: This file is too too large.
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import * as customPropTypes from 'customPropTypes';
import { connect } from 'react-redux';
import { camelize } from 'humps';
import Loadable from 'react-loadable';
import Loader from 'quran-components/lib/Loader';
import LocaleFormattedMessage from 'components/LocaleFormattedMessage';

// Helpers
import debug from 'helpers/debug';
import scroller from 'utils/scroller';

// Redux
import * as AudioActions from 'redux/actions/audioplayer';

import ComponentLoader from 'components/ComponentLoader';
import Popover from 'react-bootstrap/lib/Popover';

import Track from './Track';
import Segments from './Segments';
import ScrollButton from './ScrollButton';

const RepeatDropdown = Loadable({
  loader: () =>
    import(/* webpackChunkName: "RepeatDropdown" */ './RepeatDropdown'),
  LoadingComponent: ComponentLoader
});

const LoaderStyle = {
  position: 'relative',
  overflow: 'hidden',
  width: '32px',
  height: '32px',
  margin: '-8px',
  background: '#ffffff'
};

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

const Container = styled.div`
  position: fixed;
  bottom: 15px;
  display: block;
  user-select: none;
  height: auto;
  z-index: 1;
  padding: 10px 20px 5px;
  background: ${props => props.theme.colors.white};
  box-shadow: 0 0 0.5rem 0 rgba(0, 0, 0, 0.2);
  min-width: 340px;

  @media (max-width: ${props => props.theme.screen.sm}) {
    bottom: 0;
    width: 100%;
  }
`;

const playingButton = css`
  background: ${props => props.theme.brandPrimary};
  color: #fff;
  height: 32px;
  width: 32px;
  padding: 8px;
  border-radius: 50%;
  position: relative;
  vertical-align: middle;
  &:hover {
    opacity: 0.75;
  }
`;

const disabled = css`
  opacity: 0.5;
  cursor: not-allowed !important;
  pointer-events: none;
`;

const isDisabledCss = props => (props.disabled ? disabled : '');
const isPlayingCss = props => (props.playingButton ? playingButton : '');

export const ControlButton = styled.a`
  width: 100%;
  display: inline-block;
  cursor: pointer;
  padding: 0 10px;
  color: ${props =>
    props.active ? props.theme.brandPrimary : props.theme.textColor};
  outline: none;
  &:focus,
  &:active {
    outline: none;
  }

  ${isPlayingCss} ${isDisabledCss} i.fa {
    color: inherit;
    font-size: 100%;
  }
`;

export const StyledPopover = styled(Popover)`
  .popover-title {
    font-family: ${props => props.theme.fonts.montserrat};
    text-transform: uppercase;
    color: ${props => props.theme.brandPrimary};
    padding-top: 15px;
    padding-bottom: 15px;
    font-size: 0.75em;
  }
  .popover-content {
    text-align: center;
    a {
      font-size: 0.8em;
    }
  }
`;

export class Audioplayer extends Component {
  state = {
    loadingFile: false
  };

  componentDidMount() {
    const { currentFile, currentVerse, audio, verses, load } = this.props; // eslint-disable-line no-shadow, max-len
    const nextVerse = verses[this.getNext()];

    debug('component:Audioplayer', 'componentDidMount');

    if (currentFile) {
      return this.handleAddFileListeners(currentFile);
    }

    load({
      chapterId: currentVerse.chapterId,
      verseId: currentVerse.id,
      verseKey: currentVerse.verseKey,
      audio
    });

    if (nextVerse) {
      load({
        chapterId: nextVerse.chapterId,
        verseId: nextVerse.id,
        verseKey: nextVerse.verseKey,
        audio
      });
    }

    return false;
  }

  componentWillReceiveProps(nextProps) {
    // Make sure we have a current ayah to mount it to Audio
    if (!this.props.currentVerse && !nextProps.currentFile) {
      return false;
    }

    // First load
    if (this.props.currentFile !== nextProps.currentFile) {
      if (this.props.currentFile) {
        this.handleRemoveFileListeners(this.props.currentFile);
      }

      return this.handleAddFileListeners(nextProps.currentFile);
    }

    // Change verse
    if (this.props.currentVerse.verseKey !== nextProps.currentVerse.verseKey) {
      if (this.props.currentFile) {
        this.handleRemoveFileListeners(this.props.currentFile);
      }

      return this.handleAddFileListeners(nextProps.currentFile);
    }

    if (this.props.audio !== nextProps.audio) {
      Object.keys(this.props.files).forEach(key =>
        this.props.load({
          chapterId: this.props.verses[key].chapterId,
          verseId: this.props.verses[key].id,
          verseKey: this.props.verses[key].verseKey,
          audio: nextProps.audio
        })
      );
    }

    return false;
  }

  componentDidUpdate(previousProps) {
    const {
      currentFile,
      isPlaying,
      verses,
      audio,
      currentVerse,
      load
    } = this.props;

    if (
      currentVerse.verseKey !== previousProps.currentVerse.verseKey &&
      verses[this.getNext()]
    ) {
      const verse = verses[this.getNext()];
      load({
        chapterId: verse.chapterId,
        verseId: verse.id,
        verseKey: verse.verseKey,
        audio
      });
    }

    if (!currentFile) return false;

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

  componentWillUnmount() {
    const { files, currentFile } = this.props;
    debug('component:Audioplayer', 'componentWillUnmount');

    if (files[currentFile]) {
      return this.handleRemoveFileListeners(files[currentFile]);
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
    const ayahNum = currentVerse.verseKey.split(':')[1];
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

  handleAyahChange = (direction = 'next') => {
    const { isPlaying, play, pause, currentVerse } = this.props; // eslint-disable-line no-shadow, max-len
    const previouslyPlaying = isPlaying;

    if (isPlaying) pause();

    const nextVerse = this[camelize(`get_${direction}`)]();
    if (!nextVerse) return pause();

    this.props[direction](currentVerse.verseKey);

    this.handleScrollTo(nextVerse);

    this.preloadNext();

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
    this.handleScrollTo();

    this.props.play();
    this.preloadNext();
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
        setAyah(`${chapter}:${repeat.from}`);

        return this.play();
      }
    }

    return false;
  };

  handleScrollToggle = () => {
    const { shouldScroll, currentVerse, isPlaying } = this.props;

    if (!shouldScroll && isPlaying) {
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

      return this.handleAyahChange();
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

  handleTrackChange = (fraction) => {
    const { currentFile, update } = this.props; // eslint-disable-line no-shadow

    update({
      currentTime: fraction * currentFile.duration
    });

    currentFile.currentTime = fraction * currentFile.duration;
  };

  renderPlayStopButtons() {
    const { isPlaying, pause } = this.props; // eslint-disable-line no-shadow
    // if(true)
    // return <Loader isActive relative style={LoaderStyle} />

    return (
      <ControlButton
        tabIndex="-1"
        className="pointer text-center"
        onClick={isPlaying ? pause : this.play}
        playingButton
      >
        <i className={`ss-icon ${isPlaying ? 'ss-pause' : 'ss-play'}`} />
      </ControlButton>
    );
  }

  renderPreviousButton() {
    const { currentVerse, files } = this.props;

    if (!files) return false;
    const index = Object.keys(files).findIndex(
      id => id === currentVerse.verseKey
    );

    return (
      <ControlButton
        tabIndex="-1"
        className="pointer"
        onClick={() => index && this.handleAyahChange('previous')}
        disabled={!index}
      >
        <i className="ss-icon ss-skipback" />
      </ControlButton>
    );
  }

  renderNextButton() {
    const { chapter, currentVerse } = this.props;
    if (!chapter) return false;
    const isEnd =
      chapter.versesCount === parseInt(currentVerse.verseKey.split(':')[1], 10);

    return (
      <ControlButton
        tabIndex="-1"
        className="pointer"
        onClick={() => !isEnd && this.handleAyahChange()}
        disabled={isEnd}
      >
        <i className="ss-icon ss-skipforward" />
      </ControlButton>
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
      repeat, // eslint-disable-line no-shadow
      shouldScroll, // eslint-disable-line no-shadow
      setRepeat // eslint-disable-line no-shadow
    } = this.props;

    if (isLoading || !currentFile) {
      return (
        <Container className={className}>
          <div>
            <LocaleFormattedMessage
              id="app.loading"
              defaultMessage="Loading..."
            />
          </div>
        </Container>
      );
    }

    return (
      <Container className={className}>
        <Wrapper>
          {currentFile && (
            <Track
              progress={currentTime / duration * 100}
              onTrackChange={this.handleTrackChange}
            />
          )}
          {segments &&
            segments[currentVerse.verseKey] && (
              <Segments
                segments={segments[currentVerse.verseKey]}
                currentVerse={currentVerse.verseKey}
                currentTime={currentTime}
              />
            )}
        </Wrapper>
        <ul className="list-inline" style={{ margin: 0 }}>
          <ControlItem>
            <LocaleFormattedMessage
              id="player.currentVerse"
              defaultMessage="Ayah"
            />
            : {currentVerse.verseKey.split(':')[1]}
          </ControlItem>
          <ControlItem>{this.renderPreviousButton()}</ControlItem>
          <ControlItem>{this.renderPlayStopButtons()}</ControlItem>
          <ControlItem>{this.renderNextButton()}</ControlItem>
          <ControlItem>
            <RepeatDropdown
              repeat={repeat}
              setRepeat={setRepeat}
              current={parseInt(currentVerse.verseKey.split(':')[1], 10)}
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
      </Container>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const files = state.audioplayer.files[ownProps.chapter.id];
  const verseIds = Object.keys(ownProps.verses);

  return {
    files,
    verseIds,
    segments: state.audioplayer.segments[ownProps.chapter.id],
    currentFile: files[ownProps.currentVerse.verseKey],
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
  chapter: customPropTypes.chapterType.isRequired,
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
  load: PropTypes.func.isRequired,
  // NOTE: should be PropTypes.instanceOf(Audio) but not on server.
  currentFile: PropTypes.any, // eslint-disable-line
  audio: PropTypes.number.isRequired,
  verses: customPropTypes.verses,
  verseIds: PropTypes.arrayOf(PropTypes.string) // eslint-disable-line
};

export default connect(mapStateToProps, AudioActions)(Audioplayer);
