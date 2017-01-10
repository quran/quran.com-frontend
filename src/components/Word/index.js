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
    tooltip: PropTypes.string,
    audioActions: PropTypes.object.isRequired,
    word: PropTypes.object.isRequired,
    isPlaying: PropTypes.bool
  };

  render() {
    let id = null;
    const className = `${word.className} ${word.highlight ? word.highlight : ''}`;

    if (word.charTypeId === CHAR_TYPE_WORD) {
      position = position + 1;
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
