import React, { Component, PropTypes } from 'react';
import { decrypt } from 'sjcl';
import Helmet from 'react-helmet';

export default class Segments extends Component {
  static propTypes = {
    audio: PropTypes.object.isRequired,
    segments: PropTypes.string.isRequired,
    currentAyah: PropTypes.string,
    currentWord: PropTypes.string,
    currentTime: PropTypes.number,
    onSetCurrentWord: PropTypes.func.isRequired
  };

  static defaultProps = {
    currentWord: null
  };

  state = {
    intervals: [],
    words: {},
  };

  // LIFECYCLE METHODS

  componentDidMount() {
    this.buildIntervals(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.audio !== nextProps.audio) {
      this.buildIntervals(nextProps);
    }

    if (this.props.currentTime !== nextProps.currentTime) {
      if (this.state.words) {
        let currentWord = null;

        Object.keys(this.state.words).forEach(wordIndex => {
          const word = this.state.words[wordIndex];

          if (nextProps.currentTime > word.startTime && nextProps.currentTime < word.endTime) {
            currentWord = `${nextProps.currentAyah}:${wordIndex}`;
          }
        });

        this.props.onSetCurrentWord(currentWord);
      }
    }
  }

  shouldComponentUpdate(nextProps) {
    return [
      this.props.audio !== nextProps.audio,
      this.props.currentAyah !== nextProps.currentAyah,
      this.props.currentWord !== nextProps.currentWord,
    ].some(test => test);
  }

  buildIntervals(props) {
    const { segments } = props;

    let parsedSegments = null;
    try {
      parsedSegments = JSON.parse(
        decrypt(
          process.env.SEGMENTS_KEY,
          new Buffer(segments, 'base64').toString()
        )
      );
    } catch (e) {
      parsedSegments = [];
    }

    const words = {};
    const intervals = parsedSegments.map(segment => {
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

  render() {
    const { currentWord } = this.props;
    const style = [];

    if (currentWord) {
      style.push({
        cssText: `#word-${currentWord.replace(/:/g, '-')}{
          color: #279197;
          border-color: #279197;
        }`
      });
    }

    return (
      <Helmet
        style={style}
      />
    );
  }
}
