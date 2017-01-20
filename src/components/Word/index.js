import React, { PropTypes } from 'react';
import bindTooltip from 'utils/bindTooltip';
/* eslint-disable no-unused-vars */
const CHAR_TYPE_WORD = 1;
const CHAR_TYPE_END = 2;
const CHAR_TYPE_PAUSE = 3;
const CHAR_TYPE_RUB = 4;
const CHAR_TYPE_SAJDAH = 5;

export default class Word extends React.Component {
  static propTypes = {
    word: PropTypes.object.isRequired, // eslint-disable-line
    tooltip: PropTypes.string,
    audioActions: PropTypes.object.isRequired, // eslint-disable-line
    audioPosition: PropTypes.number,
    currentAyah: PropTypes.string.isRequired,
    isPlaying: PropTypes.bool,
    isSearched: PropTypes.bool
  };

  buildTooltip = (word, tooltip) => {
    let title;
    if (!word.wordId && word.charTypeId === CHAR_TYPE_END) {
      title = `Verse ${word.ayahKey.split(':')[1]}`;
    } else {
      title = word[tooltip];
    }
    return title;
  }

  handleWordClick = () => {
    const { word, currentAyah, audioActions, audioPosition, isPlaying, isSearched } = this.props;

    if (isSearched) {
      return;
    }

    if ((currentAyah === word.ayahKey) && isPlaying) {
      audioActions.setCurrentWord(word.code);
    } else {
      audioActions.pause();
      audioActions.setAyah(word.ayahKey);
      audioActions.playCurrentWord({ word, position: audioPosition });
    }
  }

  render() {
    const { tooltip, word, currentAyah, isPlaying, audioPosition } = this.props;

    let id = null;
    const highlight = currentAyah === word.ayahKey && isPlaying ? 'highlight' : '';
    const className = `${word.className} ${highlight} ${word.highlight ? word.highlight : ''}`;

    if (word.charTypeId === CHAR_TYPE_WORD) {
      id = `word-${word.ayahKey.replace(/:/, '-')}-${audioPosition || word.position}`;
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
