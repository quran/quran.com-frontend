/* global document */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import toNumber from 'lodash/toNumber';
import T, { KEYS } from './T';
import { scrollTo } from '../helpers/scroller';
import Track from './audioplayer/Track';
import Segments from './audioplayer/Segments';
import ScrollButton from './audioplayer/ScrollButton';
import Wrapper from './audioplayer/Wrapper';
import ControlItem from './audioplayer/ControlItem';
import { VerseShape, ChapterShape, SegmentShape, RepeatShape } from '../shapes';
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

export const PERCENTAGE_OF_CURRENT_FILE_TO_PRELOAD_NEXT = 0.5;
export const DIRECTIONS: { [key: string]: string } = {
  NEXT: 'NEXT',
  PREVIOUS: 'PREVIOUS',
};

const propTypes = {
  chapter: ChapterShape.isRequired,
  segments: PropTypes.shape({
    verseKey: SegmentShape,
  }),
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
  currentTime: PropTypes.number.isRequired,
  duration: PropTypes.number.isRequired,
  fetchAudio: PropTypes.func.isRequired,
  currentFile: PropTypes.object,
  audioSetting: PropTypes.number.isRequired,
  verses: PropTypes.objectOf(VerseShape),
  repeat: RepeatShape.isRequired,
  isNightMode: PropTypes.bool,
};

type DefaultProps = {
  files: {};
  verses: {};
  segments: undefined;
  currentFile?: $TsFixMe;
  currentVerseKey?: string;
};

const defaultProps: DefaultProps = {
  files: {},
  verses: {},
  segments: undefined,
  currentFile: undefined,
  currentVerseKey: undefined,
};

type Props = {
  verses: { [verseKey: string]: VerseShape };
  fetchAudio: FetchAudio;
  setCurrentVerseKey: SetCurrentVerseKey;
  setRepeat: $TsFixMe;
  play: Play;
  pause: Pause;
  update: Update;
  toggleScroll: ToggleScroll;
  audioSetting: number;
  currentVerseKey?: string;
  isPlaying: boolean;
  currentFile: $TsFixMe;
  files?: $TsFixMe;
  chapter: ChapterShape;
  duration: number;
  shouldScroll: boolean;
  currentTime: number;
  repeat: RepeatShape;
  segments: { [verseKey: string]: SegmentShape };
  isNightMode: boolean;
};

class Audioplayer extends Component<Props> {
  public static propTypes = propTypes;
  public static defaultProps = defaultProps;

  componentDidMount() {
    this.fetchInitialFile();
  }

  componentDidUpdate(prevProps: Props) {
    this.handleIsPlayingChange();

    this.handleCurrentVerseKeyChange(prevProps);

    this.handleChapterChange();
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

    return currentVerseKey && nextVerseKey(currentVerseKey);
  }

  get nextVerse() {
    const { verses } = this.props;

    return this.nextVerseKey && verses[this.nextVerseKey];
  }

  get currentVerse() {
    const { currentVerseKey, verses } = this.props;

    return currentVerseKey && verses[currentVerseKey];
  }

  get previousVerseKey() {
    const { currentVerseKey } = this.props;

    return currentVerseKey && previousVerseKey(currentVerseKey);
  }

  get previousVerse() {
    const { verses } = this.props;

    return this.previousVerseKey && verses[this.previousVerseKey];
  }

  fetchInitialFile = () => {
    const { currentVerseKey, audioSetting, verses, fetchAudio } = this.props;
    const versesArray = Object.values(verses);
    const verse =
      (currentVerseKey && verses[currentVerseKey]) || versesArray[0];
    const fetchAudioPromise: $TsFixMe = fetchAudio;

    if (!verse) return null;

    // document.addEventListener('keydown', this.handleKeyboardEvent);

    return fetchAudioPromise({
      chapterId: verse.chapterId,
      verseId: verse.id,
      verseKey: verse.verseKey,
      audio: audioSetting,
      isCurrentVerse: !currentVerseKey,
    }).then(() => {
      const { files } = this.props;

      this.addFileListeners(files[verse.verseKey]);

      this.fetchNextAudioFile();
    });
  };

  addFileListeners = (file: HTMLAudioElement) => {
    // NOTE: if no file, just wait.
    if (!file) return false;

    const { update } = this.props;

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
    if (file) {
      file.pause();
      file.currentTime = 0; // eslint-disable-line no-param-reassign
      file.onloadeddata = null; // eslint-disable-line no-param-reassign
      file.ontimeupdate = null; // eslint-disable-line no-param-reassign
      file.onplay = null; // eslint-disable-line no-param-reassign
      file.onpause = null; // eslint-disable-line no-param-reassign
      file.onended = null; // eslint-disable-line no-param-reassign
      file.onprogress = null; // eslint-disable-line no-param-reassign
    }
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

    if (this.nextVerseKey && files[this.nextVerseKey]) {
      files[this.nextVerseKey].setAttribute('preload', 'auto');
    }
  };

  scrollToVerse = (verseKey: string) => {
    scrollTo(`verse:${verseKey}`, -45);
  };

