import React, { PropTypes } from 'react';

const styles = require('../Ayah/style.scss');

/* eslint-disable no-unused-vars */
const CHAR_TYPE_WORD = 1;
const CHAR_TYPE_END = 2;
const CHAR_TYPE_PAUSE = 3;
const CHAR_TYPE_RUB = 4;
const CHAR_TYPE_SAJDAH = 5;
/* eslint-enable no-unused-vars */

export default class Line extends React.Component {
  static propTypes = {
    word: PropTypes.object.isRequired,
    tooltip: PropTypes.string,
    audioActions: PropTypes.object.isRequired,
    word: PropTypes.object.isRequired,
    currentAyah: PropTypes.object.isRequired,
    isPlaying: PropTypes.bool
  };

  buildTooltip(word, tooltip){
    let title;
    if (!word.wordId && word.charTypeId == CHAR_TYPE_END) {
      title = `Verse ${word.ayahKey.split(':')[1]}`;
    } else {
      title = word[tooltip];
    }
    return title;
  }

  handleWordClick(word){
    const { currentAyah, audioActions, isPlaying } = this.props;

    if(currentAyah == word.ayahKey && isPlaying) {
      audioActions.setCurrentWord(word.dataset.key) ;
    } else {
      audioActions.pause();
      audioActions.setAyah(word.dataset.ayah);
      audioActions.playCurrentWord(word.dataset.key);
    }
  }

  render() {
    const { tooltip, word, currentAyah, isPlaying } = this.props;

    console.info(currentAyah);
    console.info("playing "+isPlaying);

    let id = null;
    const  position = word.position - 1;
    const highlight = currentAyah == word.ayahKey && isPlaying ? 'highlight' : '';
    const className = `${word.className} ${highlight} ${word.highlight ? word.highlight : ''}`;

    if (word.charTypeId === CHAR_TYPE_WORD) {
      id = `word-${word.ayahKey.replace(/:/, '-')}-${position}`;
    }

    return (
      <b
        key={word.code}
        id={id}
        rel="tooltip"
        onClick={(event) => this.handleWordClick(event.target)}
        data-key={`${word.ayahKey}:${position}`}
        data-ayah={word.ayahKey}
        className={`${className} pointer`}
        title={this.buildTooltip(word, tooltip)}
        dangerouslySetInnerHTML={{__html: word.code}}
      />
    );
  }

}
