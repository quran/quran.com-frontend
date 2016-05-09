import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { decrypt } from 'sjcl';

export default class Segments extends Component {
  static propTypes = {
    audio: PropTypes.object.isRequired,
    segments: PropTypes.string.isRequired,
    isPlaying: PropTypes.bool.isRequired,
    currentAyah: PropTypes.string.isRequired,
    currentWord: PropTypes.string,
    setCurrentWord: PropTypes.func.isRequired,
    clearCurrentWord: PropTypes.func.isRequired,
    dispatchPlay: PropTypes.func.isRequired,
    dispatchPause: PropTypes.func.isRequired
  };

  state = { // initial state
    segments: [],
    listeners: {},
    seekLookup: {},
    timer1: null,
    timer2: null,
    token: null,
    currentWord: null,
    dispatchedPlay: false
  };

  constructor() {
    super(...arguments);
    this.secret = process.env.SEGMENTS_KEY;
  } // init

  componentWillMount() {
    this.buildSegments(this.props);
  } // Invoked once, both on the client and server, immediately before the initial rendering occurs. If you call setState within this method, render() will see the updated state and will be executed only once despite the state change.

  componentDidMount() {
    this.onAudioLoad(this.props.audio);
  } // Invoked once, only on the client (not on the server), immediately after the initial rendering occurs. At this point in the lifecycle, you can access any refs to your children (e.g., to access the underlying DOM representation). The componentDidMount() method of child components is invoked before that of parent components.

  componentWillReceiveProps(nextProps) {
    if (this.props.audio.src !== nextProps.audio.src) {
      this.onAudioUnload(this.props.audio);
      this.onAudioLoad(nextProps.audio);
    }

    if (this.props.segments !== nextProps.segments) {
      this.buildSegments(nextProps);
    }
  } // Invoked when a component is receiving new props. This method is not called for the initial render. Use this as an opportunity to react to a prop transition before render() is called by updating the state using this.setState(). The old props can be accessed via this.props. Calling this.setState() within this function will not trigger an additional render.

  shouldComponentUpdate(nextProps, nextState) {
    return [
      this.props.audio.src !== nextProps.audio.src,
      this.props.segments !== nextProps.segments,
      this.props.isPlaying !== nextProps.isPlaying,
      this.props.currentWord !== nextProps.currentWord,
      this.props.currentAyah !== nextProps.currentAyah
    ].some(test => test);
  }
  // Invoked before rendering when new props or state are being received. This method is not called for the initial render or when forceUpdate is used.
  // If shouldComponentUpdate returns false, then render() will be completely skipped until the next state change.
  // In addition, componentWillUpdate and componentDidUpdate will not be called.

  componentWillUpdate(nextProps, nextState) {} // Invoked immediately before rendering when new props or state are being received. This method is not called for the initial render. Use this as an opportunity to perform preparation before an update occurs. Note: You cannot use this.setState() in this method. If you need to update state in response to a prop change, use componentWillReceiveProps instead.
  // highlight jumps after a pause and a play but doesnt jump if seek action

  componentDidUpdate(prevProps, prevState) {
    const wordClicked = (
      (prevProps.currentWord == prevState.currentWord && this.props.currentWord && this.props.currentWord != prevState.currentWord) || // the state word should be equal to the props word by this point in the lifecycle if we are using our internal function to change words, so this clause says "if we were using our internal functions to change words and somebody suddenly clicked on a different word, then seek"
      (prevState.currentWord == null && this.state.currentWord == null && prevProps.currentWord != this.props.currentWord)
    );

    if (wordClicked) { // seek action
      const segment = this.props.currentWord? this.state.seekLookup[this.props.currentWord.replace(/^.*:(\d+)$/, '$1')] : null;

      if (segment) {
        this.seekAction(segment);
      }
    }

    // highlight action
    if (this.props.isPlaying && (!prevProps.isPlaying || this.state.currentAyah != this.props.currentAyah || prevProps.audio.src != this.props.audio.src)) { // if we just started playing or we are transitioning ayahs
      this.highlight(this.findIndexByTime(), 0);
    }

    if (!this.props.isPlaying && (wordClicked || (this.state.currentWord == prevState.currentWord && prevProps.currentWord != this.props.currentWord))) {
      this.setState({ dispatchedPlay: true });
      if (this.props.audio.readyState < 4) {
        const events = ['loadeddata', 'loaded', 'load', 'canplay', 'canplaythrough', 'loadstart'];
        let seekFunction = (ev) => {
          this.props.dispatchPlay();
          events.every((evName) => { // clean (remove) audio listeners
            this.props.audio.removeEventListener(evName, seekFunction, false);
            return true;
          });
        };
        events.every((evName) => { // add audio listeners to wait for the first available opportunity to seek
          this.props.audio.addEventListener(evName, seekFunction, false);
          return true;
        });
      } else {
        this.props.dispatchPlay();
      }
    }
  } // Invoked immediately after the component's updates are flushed to the DOM. This method is not called for the initial render.

