import React, { Component, PropTypes } from 'react';
import bindTooltip from 'utils/bindTooltip';
import { zeroPad } from 'helpers/StringHelpers';

/* eslint-disable no-unused-vars */
const CHAR_TYPE_WORD = 'word';
const CHAR_TYPE_END = 'end';
const CHAR_TYPE_PAUSE = 'pause';
const CHAR_TYPE_RUB = 'rub';
const CHAR_TYPE_SAJDAH = 'sajdah';

class Word extends Component {
  buildTooltip = (word, tooltip) => {
    let title;

    if (word.charType === CHAR_TYPE_END) {
      title = `Verse ${word.verseKey.split(':')[1]}`;
    } else if (word.charType === CHAR_TYPE_WORD) {
      title = word[tooltip].text;
    } else {
      title = '';
    }
    return title;
  };

  handleWordPlay = () => {
    const { word } = this.props;

    if (word.audio) {
      const audio = new Audio(word.audio.url); // eslint-disable-line

      audio.play();
    }
  };

  handleSegmentPlay = () => {
    const {
      word,
      currentVerse,
      audioActions,
      audioPosition,
      isPlaying,
      isSearched
    } = this.props;

    if (isSearched || !word.audio) {
      return;
    }

    if (currentVerse === word.verseKey && isPlaying) {
      audioActions.setCurrentWord(word.code);
    } else {
      audioActions.pause();
      audioActions.setAyah(word.verseKey);
      audioActions.playCurrentWord({ word, position: audioPosition });
    }
  };

  render() {
    const {
      tooltip,
      word,
      currentVerse,
      isPlaying,
      audioPosition,
      useTextFont
    } = this.props;

    let text;
    let spacer;
    const highlight = currentVerse === word.verseKey && isPlaying
      ? 'highlight'
      : '';
    const className = `${useTextFont ? 'text-' : ''}${word.charType === CHAR_TYPE_WORD ? word.className : 'p0'} ${word.charType} ${highlight} ${word.highlight ? word.highlight : ''}`;
    const id = `word-${word.verseKey.replace(/:/, '-')}-${audioPosition}`;

    if (word.charType === CHAR_TYPE_END) {
      text = zeroPad(word.verseKey.split(':')[1], 3, 0);
    } else if (!useTextFont || word.charType === CHAR_TYPE_PAUSE) {
      text = word.codeV3;
    } else {
      text = word.textMadani;
    }

    if (word.charType === CHAR_TYPE_WORD) {
      spacer = '&nbsp;';
    }

    return (
      <span>
        <b // eslint-disable-line
          {...bindTooltip}
          key={word.code}
          id={id}
          onDoubleClick={this.handleSegmentPlay}
          onClick={this.handleWordPlay}
          className={`${className} pointer`}
          title={this.buildTooltip(word, tooltip)}
          dangerouslySetInnerHTML={{ __html: text }}
        />
        <small
          dangerouslySetInnerHTML={{ __html: spacer }}
          style={{ letterSpacing: -15 }}
        />
      </span>
    );
  }
}

Word.propTypes = {
  word: PropTypes.object.isRequired, // eslint-disable-line
  tooltip: PropTypes.string,
  audioActions: PropTypes.object.isRequired, // eslint-disable-line
  audioPosition: PropTypes.number,
  currentVerse: PropTypes.string,
  isPlaying: PropTypes.bool,
  isSearched: PropTypes.bool,
  useTextFont: PropTypes.bool // tmp change to compare text and code based rendering
};

export default Word;
