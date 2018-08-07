/* global document */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { asyncComponent } from 'react-async-component';
import T, { KEYS } from './T';
import { scrollTo } from '../helpers/scroller';
import ComponentLoader from './ComponentLoader';
import Track from './audioplayer/Track';
import Segments from './audioplayer/Segments';
import ScrollButton from './audioplayer/ScrollButton';
import Wrapper from './audioplayer/Wrapper';
import ControlItem from './audioplayer/ControlItem';
import { VerseShape, ChapterShape, SegmentShape } from '../shapes';
import {
  FetchAudio,
  Play,
  Pause,
  Update,
  SetCurrentVerseKey,
  ToggleScroll,
} from '../redux/actions/audioplayer';
import { nextVerseKey, previousVerseKey } from '../helpers/verseKeys';
import PreviousButton from './audioplayer/PreviousButton';
import NextButton from './audioplayer/NextButton';
import PlayStopButton from './audioplayer/PlayStopButton';
import RepeatShape from '../shapes/RepeatShape';

// const RepeatDropdown = asyncComponent({
//   resolve: () =>
//     import(/* webpackChunkName: "RepeatDropdown" */ './audioplayer/RepeatDropdown'),
//   LoadingComponent: ComponentLoader,
// });

export const PERCENTAGE_OF_CURRENT_FILE_TO_PRELOAD_NEXT = 0.5;
export const DIRECTIONS: { [key: string]: string } = {
  NEXT: 'NEXT',
  PREVIOUS: 'PREVIOUS',
};

const propTypes = {
  chapter: ChapterShape.isRequired,
  segments: SegmentShape,
  files: PropTypes.object,
  currentVerseKey: PropTypes.string,
  play: PropTypes.func.isRequired,
  setCurrentVerseKey: PropTypes.func.isRequired,
  pause: PropTypes.func.isRequired,
  update: PropTypes.func.isRequired,
  shouldScroll: PropTypes.bool.isRequired,
  setRepeat: PropTypes.func.isRequired,
  toggleScroll: PropTypes.func.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  currentTime: PropTypes.number,
  duration: PropTypes.number,
  fetchAudio: PropTypes.func.isRequired,
  currentFile: PropTypes.object,
  audioSetting: PropTypes.number.isRequired,
  verses: PropTypes.objectOf(VerseShape),
  repeat: RepeatShape.isRequired,
};

type DefaultProps = {
  files: {};
  verses: {};
  segments: null;
  duration: null;
  currentFile: null;
  currentTime: null;
  currentVerseKey: null;
};

const defaultProps: DefaultProps = {
  files: {},
  verses: {},
  segments: null,
  duration: null,
  currentFile: null,
  currentTime: null,
  currentVerseKey: null,
};

type Props = {
  verses: { [verseKey: string]: VerseShape };
  fetchAudio: FetchAudio;
  setCurrentVerseKey: SetCurrentVerseKey;
  play: Play;
  pause: Pause;
  update: Update;
  toggleScroll: ToggleScroll;
  audioSetting: number;
  currentVerseKey: string;
  isPlaying: boolean;
  currentFile: $TsFixMe;
  files?: $TsFixMe;
  chapter: ChapterShape;
  duration: number;
  currentTime: number;
  shouldScroll: boolean;
  repeat: RepeatShape;
};

class Audioplayer extends Component<Props> {
  public static propTypes = propTypes;
  public static defaultProps = defaultProps;

  componentDidMount() {
    const { currentVerseKey, audioSetting, verses, fetchAudio } = this.props;
    const versesArray = Object.values(verses);
    const verse = verses[currentVerseKey] || versesArray[0];

    // document.addEventListener('keydown', this.handleKeyboardEvent);

    fetchAudio({
      chapterId: verse.chapterId,
      verseId: verse.id,
      verseKey: verse.verseKey,
      audio: audioSetting,
      isCurrentVerse: !currentVerseKey,
    });

    return false;
  }

  componentDidUpdate(prevProps: Props) {
    this.handleIsPlayingChange(prevProps);

    this.handleCurrentFileChange(prevProps);
  }

  componentWillUnmount() {
    const { currentFile } = this.props;

    // document.removeEventListener('keydown', this.handleKeyboardEvent);

    if (currentFile) {
      return this.removeFileListeners(currentFile);
    }

    return null;
  }

  get nextVerseKey() {
    const { currentVerseKey } = this.props;

    return nextVerseKey(currentVerseKey);
  }

