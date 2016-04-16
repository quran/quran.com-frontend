import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import Tracker from './Tracker';
// import debug from '../../../../scripts/helpers/debug';

import { clearCurrentWord, setCurrentWord } from '../../../redux/modules/ayahs';

const style = require('./style.scss');
const segments = require('./segments.js');

@connect(
  (state, ownProps) => {
    const ayahKey = state.ayahs.current;
    const surahId = parseInt(ayahKey.match(/^\d+/)[0], 10);
    const ayahNum = parseInt(ayahKey.match(/\d+$/)[0], 10);
    const currentWord = state.ayahs.currentWord;

    return { currentWord, ayahNum, surahId, ayahKey };
  },
  { // dispatch functions, also lands in this.props
    setCurrentWord,
    clearCurrentWord
  }
)
export default class Track extends Component {
  static propTypes = {
    file: PropTypes.object.isRequired,
    isPlaying: PropTypes.bool.isRequired,
    shouldRepeat: PropTypes.bool.isRequired,
    onPlay: PropTypes.func.isRequired,
    onPause: PropTypes.func.isRequired,
    onEnd: PropTypes.func.isRequired
  };

  state = {
    progress: 0,
    currentTime: 0,
    listeners: {}
  };

  constructor() {
    super(...arguments);
    this.cues = [];
    this.seek = {}
    segments.forEach((row, id) => {
      const cols = row.split(/\t/);
      const surahId = cols[0];
      const ayahNum = cols[1];
      const start = parseInt(cols[2], 10);
      const duration = parseInt(cols[3], 10);
      const tokenId = parseInt(cols[4], 10);
      if (typeof this.cues[surahId] == 'undefined')
        this.cues[surahId] = [];
      if (typeof this.cues[surahId][ayahNum] == 'undefined')
        this.cues[surahId][ayahNum] = [];
      const data = { start, duration, tokenId };
      this.cues[surahId][ayahNum].push(data);
      const key = surahId +':'+ ayahNum +':'+ tokenId;
      this.seek[key] = this.seek[key]? this.seek[key] : { ...data, cueSequence: this.cues[surahId][ayahNum].length - 1 };
    });
    //console.log('constructor', this.cues);
  }

  resetHighlightProps() {
    //console.log('resetHighlightProps');
    this.singleMode = false;
    this.totalHighlightedDuration = 0;
    clearTimeout(this.timerId1);
    clearTimeout(this.timerId2);
    clearTimeout(this.timerId3);
    //this.clearCurrentWord();
  }

  componentDidMount() {
    if (this.props.file) {
      this.onFileLoad(this.props.file);
      this.resetHighlightProps();
    }
  }

  componentWillUnmount() {
    this.onFileUnload(this.props.file);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return [
      this.props.file.src !== nextProps.file.src,
      this.props.isPlaying !== nextProps.isPlaying,
      this.props.shouldRepeat !== nextProps.shouldRepeat,
      this.state.progress !== nextState.progress,
      this.state.currentTime !== nextState.currentTime
    ].some(test => test);
  }

  componentWillUpdate(nextProps) {
    if (this.props.file.src !== nextProps.file.src) {
      this.props.file.pause();
    }
  }

  componentWillReceiveProps(nextProps) {
    let getSegment = () => {
      return (
       this.props.currentWord !== nextProps.currentWord
       && (nextProps.currentWord !== this.state.currentWord) // || this.props.currentWord !== this.state.currentWord)
       && this.seek[nextProps.currentWord]
    )};

    let seekToSegment = (file, currentWord, segment) => {
      const singleMode = this.singleMode;
      file.pause();
      this.singleMode = singleMode; // because pause resets singleMode?
      const events = ['loadeddata', 'loaded', 'load', 'canplay', 'canplaythrough', 'loadstart'];
      let setTime;
      setTime = (now = false) => {
        if (now === true) {
          this.totalHighlightedDuration = segment.start;
          file.currentTime = segment.start / 1000.0;
          //console.log('setTime immediate', { currentWord, src: file.src, currentTime: file.currentTime, singleMode: this.singleMode, isPlaying: this.props.isPlaying });
          this.setState({ currentWord });
        } else
        if (currentWord === this.props.currentWord) {
          this.totalHighlightedDuration = segment.start;
          file.currentTime = segment.start / 1000.0;
          //console.log('setTime not immediate', { currentWord, src: file.src, currentTime: file.currentTime, singleMode: this.singleMode, isPlaying: this.props.isPlaying });
          this.setState({ currentWord });
        }
        events.every((evName) => {
          file.removeEventListener(evName, setTime);
          return true;
        });
      };
      if (file.readyState >= 4) {
        setTime(true);
      } else {
        events.every((evName) => {
          file.addEventListener(evName, setTime, false);
          return true;
        });
      }
     //file.play(); // ???
    };

    if (!nextProps.file) return;
    if (this.props.file.src !== nextProps.file.src) {
      this.onFileUnload(this.props.file);
      this.setState({
        progress: 0
      });

      this.onFileLoad(nextProps.file);
      this.resetHighlightProps();
    }

    const segment = getSegment();
    if (segment) {
      //console.log('seekToSegment', { propsWord: this.props.currentWord, stateWord: this.state.currentWord, file: nextProps.file, nextWord: nextProps.currentWord, segment });
      seekToSegment(nextProps.file, nextProps.currentWord, segment);
    }
  }

