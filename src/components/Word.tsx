import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Tooltip } from 'react-tippy';
import { zeroPad } from '../helpers/stringHelpers';
import { buildAudioURL } from '../helpers/buildAudio';
import { WordShape } from '../shapes';
import { WORD_TYPES } from '../constants';

const propTypes = {
  word: WordShape.isRequired,
  setCurrentWord: PropTypes.func.isRequired,
  pause: PropTypes.func.isRequired,
  setVerse: PropTypes.func.isRequired,
  playCurrentWord: PropTypes.func.isRequired,
  tooltip: PropTypes.string,
  audioPosition: PropTypes.number,
  currentVerse: PropTypes.string,
  isPlaying: PropTypes.bool,
  isSearched: PropTypes.bool,
  useTextFont: PropTypes.bool, // tmp change to compare text and code based rendering
};

type Props = {
  word: WordShape;
  setCurrentWord(wordCode: string): any;
  pause(): any;
  setVerse(verseKey: string): any;
  playCurrentWord(data: { word: WordShape; position: number }): any;
  tooltip: 'translation' | 'transliteration';
  audioPosition?: number;
  currentVerse?: string;
  isPlaying?: boolean;
  isSearched?: boolean;
  useTextFont?: boolean;
};

class Word extends Component<Props> {
  public static propTypes = propTypes;

  buildTooltip = (word: WordShape, tooltip: string) => {
    let title;

    if (word.charType === WORD_TYPES.CHAR_TYPE_END) {
      title = `Verse ${word.verseKey.split(':')[1]}`;
    } else if (word.charType === WORD_TYPES.CHAR_TYPE_WORD) {
      title = word[tooltip].text;
    } else {
      title = '';
    }

    return title;
  };

  handleWordPlay = () => {
    const { word } = this.props;

    if (word.audio) {
      const audio = new Audio(buildAudioURL(word.audio));
      audio.play();
    }
  };

  handleSegmentPlay = () => {
    const {
      word,
      currentVerse,
      audioPosition,
      isPlaying,
      isSearched,
      setCurrentWord,
      pause,
      setVerse,
      playCurrentWord,
    } = this.props;

    if (isSearched || !word.audio) {
      return;
    }

    if (currentVerse === word.verseKey && isPlaying) {
      setCurrentWord(word.code);
    } else {
      pause();
      setVerse(word.verseKey);
      playCurrentWord({ word, position: audioPosition });
    }
  };

  render() {
    const { tooltip, word, currentVerse, isPlaying, useTextFont } = this.props;

    let text;
    let spacer;
    const highlight =
      currentVerse === word.verseKey && isPlaying ? 'highlight' : '';
    const className = `${useTextFont ? 'text-' : ''}${word.className} ${
      word.charType
    } ${highlight} ${word.highlight ? word.highlight : ''}`;
    const id = `word-${word.verseKey.replace(/:/, '-')}-${word.position}`;

    if (useTextFont) {
      if (word.charType === WORD_TYPES.CHAR_TYPE_END) {
        text = zeroPad(word.verseKey.split(':')[1], 3, 0);
      } else {
        text = word.textMadani;
      }
    } else {
      text = word.code;
    }

    if (word.charType === WORD_TYPES.CHAR_TYPE_WORD) {
      spacer = '&nbsp;';
    }

    return (
      <span>
        <Tooltip arrow title={this.buildTooltip(word, tooltip)}>
          <a // eslint-disable-line
            key={word.code}
            id={id}
            onDoubleClick={this.handleSegmentPlay}
            onClick={this.handleWordPlay}
            className={`${className} pointer`}
            dangerouslySetInnerHTML={{ __html: text }}
          />
        </Tooltip>
        <small
          dangerouslySetInnerHTML={{ __html: spacer }}
          style={{ letterSpacing: -15 }}
        />
      </span>
    );
  }
}

export default Word;
