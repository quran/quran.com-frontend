import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { decrypt } from 'sjcl';

export default class Segments extends Component {
  static propTypes = {
    audio: PropTypes.object.isRequired,
    segments: PropTypes.string.isRequired
  };

  static defaultProps = {
    currentWord: null
  };

  state = {
    intervals: [],
  };

  constructor() {
    super(...arguments);
    this.secret = process.env.SEGMENTS_KEY;
    this.currentWord = null;
  }

  // LIFECYCLE METHODS

  componentDidMount() {
    const builtIntervals = this.buildIntervals();
    console.debug('Segments componentDidMount', this.props.audio, builtIntervals);
    this.bindListeners();
  }

  componentWillUnmount() {
    console.log('Segments componentWillUnmount', this.props.audio, { props: this.props, state: this.state });
    this.unbindListeners();
  }

  componentWillReceiveProps(nextProps) {
    const prevProps = this.props;

    if (prevProps.audio != nextProps.audio) {
      this.unbindListeners(prevProps);

      this.buildIntervals(nextProps);
      this.bindListeners(nextProps);
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    const prevProps = this.props;
    const prevState = this.state;
    return [
      prevProps.audio != nextProps.audio,
      prevProps.segments != nextProps.segments,
      prevState.intervals != nextState.intervals,
      prevProps.currentWord != nextProps.currentWord,
      nextProps.currentWord != this.currentWord
    ].some(b => b);
    //return false;
    // TODO: I think we can just 'return false' here since there is nothing to actually render...
    // oh wait, maybe i need it so that componentDidUpdate will run..., despite render() not
    // actually being needed... dunno right now
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.currentWord != this.props.currentWord) { // currentWord was changed by the user
      if (this.props.currentWord != null) {
        const wordInterval = this.state.words[this.props.currentWord.split(/:/).pop()];
        const timeToSeek = wordInterval.startTime + 0.001; // seek to the currentWord starting time and return
        const isSeekable = this.props.audio.seekable && this.props.audio.seekable.length > 0;
        const withinRange = !isSeekable? null : timeToSeek >= this.props.audio.seekable.start(0) && timeToSeek <= this.props.audio.seekable.end(0);

        if (isSeekable && withinRange) { // seek to it
          this.props.audio.currentTime = timeToSeek;
        } else { // seek to it after its ready
          const seekToTime = () => {
            this.props.audio.currentTime = timeToSeek;
            this.props.audio.removeEventListener('canplay', seekToTime, false);
          };
          this.props.audio.addEventListener('canplay', seekToTime);
        }
      }
      return this.setCurrentWord(this.props.currentWord, 'componentDidUpdate'); // but don't forget to set the change internally for next time
    }
  }

  render() {
    return (<input type="hidden"/>);
  }

  // END LIFECYCLE METHODS

  buildIntervals(props = this.props) {
    let segments = null;
    try {
      segments = JSON.parse(decrypt(this.secret, new Buffer(props.segments, 'base64').toString()));
    } catch (e) {
      segments = [];
    }

    const words = {};
    const intervals = segments.map((segment, segmentIndex) => {
      const startTime = segment[0],
              endTime = segment[0] + segment[1],
             duration = segment[1],
            wordIndex = segment[2],
            mappedVal = { startTime: startTime/1000, endTime: endTime/1000, duration: duration/1000 };

      if (wordIndex >= 0 && !words[wordIndex])
        words[wordIndex] = mappedVal;

      return [startTime/1000, endTime/1000, wordIndex];
    });

    this.state.intervals = intervals;
    this.state.words = words;
    return { intervals, words }; // for console debugging
  }

  bindListeners(props = this.props, state = this.state) {
    const audio = props.audio;
    const intervals = state.intervals;
    const words = state.words;

    // Play listener
    const play = () => {
      const listeners = {};
      let repeaterId = null;

      new Promise((done, fail) => {
        console.debug('Play listener for '+ props.currentAyah +' started...');

        const intervalFn = () => {
          if (audio.seeking) return console.warn('we are seeking right now?');
          if (audio.paused || audio.ended) return console.warn('stopped by running?');

          // Was thinking about adding some initial checks before this that could reduce
          // the number of times we need to resort to a search, just in case logarithmic
          // time isn't good enough
          const index = this.binarySearch(intervals, audio.currentTime, this.compareFn);
          const currentWord = index >= 0 && intervals[index][2] >= 0 ?
            this.props.currentAyah +':'+ intervals[index][2] : null;

          if (currentWord == this.props.currentWord) return; // no work to be done
          else if (currentWord == this.currentWord) return; // still no work to be done
          else return this.setCurrentWord(currentWord, 'Play listener Do Stuff block'); // something changed, so we deal with it
        }

        intervalFn();
        repeaterId = setInterval(intervalFn, 30);

        ['pause', 'ended'].forEach((evName) => {
          listeners[evName] = done;
          audio.addEventListener(evName, listeners[evName], false);
        });

        ['error', 'emptied', 'abort'].forEach((evName) => {
          listeners[evName] = fail;
          audio.addEventListener(evName, listeners[evName], false);
        });
      }).then((ev) => {
        clearInterval(repeaterId);

        ['pause', 'ended', 'error', 'emptied', 'abort'].forEach((evName) => {
          audio.removeEventListener(evName, listeners[evName]);
        });

        console.debug('Play listener for '+ props.currentAyah +(ev && ev.type ? ' resolved by '+ ev.type : 'stopped') +' event');
      });
    };
    audio.addEventListener('play', play, false);

    this.setState({ listeners: { play }});
  }

  unbindListeners(props = this.props) {
    props.audio.removeEventListener('play', this.state.listeners.play);
  }

  setCurrentWord(currentWord = null, debug = null) {
    this.currentWord = currentWord; // this is more immediately available but should eventually agree with props
    this.props.onSetCurrentWord(currentWord); // calls the redux dispatch function passed down from the Audioplayer
    console.log('setCurrentWord', currentWord, debug ? debug : '');
  }

  compareFn(time, interval) {
    if (time < interval[0]) return -1;
    else if (time > interval[1]) return 1;
    else if (time == interval[0]) return 0; // floor inclusive
    else if (time == interval[1]) return 1;
    else return 0;
  }

  binarySearch(ar, el, compareFn = (a, b) => (a - b)) {
    var m = 0;
    var n = ar.length - 1;
    while (m <= n) {
      var k = (n + m) >> 1;
      var cmp = compareFn(el, ar[k]);
      if      (cmp > 0) m = k + 1;
      else if (cmp < 0) n = k - 1;
      else return k;
    }
    return -m - 1;
  }
}
