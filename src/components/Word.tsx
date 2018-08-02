import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Tooltip } from 'react-tippy';
import pad from 'lodash/pad';
import { buildAudioURL } from '../helpers/buildAudio';
import { WordShape } from '../shapes';
import { WORD_TYPES } from '../constants';
import { SetCurrentVerse } from '../redux/actions/audioplayer';

const propTypes = {
  word: WordShape.isRequired,
  setCurrentWord: PropTypes.func.isRequired,
  pause: PropTypes.func.isRequired,
  setCurrentVerse: PropTypes.func.isRequired,
  playCurrentWord: PropTypes.func.isRequired,
  tooltip: PropTypes.string.isRequired,
  audioPosition: PropTypes.number,
  currentVerse: PropTypes.string,
  isPlaying: PropTypes.bool.isRequired,
  isSearched: PropTypes.bool,
  useTextFont: PropTypes.bool, // tmp change to compare text and code based rendering
};

type DefaultProps = {
  audioPosition?: number;
  isSearched?: boolean;
  useTextFont?: boolean;
  currentVerse?: string;
};

const defaultProps: DefaultProps = {
  isSearched: false,
  useTextFont: false,
  audioPosition: null,
  currentVerse: '',
};

type Props = {
  word: WordShape;
  setCurrentWord(wordCode: string): any;
  pause(): any;
  setCurrentVerse: SetCurrentVerse;
  playCurrentWord(data: { word: WordShape; position: number }): any;
  tooltip: 'translation' | 'transliteration';
  audioPosition?: number;
  currentVerse?: string;
  isPlaying: boolean;
  isSearched?: boolean;
  useTextFont?: boolean;
};

class Word extends Component<Props> {
  public static propTypes = propTypes;
  public static defaultProps = defaultProps;

  buildTooltip = () => {
    const { word, tooltip } = this.props;

    let title = '';

    if (word.charType === WORD_TYPES.CHAR_TYPE_END) {
      title = `Verse ${word.verseKey.split(':')[1]}`;
    } else if (word.charType === WORD_TYPES.CHAR_TYPE_WORD && word[tooltip]) {
      title = word[tooltip].text;
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
      setCurrentVerse,
      playCurrentWord,
    } = this.props;

    if (isSearched || !word.audio) {
      return;
    }

    if (currentVerse === word.verseKey && isPlaying) {
      setCurrentWord(word.code);
    } else {
      pause();
      setCurrentVerse(word.verseKey);
      playCurrentWord({ word, position: audioPosition });
    }
  };

  render() {
    const { word, currentVerse, isPlaying, useTextFont } = this.props;

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
        text = pad(word.verseKey.split(':')[1], 3, '0');
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
        <Tooltip arrow title={this.buildTooltip()}>
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
