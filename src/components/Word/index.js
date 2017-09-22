import React, { Component } from 'react';
import PropTypes from 'prop-types';
import bindTooltip from 'utils/bindTooltip';
import { zeroPad } from 'helpers/StringHelpers';

/* eslint-disable no-unused-vars */
const CHAR_TYPE_WORD = 'word';
const CHAR_TYPE_END = 'end';
const CHAR_TYPE_PAUSE = 'pause';
const CHAR_TYPE_RUB = 'rub';
const CHAR_TYPE_SAJDAH = 'sajdah';

class Word extends Component {
  buildTooltip = () => {
    const { tooltip, word } = this.props;

    let title = '';

    if (word.charTypeName === CHAR_TYPE_END) {
      title = `Verse ${word.verseNumber}`;
    } else if (word.charTypeName === CHAR_TYPE_WORD) {
      title = word[tooltip].text;
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

    const className = `${useTextFont ? 'text-' : ''}${word.className} ${word.charTypeName} ${highlight} ${word.highlight ? word.highlight : ''}`;
    const id = `word-${word.verseKey.replace(/:/, '-')}-${audioPosition}`;

    if (useTextFont) {
      if (word.charTypeName === CHAR_TYPE_END) {
        text = zeroPad(word.verseNumber, 3, 0);
      } else {
        text = word.textMadani;
      }
    } else {
      text = word.code;
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
          title={this.buildTooltip()}
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
