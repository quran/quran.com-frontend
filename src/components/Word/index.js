import React, { PropTypes } from 'react';
import bindTooltip from 'utils/bindTooltip';
/* eslint-disable no-unused-vars */
const CHAR_TYPE_WORD = 'word';
const CHAR_TYPE_END = 'end';
const CHAR_TYPE_PAUSE = 'pause';
const CHAR_TYPE_RUB = 'rub';
const CHAR_TYPE_SAJDAH = 'sajdah';

export default class Word extends React.Component {
  static propTypes = {
    word: PropTypes.object.isRequired, // eslint-disable-line
    tooltip: PropTypes.string,
    audioActions: PropTypes.object.isRequired, // eslint-disable-line
    audioPosition: PropTypes.number,
    currentVerse: PropTypes.string.isRequired,
    isPlaying: PropTypes.bool,
    isSearched: PropTypes.bool
  };

  buildTooltip = (word, tooltip) => {
    if(word.charType === CHAR_TYPE_PAUSE){
      return;
    }

    let title;
    if (word.charType === CHAR_TYPE_END) {
      title = `Verse ${word.verseKey.split(':')[1]}`;
    } else {
      title = word[tooltip].text;
    }
    return title;
  }

  handleWordClick = () => {
    const { word, currentVerse, audioActions, audioPosition, isPlaying, isSearched } = this.props;

    if (isSearched) {
      return;
    }

    if ((currentVerse === word.verseKey) && isPlaying) {
      audioActions.setCurrentWord(word.code);
    } else {
      audioActions.pause();
      audioActions.setAyah(word.verseKey);
      audioActions.playCurrentWord({ word, position: audioPosition });
    }
  }

  render() {
    const { tooltip, word, currentVerse, isPlaying, audioPosition } = this.props;

    let id = null;
    const highlight = currentVerse === word.verseKey && isPlaying ? 'highlight' : '';
    const className = `${word.className} ${highlight} ${word.highlight ? word.highlight : ''}`;

    if (word.charType === CHAR_TYPE_WORD) {
      id = `word-${word.verseKey.replace(/:/, '-')}-${audioPosition || word.position}`;
    }

    return (
      <b // eslint-disable-line
        { ...bindTooltip}
        key={word.code}
        id={id}
        onClick={this.handleWordClick}
        className={`${className} pointer`}
        title={this.buildTooltip(word, tooltip)}
        dangerouslySetInnerHTML={{ __html: word.code }}
      />
    );
  }

}