  get nextVerse() {
    const { verses } = this.props;

    return verses[this.nextVerseKey];
  }

  get currentVerse() {
    const { currentVerseKey, verses } = this.props;

    return verses[currentVerseKey];
  }

  get previousVerseKey() {
    const { currentVerseKey } = this.props;

    return previousVerseKey(currentVerseKey);
  }

  get previousVerse() {
    const { verses } = this.props;

    return verses[this.previousVerseKey];
  }

  addFileListeners = (file: HTMLAudioElement) => {
    // NOTE: if no file, just wait.
    if (!file) return false;

    const { update, pause } = this.props;

    // Preload file
    file.setAttribute('preload', 'auto');

    const onLoadeddata = () => {
      // Default current time to zero. This will change
      file.currentTime = 0; // eslint-disable-line

      return update({
        duration: file.duration,
        currentTime: 0,
        isLoading: false,
      });
    };

    const onTimeupdate = () => {
      if (
        file.currentTime / file.duration >
        PERCENTAGE_OF_CURRENT_FILE_TO_PRELOAD_NEXT
      ) {
        this.preloadNextAudioFile();
      }

      update({
        currentTime: file.currentTime,
        duration: file.duration,
      });
    };

    const onEnded = () => {
      const { repeat } = this.props;

      if (repeat.from) {
        return this.handleRepeat(file);
      }

      // if (file.readyState >= 3 && file.paused) {
      //   pause();
      // }

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
  };

  removeFileListeners = (file: HTMLAudioElement) => {
    file.pause();
    file.currentTime = 0; // eslint-disable-line no-param-reassign
    file.onloadeddata = null; // eslint-disable-line no-param-reassign
    file.ontimeupdate = null; // eslint-disable-line no-param-reassign
    file.onplay = null; // eslint-disable-line no-param-reassign
    file.onpause = null; // eslint-disable-line no-param-reassign
    file.onended = null; // eslint-disable-line no-param-reassign
    file.onprogress = null; // eslint-disable-line no-param-reassign
  };

  fetchNextAudioFile = () => {
    const { fetchAudio, audioSetting } = this.props;

    if (this.nextVerse) {
      fetchAudio({
        chapterId: this.nextVerse.chapterId,
        verseId: this.nextVerse.id,
        verseKey: this.nextVerse.verseKey,
        audio: audioSetting,
      });
    }
  };

  preloadNextAudioFile = () => {
    const { files } = this.props;

    if (files[this.nextVerseKey]) {
      files[this.nextVerseKey].setAttribute('preload', 'auto');
    }
  };

  scrollToVerse = (verseNumber: number | string) => {
    scrollTo(`verse:${verseNumber}`, -45);
  };

  handleIsPlayingChange = (prevProps: Props) => {
    const { isPlaying, currentFile } = this.props;

    if (isPlaying && !prevProps.isPlaying) {
      return currentFile.play();
    }

    if (!isPlaying && prevProps.isPlaying) {
      return currentFile.pause();
    }

    return null;
  };

  handleCurrentFileChange = (prevProps: Props) => {
    const {
      currentFile,
      fetchAudio,
      audioSetting,
      currentVerseKey,
      files,
    } = this.props;

    if (currentFile && !prevProps.currentFile) {
      this.fetchNextAudioFile();

      return this.addFileListeners(currentFile);
    }

    if (!files[currentVerseKey] && files[prevProps.currentVerseKey]) {
      return fetchAudio({
        chapterId: this.currentVerse.chapterId,
        verseId: this.currentVerse.id,
        verseKey: this.currentVerse.verseKey,
        audio: audioSetting,
      });
    }

    if (currentFile.src !== prevProps.currentFile.src) {
      this.fetchNextAudioFile();
      this.removeFileListeners(prevProps.currentFile);
      // TODO: scroll
      // this.handleScrollTo();

      this.addFileListeners(currentFile);

      if (prevProps.isPlaying) {
        currentFile.play();
      }
    }
  };

  handleVerseChange = (direction = DIRECTIONS.NEXT as string) => {
    const { setCurrentVerseKey } = this.props;

    const VERSE_DIRECTIONS: { [key: string]: string } = {
      [DIRECTIONS.NEXT]: this.nextVerseKey,
      [DIRECTIONS.PREVIOUS]: this.previousVerseKey,
    };

    const verseKey = VERSE_DIRECTIONS[direction];

    if (verseKey) {
      //   this.handleScrollTo(nextVerseKey);
      setCurrentVerseKey(verseKey, true);
    }
  };

  handleScrollTo = (verseNumber: number) => {
    const { shouldScroll } = this.props;

    if (shouldScroll) {
      this.scrollToVerse(verseNumber);
    }
  };

  handlePlay = () => {
    const { play } = this.props;
    // TODO: scroll
    // this.handleScrollTo();

    play();
  };

  // handleRepeat = file => {
  //   const {
  //     repeat,
  //     currentVerseKey,
  //     setRepeat,
  //     setAyah,
  //   } = this.props;
  //   const [chapter, ayah] = currentVerseKey.verseKey
  //     .split(':')
  //     .map(val => parseInt(val, 10));

  //   file.pause();

  //   if (repeat.from > ayah && repeat.to < ayah) {
  //     // user selected a range where current ayah is outside
  //     return this.handleVerseChange();
  //   }

  //   if (repeat.from === repeat.to) {
  //     // user selected single ayah repeat
  //     if (ayah !== repeat.from) return this.handleVerseChange();

  //     if (repeat.times === 1) {
  //       // end of times
  //       setRepeat({});

  //       return this.handleVerseChange();
  //     }

  //     setRepeat({ ...repeat, times: repeat.times - 1 });
  //     file.currentTime = 0; // eslint-disable-line no-param-reassign

  //     return file.play();
  //   }

  //   if (repeat.from !== repeat.to) {
  //     // user selected a range
  //     if (ayah < repeat.to) {
  //       // still in range
  //       return this.handleVerseChange();
  //     }

  //     if (ayah === repeat.to) {
  //       // end of range
  //       if (repeat.times === 1) {
  //         // end of times
  //         setRepeat({});

  //         return this.handleVerseChange();
  //       }

  //       setRepeat({ ...repeat, times: repeat.times - 1 });
  //       setAyah(`${chapter}:${repeat.from}`);

  //       return this.play();
  //     }
  //   }

  //   return false;
  // };

  handleScrollToggle = () => {
    const {
      shouldScroll,
      currentVerseKey,
      isPlaying,
      toggleScroll,
    } = this.props;

    if (!shouldScroll && isPlaying) {
      // we use the inverse (!) here because we're toggling, so false is true
      this.scrollToVerse(currentVerseKey);
    }

    toggleScroll();
  };

  handleTrackChange = (fraction: number) => {
    const { currentFile, update } = this.props;

    update({
      currentTime: fraction * currentFile.duration,
    });

    currentFile.currentTime = fraction * currentFile.duration;
  };

  render() {
    const {
      currentVerseKey,
      currentFile,
      currentTime,
      duration,
      files,
      chapter,
      isPlaying,
      pause,
      segments,
      shouldScroll,
    } = this.props;

    return (
      <Wrapper>
        {currentFile && (
          <Track
            progress={(currentTime / duration) * 100}
            onTrackChange={this.handleTrackChange}
          />
        )}
        {segments &&
          segments[currentVerseKey] && (
            <Segments
              segments={segments[currentVerseKey]}
              currentVerseKey={currentVerseKey}
              currentTime={currentTime}
            />
          )}
        <ul className="list-inline">
          <ControlItem>
            <T id={KEYS.AUDIOPLAYER_CURRENTVERSE} />
            : {currentVerseKey && currentVerseKey.split(':')[1]}
          </ControlItem>
          <ControlItem>
            <PreviousButton
              currentVerseKey={currentVerseKey}
              files={files}
              onPreviousClick={() =>
                this.handleVerseChange(DIRECTIONS.PREVIOUS)
              }
            />
          </ControlItem>
          <ControlItem>
            <PlayStopButton
              isPlaying={isPlaying}
              currentVerseKey={currentVerseKey}
              onPause={pause}
              onPlay={this.handlePlay}
            />
          </ControlItem>
          <ControlItem>
            <NextButton
              currentVerseKey={currentVerseKey}
              chapter={chapter}
              onNextClick={() => this.handleVerseChange(DIRECTIONS.NEXT)}
            />
          </ControlItem>
          {/* <ControlItem>
            <RepeatDropdown
              repeat={repeat}
              setRepeat={setRepeat}
              current={parseInt(currentVerseKey.verseKey.split(':')[1], 10)}
              chapter={chapter}
            />
          </ControlItem> */}
          <ControlItem>
            <ScrollButton
              shouldScroll={shouldScroll}
              onScrollToggle={this.handleScrollToggle}
            />
          </ControlItem>
        </ul>
      </Wrapper>
    );
  }
}

export default Audioplayer;
