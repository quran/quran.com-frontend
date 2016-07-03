import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';

import debug from 'helpers/debug';

export default class Segments extends Component {
  static propTypes = {
    audio: PropTypes.object,
    segments: PropTypes.object.isRequired,
    currentAyah: PropTypes.string,
    currentTime: PropTypes.number
  };

  shouldComponentUpdate(nextProps) {
    return [
      this.props.audio !== nextProps.audio,
      this.props.currentAyah !== nextProps.currentAyah,
      this.props.currentTime !== nextProps.currentTime,
    ].some(test => test);
  }

  render() {
    const { segments, currentAyah, currentTime } = this.props;
    const style = [];
    let currentWord = null;

    if (!Object.keys(segments).length) return <noscript />;

    Object.keys(segments.words).forEach(wordIndex => {
      const word = segments.words[wordIndex];

      if (currentTime >= word.startTime && currentTime < word.endTime) {
        currentWord = `${currentAyah}:${wordIndex}`;
      }
    });

    if (currentWord) {
      debug('component:Segments', `render with currentWord ${currentWord}`);

      style.push({
        cssText: `#word-${currentWord.replace(/:/g, '-')}{
          color: #279197;
          border-color: #279197;
        }`
      });
    } else {
      debug('component:Segments', 'render without currentWord');
    }

    return (
      <Helmet
        style={style}
      />
    );
  }
}