  onFileLoad(file) {
    // debug('component:Track', `File loaded with src ${file.src}`);

    // Preload file
    file.setAttribute('preload', 'auto');

    const loadeddata = () => {
      // Default current time to zero. This will change
      file.currentTime = 0; // eslint-disable-line no-param-reassign

      // this.setState({isAudioLoaded: true});
    };
    file.addEventListener('loadeddata', loadeddata);

    const timeupdate = () => {
      const progress = (
        file.currentTime /
        file.duration * 100
      );

      this.setState({
        progress
      });
    };
    file.addEventListener('timeupdate', timeupdate, false);

    const ended = () => {
      const { shouldRepeat, onEnd } = this.props;

      //console.log('file.addEventListener(ended)', { shouldRepeat, file, state: this.state });

      if (shouldRepeat) {
        file.pause();
        file.currentTime = 0; // eslint-disable-line no-param-reassign
        file.play();
      } else {
        //console.log('onEnd was called');
        file.pause();
        onEnd();
      }
    };
    file.addEventListener('ended', ended, false);

    const play = () => {
      const { progress } = this.state;
      const { onPlay } = this.props;

      const currentTime = (
        progress / 100 * file.duration
      );

      //console.log('file.addEventListener(play)', { file, currentTime, progress });

      this.setState({
        currentTime
      });

      this.nourPlay();

      onPlay();
    };
    file.addEventListener('play', play, false);

    const pause = () => {
      const { onPause } = this.props;

      //console.log('file.addEventListener(pause)', { file, state: this.state });

      this.nourPause();

      //onPause();
    };
    file.addEventListener('pause', pause, false);

    this.setState({
      listeners: {
        loadeddata,
        timeupdate,
        ended,
        play,
        pause
      }
    });
  }

  onFileUnload(file) {
    this.props.file.pause();
    [ 'loadeddata', 'timeupdate', 'ended', 'play', 'pause' ].forEach((listener) => {
      file.removeEventListener(listener, this.state.listeners[listener]);
    });
  }

  nourPlay() {
    const { surahId, ayahNum, currentWord } = this.props;
    let cueSequence = 0;
    if (this.seek[currentWord]) {
      this.totalHighlightedDuration = this.seek[currentWord].start;
      cueSequence = this.seek[currentWord].cueSequence;
    }
    //console.log('nourPlay', { highlightedTime: this.totalHighlightedDuration, surahId, ayahNum, currentWord, cueSequence, stateWord: this.state.currentWord });

    this.highlightToken(surahId, ayahNum, cueSequence, 0);
  }

  nourPause() {
    const { surahId, ayahNum, currentWord } = this.props;
    //console.log('nourPause', { surahId, ayahNum, currentWord });

    this.resetHighlightProps();
  }

  setCurrentWord(surahId, ayahNum, tokenId) {
    const currentWord = `${surahId}:${ayahNum}:${tokenId}`;
    const { setCurrentWord } = this.props;
    this.setState({ currentWord });
    setCurrentWord(currentWord);
  }

  clearCurrentWord() {
    const { clearCurrentWord } = this.props;
    this.setState({ currentWord: null });
    clearCurrentWord();
  }

  highlightToken(surahId, ayahNum, cueSequence, syncError) {
    const seq = this.cues[surahId][ayahNum][cueSequence];
    const { file, setCurrentWord } = this.props;

    //console.log('highlightToken', { surahId, ayahNum, cueSequence, syncError, setCurrentWord, file, seq });

    if (!seq) return;
    if (seq.tokenId >= 0) {
      //console.log('this.setCurrentWord', { surahId, ayahNum, tokenId: seq.tokenId, cueSequence, seq });
      this.setCurrentWord(surahId, ayahNum, seq.tokenId);
    } else {
      // silence.show(); ???
    }

    this.timerId1 = setTimeout(() => {
      this.totalHighlightedDuration += seq.duration;
      syncError = this.totalHighlightedDuration - file.currentTime * 1000

      //console.log("timerId1", { highlightedTime: this.totalHighlightedDuration, currentTime: file.currentTime * 1000, cueSequence, syncError })

      if (syncError >= 100) {
        this.timerId2 = setTimeout(() => {
          //console.log("timerId2", { highlightedTime: this.totalHighlightedDuration, currentTime: file.currentTime * 1000, cueSequence, syncError })
          this.unhighlightToken(surahId, ayahNum, cueSequence, 0);
        }, syncError);
      } else {
        this.unhighlightToken(surahId, ayahNum, cueSequence, syncError);
      }
    }, seq.duration + syncError);
  }

  unhighlightToken(surahId, ayahNum, cueSequence, syncError) {
    const seq = this.cues[surahId][ayahNum][cueSequence];
    const { file, currentWord } = this.props;

    //console.log('unhighlightToken', { currentWord, cueSequence, syncError });

    if (seq.tokenId >= 0) {
      this.clearCurrentWord();
    } else {
      //silence.hide() // ???
    }

    if (!this.singleMode) {
      this.highlightToken(surahId, ayahNum, cueSequence + 1, syncError);
    } else {
      this.file.pause();
    }

    this.singleMode = false;
  }

  onTrackerMove(event) {
    const { file } = this.props;

    const fraction = (
      event.nativeEvent.offsetX /
      ReactDOM.findDOMNode(this).parentElement.getBoundingClientRect().width
    );

    this.setState({
      progress: fraction * 100,
      currentTime: fraction * file.duration
    });

    file.currentTime = (
      fraction * file.duration
    );
  }

  render() {
    const { progress } = this.state;
    const { isPlaying, file } = this.props;

    if (isPlaying) {
      file.play();
    } else {
      file.pause();
    }

    return (
      <div className={style.track} onClick={this.onTrackerMove.bind(this)}>
        <Tracker progress={progress}/>
      </div>
    );
  }
}
