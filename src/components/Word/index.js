import React, { PropTypes } from 'react';
import bindTooltip from 'utils/bindTooltip';
/* eslint-disable no-unused-vars */
const CHAR_TYPE_WORD = 1;
const CHAR_TYPE_END = 'end';
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
    isSearched: PropTypes.bool,
    useNewFonts: PropTypes.bool
  };

  buildTooltip = (word, tooltip) => {
    let title;
    if (!word.wordId && word.charType === CHAR_TYPE_END) {
      title = `Verse ${word.verseKey.split(':')[1]}`;
    } else {
      title = word[tooltip] && word[tooltip].text;
    }
    return title;
  }

  handleWordClick = () => {
    const { word, currentAyah, audioActions, audioPosition, isPlaying, isSearched } = this.props;

    if (isSearched) {
      return;
    }

    if ((currentAyah === word.verseKey) && isPlaying) {
      audioActions.setCurrentWord(word.code);
    } else {
      audioActions.pause();
      audioActions.setAyah(word.verseKey);
      audioActions.playCurrentWord({ word, position: audioPosition });
    }
  }

  renderCode(word) {
    const { useNewFonts } = this.props;

    if (useNewFonts && word.charType == CHAR_TYPE_END) {
      console.info(`&#xa${("000" + word.verseKey.split(':')[1]).slice(-3)};`);

      return `&#xa${("000" + word.verseKey.split(':')[1]).slice(-3)};`;
    } else {
      return word.code;
    }
  }

  render() {
    const { tooltip, word, currentAyah, isPlaying, useNewFonts } = this.props;

    let id = null;
    const  position = word.position - 1;
    const highlight = currentAyah == word.verseKey && isPlaying ? 'highlight' : '';
    let font = `${useNewFonts ? word.charType == CHAR_TYPE_END ? 'opt-ayah-number' : 'opt'+word.className : word.className}`;
    const className = `${font} ${highlight} ${word.highlight ? word.highlight : ''}`;
    if (word.charTypeId === CHAR_TYPE_WORD) {
      id = `word-${word.verseKey.replace(/:/, '-')}-${word.position}`;
    }

    return (
      <b // eslint-disable-line
        { ...bindTooltip}
        id={id}
        onClick={this.handleWordClick}
        className={`${className} pointer`}
        title={this.buildTooltip(word, tooltip)}
        dangerouslySetInnerHTML={{__html: this.renderCode(word)}}
      />
    );
  }

}