  componentWillUnmount() {
    this.onAudioUnload(this.props.audio);
  }

  buildSegments(props) {
    this.setState({ token: null });
    this.state.seekLookup = {};

    let segments = null;
    try {
      segments = JSON.parse(decrypt(this.secret, new Buffer(props.segments, 'base64').toString()));
    } catch (e) {
      segments = [];
    }

    this.setState({ segments });

    segments.forEach((segment, index) => {
      const start = segment[0], duration = segment[1], token = segment[2];
      if (token >= 0) {
        this.state.seekLookup[token] = this.state.seekLookup[token]? this.state.seekLookup[token]
            : { start, duration, token, index };
      }
    });
  }

  onAudioLoad(audio) {
    const play = () => {};
    audio.addEventListener('play', play, false);

    const pause = () => {
      this.clearTimeouts();
    };
    audio.addEventListener('pause', pause, false);

    const timeupdate = () => {};
    audio.addEventListener('timeupdate', timeupdate, false);

    this.setState({
      listeners: { play, pause, timeupdate }
    });
  }

  onAudioUnload(audio) {
    Object.keys(this.state.listeners).forEach((listener) => {
      audio.removeEventListener(listener, this.state.listeners[listener]);
    });
    this.clearTimeouts();
  }

  highlight(index = 0, delta = 0) {
    this.setState({ currentAyah: this.props.currentAyah });
    const segment = this.state.segments[index];

    if (!segment) {
      return;
    }

    let start = segment[0], duration = segment[1], token = segment[2];
    let ending = start + duration;
    let current = this.props.audio.currentTime * 1000.0;

    if (token >= 0 && this.state.token !== token) {
      this.setToken(token);
    }

    this.state.timer1 = setTimeout(() => {
      const ending = start + duration;
      const current = this.props.audio.currentTime * 1000.0;
      delta = ending - current;
      if (delta >= 100) { // if we have a large difference then wait to unhighlight
        this.state.timer2 = setTimeout(() => {
          this.unhighlight(index);
        }, delta);
      } else { // otherwise unhighlight immediately
        this.unhighlight(index, delta)
      }
    }, duration + delta);
  }

  unhighlight(index, delta = 0) {
    const segment = this.state.segments[index];
    const token = segment[2];

    if (token >= 0) {
      this.unsetToken();
    }

    if (this.props.isPlaying && !this.state.dispatchedPlay) { // continue highlighting to next position
      this.highlight(index + 1, delta);
    } else if (this.state.dispatchedPlay) { // we dispatched a play, so now we need to dispatch a pause in order to play only a single word
      const current = this.props.audio.currentTime * 1000;
      const ending = segment[0] + segment[1];
      const difference = parseInt(ending - current, 10);

      this.setState({ dispatchedPlay: false });

      if (difference <= 0) {
        this.props.dispatchPause();
      } else {
        setTimeout(() => {
          this.props.dispatchPause();
        }, difference);
      }
    }
  }

  seekAction(segment) {
    const { audio } = this.props;

    this.clearTimeouts();

    if (audio.readyState >= 4) {
      this.goTo(segment);
    }
    else {
      const events = ['loadeddata', 'loaded', 'load', 'canplay', 'canplaythrough', 'loadstart'];

      let seekFunction = (ev) => {
        this.goTo(segment);

        events.every((evName) => { // clean (remove) audio listeners
          audio.removeEventListener(evName, seekFunction, false);
          return true;
        });
      };

      events.every((evName) => { // add audio listeners to wait for the first available opportunity to seek
        audio.addEventListener(evName, seekFunction, false);
        return true;
      });
    }
  }

  findIndexByTime() {
    const { audio } = this.props;
    const currentTime = audio.currentTime;
    let index = 0;

    Object.values(this.state.seekLookup).every((segment) => {
      if (currentTime * 1000 >= segment.start - 1 && currentTime * 1000 < segment.start + segment.duration) {
        index = segment.index;
        return false;
      }
      return true;
    });

    return index;
  }

  goTo(segment) {
    this.props.audio.currentTime = segment.start / 1000.0;

    if (this.props.isPlaying) {
      this.highlight(segment.index);
    }
  };

  clearTimeouts() {
    clearTimeout(this.state.timer1);
    clearTimeout(this.state.timer2);
  }

  setToken(token) {
    const { currentAyah } = this.props;
    const currentWord = `${currentAyah}:${token}`;
    this.setState({ token, currentWord });
    this.props.setCurrentWord(currentWord);
  }

  unsetToken() {
    this.setState({ token: null });
    this.setState({ currentWord: null });
    this.props.clearCurrentWord();
  }

  render() {
    return (
      <div></div>
    );
  }
}
