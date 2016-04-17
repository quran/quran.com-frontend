import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import { clearCurrentWord, setCurrentWord } from '../../../redux/modules/ayahs';

const style = require('./style.scss');

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
export default class TokenSegments extends Component {
  static propTypes = {
    file: PropTypes.object.isRequired,
    isPlaying: PropTypes.bool.isRequired
  };

  state = {
    progress: 0,
    currentTime: 0,
    listeners: {}
  };

  constructor() {
    super(...arguments);

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
      const props = this.props;

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
      this.props.currentWord !== nextProps.currentWord
    ].some(test => test);
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
      const events = ['loadeddata', 'loaded', 'load', 'canplay', 'canplaythrough', 'loadstart'];

      file.pause();

      this.singleMode = singleMode; // because pause resets singleMode?

      let setTime;
      setTime = (now = false) => {
        if (now === true) {
          this.totalHighlightedDuration = segment.start;
          file.currentTime = segment.start / 1000.0;
          this.setState({ currentWord });
        } else
        if (currentWord === this.props.currentWord) {
          this.totalHighlightedDuration = segment.start;
          file.currentTime = segment.start / 1000.0;
          this.setState({ currentWord });
        }
        events.every((evName) => {
          file.removeEventListener(evName, setTime);
          return true;
        });
        //file.play(); // ??? this should highlight and play the selected token either individually or continuously depending on singleMode
      };
      if (file.readyState >= 4) {
        setTime(true);
      } else {
        events.every((evName) => {
          file.addEventListener(evName, setTime, false);
          return true;
        });
      }
    };

    if (!nextProps.file) return;
    if (this.props.file.src !== nextProps.file.src) {
      this.onFileUnload(this.props.file);

      this.onFileLoad(nextProps.file);
      this.resetHighlightProps();
    }

    const segment = getSegment();
    if (segment) {
      //console.log('seekToSegment', { propsWord: this.props.currentWord, stateWord: this.state.currentWord, file: nextProps.file, nextWord: nextProps.currentWord, segment });
      seekToSegment(nextProps.file, nextProps.currentWord, segment);
    }
  }

  getSegments() {
    console.log('getSegments');

    const segments = require('./segments.js');
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
  }

  onFileLoad(file) {

    this.getSegments();

    const play = () => {
      const { progress } = this.state;
      const { surahId, ayahNum, currentWord } = this.props;

      let cueSequence = 0;
      if (this.seek[currentWord]) {
        this.totalHighlightedDuration = this.seek[currentWord].start;
        cueSequence = this.seek[currentWord].cueSequence;
      }

      this.highlightToken(surahId, ayahNum, cueSequence, 0);
    };
    file.addEventListener('play', play, false);

    const pause = () => {
      this.resetHighlightProps();
    };
    file.addEventListener('pause', pause, false);

    this.setState({
      listeners: {
        play,
        pause
      }
    });
  }

  onFileUnload(file) {
    [ 'play', 'pause' ].forEach((listener) => {
      file.removeEventListener(listener, this.state.listeners[listener]);
    });
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

    if (!seq) return;
    if (seq.tokenId >= 0) {
      this.setCurrentWord(surahId, ayahNum, seq.tokenId);
    } // silence.show(); ???

    this.timerId1 = setTimeout(() => {
      this.totalHighlightedDuration += seq.duration;
      syncError = this.totalHighlightedDuration - file.currentTime * 1000

      if (syncError >= 100) {
        this.timerId2 = setTimeout(() => {
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

    if (seq.tokenId >= 0) {
      this.clearCurrentWord();
    } // else silence.hide() // ???

    if (!this.singleMode) {
      this.highlightToken(surahId, ayahNum, cueSequence + 1, syncError);
    } else {
      this.file.pause();
    }

    this.singleMode = false;
  }

  render() {
    return (
      <div></div>
    );
  }
}
