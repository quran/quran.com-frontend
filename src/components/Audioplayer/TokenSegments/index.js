import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import ApiClient from '../../../helpers/ApiClient';

import { clearCurrentWord, setCurrentWord } from '../../../redux/modules/ayahs';

const style = require('./style.scss');
const client = new ApiClient();

@connect(
  (state, ownProps) => {
    const ayahKey = state.ayahs.current;
    const surahId = parseInt(ayahKey.match(/^\d+/)[0], 10);
    const ayahNum = parseInt(ayahKey.match(/\d+$/)[0], 10);
    const currentWord = state.ayahs.currentWord;
    const currentAyah = state.ayahs.current;

    return { allState: state, currentWord, ayahNum, surahId, ayahKey, currentAyah };
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

    this.cues = [];
    this.seek = {}
    //console.log('constructor', this.cues);
  }

  resetHighlightProps(nextProps) {
    const { currentWord } = this.props;
    const segments = nextProps? nextProps.segments : this.props.segments;

    console.log('resetHighlightProps', { currentWord, segments, nextProps });
    this.seek = {};
    this.singleMode = false;
    this.totalHighlightedDuration = 0;

    clearTimeout(this.timerId1);
    clearTimeout(this.timerId2);
    clearTimeout(this.timerId3);

    segments.forEach((segment, index) => {
      const tokenId = segment[2];
      if (tokenId >= 0) {
        this.seek[tokenId] = this.seek[tokenId]? this.seek[tokenId] : {
          start: segment[0],
          duration: segment[1],
          tokenId: segment[2],
          cueSequence: index
        };
      }
    });

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
       nextProps.currentWord &&
       this.props.currentWord !== nextProps.currentWord
       && (nextProps.currentWord !== this.state.currentWord) // || this.props.currentWord !== this.state.currentWord)
       && this.seek[nextProps.currentWord.replace(/^.*:(\d+)$/, '$1')]
    )};

    let seekToSegment = (file, currentWord, segment) => {
      console.log('seekToSegment');
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
    if (this.props.file.src !== nextProps.file.src || this.props.currentAyah != nextProps.currentAyah) {
      this.onFileUnload(this.props.file);
      this.resetHighlightProps(nextProps);
      this.onFileLoad(nextProps.file);
    }

    const segment = getSegment();
    if (segment) {
      //console.log('seekToSegment', { propsWord: this.props.currentWord, stateWord: this.state.currentWord, file: nextProps.file, nextWord: nextProps.currentWord, segment });
      seekToSegment(nextProps.file, nextProps.currentWord, segment);
    }
  }

    /*
  getSegments() {
    const { segments, surahId, ayahNum, currentAyah, currentWord } = this.props;
    console.log({ surahId, ayahNum, currentAyah, currentWord })
    return client.get(`/v2/segments/2/${surahId}:${ayahNum}`).then((res) => {
      console.log('segments', surahId, ayahNum, res);
      const segments = res;
      segments.forEach((cols, id) => {
        //console.log('cols', cols);
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

    });

    segments.forEach((segment, index) => {
      const tokenId = segment[2];
      if (tokenId >= 0) {
        this.seek[tokenId] = this.seek[tokenId]? this.seek[tokenId] : {
          start: segment[0],
          duration: segment[1],
          tokenId: segment[2],
          cueSequence: index
        };
      }
    });
    return new Promise((resolve, reject) => {
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
      resolve();
    });
  }
    */

  onFileLoad(file) {
    const play = () => {
      const { progress } = this.state;
      const { surahId, ayahNum, currentWord } = this.props;

      const tokenId = currentWord ? currentWord.replace(/^.*:(\d+)$/, '$1') : null;
      let cueSequence = 0;
      if (tokenId && this.seek[tokenId]) {
        this.totalHighlightedDuration = this.seek[tokenId].start;
        cueSequence = this.seek[tokenId].cueSequence;
      }

      console.log('we should have tokens now');
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


    /*
    const { isPlaying } = this.props;

    let wasPlaying = isPlaying;

    if (wasPlaying) {
      this.props.onPause();
      file.pause();
    }

    this.getSegments().then(() => {
      const { allState, segments } = this.props;
      console.log('getSegments then', { allState, wasPlaying, isPlaying: this.props.isPlaying, file, segments });

      if (this.props.isPlaying) {
        this.props.onPause();
        file.pause();
        wasPlaying = true;
      }

      if (wasPlaying || this.props.isPlaying) {
        file.play();
        this.props.onPlay();
      }
    });
    */
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
    const { file, segments, setCurrentWord } = this.props;
    const seq = segments[cueSequence];

    if (!seq) return;

    const start = seq[0];
    const duration = seq[1];
    const tokenId = seq[2];

    if (tokenId >= 0) {
      this.setCurrentWord(surahId, ayahNum, tokenId);
    } // silence.show(); ???

    this.timerId1 = setTimeout(() => {
      this.totalHighlightedDuration += duration;
      syncError = this.totalHighlightedDuration - file.currentTime * 1000

      if (syncError >= 100) {
        this.timerId2 = setTimeout(() => {
          this.unhighlightToken(surahId, ayahNum, cueSequence, 0);
        }, syncError);
      } else {
        this.unhighlightToken(surahId, ayahNum, cueSequence, syncError);
      }
    }, duration + syncError);
  }

  unhighlightToken(surahId, ayahNum, cueSequence, syncError) {
    const { file, currentWord, segments } = this.props;
    const seq = segments[cueSequence];
    const start = seq[0];
    const duration = seq[1];
    const tokenId = seq[2];

    const { foo, bar, baz } = segments[cueSequence];
    console.log('foo', { foo, bar, baz });

    if (tokenId >= 0) {
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
