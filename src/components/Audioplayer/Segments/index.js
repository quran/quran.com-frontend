import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as customPropTypes from 'customPropTypes';
import Helmet from 'react-helmet';
import debug from 'helpers/debug';

class Segments extends Component {
  shouldComponentUpdate(nextProps) {
    return [
      this.props.currentVerse !== nextProps.currentVerse,
      this.props.currentTime !== nextProps.currentTime
    ].some(test => test);
  }

  render() {
    const { segments, currentVerse, currentTime } = this.props;
    const style = [];
    let currentWord = null;

    if (!Object.keys(segments).length) return <noscript />;

    Object.keys(segments.words).forEach(wordIndex => {
      const word = segments.words[wordIndex];

      if (currentTime >= word.startTime && currentTime < word.endTime) {
        currentWord = `${currentVerse}:${wordIndex}`;
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

    return <Helmet style={style} />;
  }
}

Segments.propTypes = {
  segments: customPropTypes.segments.isRequired,
  currentVerse: PropTypes.string,
  currentTime: PropTypes.number
};

export default Segments;