  handleIsPlayingChange = () => {
    const { isPlaying, currentFile } = this.props;

    if (!currentFile) {
      return null;
    }

    if (!isPlaying && !currentFile.paused) {
      return currentFile.pause();
    }

    if (isPlaying && currentFile.paused && !currentFile.ended) {
      return currentFile.play();
    }

    return null;
  };

  handleChapterChange = (): null => {
    const { verses, chapter, currentVerseKey, setCurrentVerseKey } = this.props;

    if (!currentVerseKey) {
      return null;
    }

    const [chapterId] = currentVerseKey.split(':').map(toNumber);
    const versesArray = Object.values(verses);

    if (
      chapter.id !== chapterId &&
      versesArray.length &&
      versesArray[0].chapterId === chapter.id
    ) {
      setCurrentVerseKey(versesArray[0].verseKey);
    }

    return null;
  };

  handleCurrentVerseKeyChange = (prevProps: Props) => {
    const {
      currentFile,
      fetchAudio,
      audioSetting,
      currentVerseKey,
      files,
    } = this.props;

    // If nothing changed, don't do anything
    if (currentVerseKey === prevProps.currentVerseKey) {
      return null;
    }

    // If we set a current verse, don't do anything
    if (currentVerseKey && !prevProps.currentVerseKey) {
      return null;
    }

    // if we don't have the file for this verse
    if (currentVerseKey && !files[currentVerseKey] && this.currentVerse) {
      const fetchAudioPromise: $TsFixMe = fetchAudio;

      return fetchAudioPromise({
        chapterId: this.currentVerse.chapterId,
        verseId: this.currentVerse.id,
        verseKey: this.currentVerse.verseKey,
        audio: audioSetting,
      }).then(() => {
        const { files: afterFiles } = this.props;

        if (this.currentVerse) {
          this.addFileListeners(afterFiles[this.currentVerse.verseKey]);
        }

        this.fetchNextAudioFile();
      });
    }

    // current verse change
    this.fetchNextAudioFile();
    this.removeFileListeners(prevProps.currentFile);
    this.addFileListeners(currentFile);
    if (currentVerseKey) {
      this.handleScrollTo(currentVerseKey);
    }

    return null;
  };

  handleVerseChange = (direction = DIRECTIONS.NEXT as string) => {
    const { setCurrentVerseKey } = this.props;

    const VERSE_DIRECTIONS: { [key: string]: string | null | undefined } = {
      [DIRECTIONS.NEXT]: this.nextVerseKey,
      [DIRECTIONS.PREVIOUS]: this.previousVerseKey,
    };

    const verseKey = VERSE_DIRECTIONS[direction];

    if (verseKey) {
      this.handleScrollTo(verseKey);
      setCurrentVerseKey(verseKey, true);
    }
  };

  handleScrollTo = (verseKey: string) => {
    const { shouldScroll } = this.props;

    if (shouldScroll) {
      this.scrollToVerse(verseKey);
    }
  };

  handlePlay = () => {
    const { play } = this.props;

    play();
  };

  handleRepeat = (file: HTMLAudioElement) => {
    const { repeat, currentVerseKey, setRepeat } = this.props;

    if (!currentVerseKey) {
      return null;
    }

    const [, verseNumber] = currentVerseKey
      .split(':')
      .map(val => toNumber(val));

    file.pause();

    if (
      repeat.from &&
      repeat.to &&
      repeat.from > verseNumber &&
      repeat.to < verseNumber
    ) {
      // user selected a range where current verseNumber is outside
      return this.handleVerseChange();
    }

    if (repeat.from === repeat.to) {
      // user selected single verseNumber repeat
      if (verseNumber !== repeat.from) return this.handleVerseChange();

      if (repeat.times === 1) {
        // end of times
        setRepeat({});

        return this.handleVerseChange();
      }

      setRepeat({ ...repeat, times: (repeat.times, 2) - 1 });

      file.currentTime = 0; // eslint-disable-line no-param-reassign

      return file.play();
    }

    if (repeat.from !== repeat.to) {
      // user selected a range
      if (repeat.to && verseNumber < repeat.to) {
        // still in range
        return this.handleVerseChange();
      }

      if (verseNumber === repeat.to) {
        // end of range
        if (repeat.times === 1) {
          // end of times
          setRepeat({});

          return this.handleVerseChange();
        }

        setRepeat({ ...repeat, times: (repeat.times || 2) - 1 });

        return file.play();
      }
    }

    return null;
  };

  handleScrollToggle = () => {
    const {
      shouldScroll,
      currentVerseKey,
      isPlaying,
      toggleScroll,
    } = this.props;

    if (!shouldScroll && isPlaying && currentVerseKey) {
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
      isNightMode,
    } = this.props;

    return (
      <Wrapper isNightMode={isNightMode}>
        {currentFile && (
          <Track
            progress={
              duration && currentTime ? (currentTime / duration) * 100 : 0
            }
            onTrackChange={this.handleTrackChange}
          />
        )}
        {segments &&
          currentVerseKey &&
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
            : {currentVerseKey}
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
