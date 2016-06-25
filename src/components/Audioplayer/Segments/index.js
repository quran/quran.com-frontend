import React, { Component, PropTypes } from 'react';
import { decrypt } from 'sjcl';

export default class Segments extends Component {
  static propTypes = {
    audio: PropTypes.object.isRequired,
    segments: PropTypes.string.isRequired,
    currentAyah: PropTypes.string,
    currentWord: PropTypes.string,
    onSetCurrentWord: PropTypes.func.isRequired
  };

  static defaultProps = {
    currentWord: null
  };

  constructor() {
    super(...arguments); // eslint-disable-line prefer-rest-params
    this.secret = process.env.SEGMENTS_KEY;
    this.currentWord = null;
  }

  state = {
    intervals: [],
  };

  // LIFECYCLE METHODS

  componentDidMount() {
    this.bindListeners();
  }

  componentWillReceiveProps(nextProps) {
    const prevProps = this.props;

    if (prevProps.audio !== nextProps.audio) {
      this.unbindListeners(prevProps);

      this.buildIntervals(nextProps);
      this.bindListeners(nextProps);
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    const prevProps = this.props;
    const prevState = this.state;

    return [
      prevProps.audio !== nextProps.audio,
      prevProps.segments !== nextProps.segments,
      prevState.intervals !== nextState.intervals,
      prevProps.currentWord !== nextProps.currentWord,
      nextProps.currentWord !== this.currentWord
    ].some(b => b);
    // TODO: I think we can just 'return false' here since there is nothing to actually render...
    // oh wait, maybe i need it so that componentDidUpdate will run..., despite render() not
    // actually being needed... dunno right now
  }

  componentDidUpdate() {
    if (this.currentWord !== this.props.currentWord) { // currentWord was changed by the user
      if (this.props.currentWord !== null) {
        const wordInterval = this.state.words[this.props.currentWord.split(/:/).pop()];
        // seek to the currentWord starting time and return
        const timeToSeek = wordInterval.startTime + 0.001;
        const isSeekable = this.props.audio.seekable && this.props.audio.seekable.length > 0;
        const withinRange = !isSeekable ?
        null :
        (timeToSeek >= this.props.audio.seekable.start(0) &&
        timeToSeek <= this.props.audio.seekable.end(0));

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

      // but don't forget to set the change internally for next time
      return this.setCurrentWord(this.props.currentWord, 'componentDidUpdate');
    }

    return false;
  }

  componentWillUnmount() {
    this.unbindListeners();
  }

  setCurrentWord(currentWord = null) {
    // this is more immediately available but should eventually agree with props
    this.currentWord = currentWord;
    // calls the redux dispatch function passed down from the Audioplayer
    this.props.onSetCurrentWord(currentWord);
  }

  buildIntervals(props = this.props) {
    let segments = null;
    try {
      segments = JSON.parse(decrypt(this.secret, new Buffer(props.segments, 'base64').toString()));
    } catch (e) {
      segments = [];
    }

    const words = {};
    const intervals = segments.map(segment => {
      const startTime = segment[0];
      const endTime = segment[0] + segment[1];
      const duration = segment[1];
      const wordIndex = segment[2];
      const mappedVal = {
        startTime: startTime / 1000,
        endTime: endTime / 1000,
        duration: duration / 1000
      };

      if (wordIndex >= 0 && !words[wordIndex]) {
        words[wordIndex] = mappedVal;
      }

      return [startTime / 1000, endTime / 1000, wordIndex];
    });

    this.setState({ intervals, words });

    return { intervals, words }; // for console debugging
  }

  bindListeners() {
    const { audio, currentAyah, currentWord } = this.props;
    const { intervals } = this.state;

    // Play listener
    const play = () => {
      const listeners = {};
      let repeaterId = null;

      new Promise((done, fail) => {
        const intervalFn = () => {
          if (audio.seeking) return console.warn('we are seeking right now?');
          if (audio.paused || audio.ended) return console.warn('stopped by running?');

          // Was thinking about adding some initial checks before this that could reduce
          // the number of times we need to resort to a search, just in case logarithmic
          // time isn't good enough
          const index = this.binarySearch(intervals, audio.currentTime, this.compareFn);
          const word = index >= 0 && intervals[index][2] >= 0 ?
            `${currentAyah}:${intervals[index][2]}` :
            null;

          if (word === currentWord) return false; // no work to be done
          else if (word === this.currentWord) return false; // still no work to be done
           // something changed, so we deal with it
          return this.setCurrentWord(word, 'Play listener Do Stuff block');
        };

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
      }).then(() => {
        clearInterval(repeaterId);

        ['pause', 'ended', 'error', 'emptied', 'abort'].forEach((evName) => {
          audio.removeEventListener(evName, listeners[evName]);
        });
      });
    };
    audio.addEventListener('play', play, false);

    this.setState({ listeners: { play }});
  }

  unbindListeners() {
    const { audio } = this.props;

    audio.removeEventListener('play', this.state.listeners.play);
  }

  compareFn(time, interval) {
    if (time < interval[0]) return -1;
    else if (time > interval[1]) return 1;
    else if (time === interval[0]) return 0; // floor inclusive
    else if (time === interval[1]) return 1;

    return 0;
  }

  binarySearch(ar, el, compareFn = (a, b) => (a - b)) {
    let m = 0;
    let n = ar.length - 1;
    while (m <= n) {
      const k = (n + m) >> 1;
      const cmp = compareFn(el, ar[k]);
      if (cmp > 0) m = k + 1;
      else if (cmp < 0) n = k - 1;
      else return k;
    }
    return -m - 1;
  }

  render() {
    return (
      <input type="hidden" />
    );
  }
}
