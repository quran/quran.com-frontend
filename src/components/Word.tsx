import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { Tooltip } from 'react-tippy';
import pad from 'lodash/pad';
import styled from 'styled-components';
import { buildAudioURL } from '../helpers/buildAudio';
import { WordShape } from '../shapes';
import { WORD_TYPES } from '../constants';
import {
  SetCurrentVerseKey,
  SetCurrentWord,
  Pause,
  PlayCurrentWord,
} from '../redux/actions/audioplayer';

const WordGlyph = styled.span`
  -webkit-font-smoothing: antialiased;
`;

const WordWrap = styled.a<{ highlight?: boolean }>`
  -webkit-font-smoothing: antialiased;
  float: right;
  color: ${({ highlight, theme }) =>
    highlight ? theme.brandPrimary : 'initial'};
`;

const WordText = styled.i`
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  color: transparent;
  -webkit-user-select: text;
  -moz-user-select: text;
  -ms-user-select: text;
  user-select: text;
`;

const propTypes = {
  word: WordShape.isRequired,
  setCurrentWord: PropTypes.func.isRequired,
  pause: PropTypes.func.isRequired,
  setCurrentVerseKey: PropTypes.func.isRequired,
  playCurrentWord: PropTypes.func.isRequired,
  tooltip: PropTypes.string.isRequired,
  audioPosition: PropTypes.number,
  isCurrentVersePlaying: PropTypes.bool.isRequired,
  isSearched: PropTypes.bool,
  useTextFont: PropTypes.bool, // tmp change to compare text and code based rendering
};

type DefaultProps = {
  audioPosition?: number | undefined;
  isSearched?: boolean;
  useTextFont?: boolean;
  currentVerse?: string | null;
};

const defaultProps: DefaultProps = {
  isSearched: false,
  useTextFont: false,
  audioPosition: undefined,
  currentVerse: null,
};

type Props = {
  word: WordShape;
  setCurrentWord: SetCurrentWord;
  pause: Pause;
  setCurrentVerseKey: SetCurrentVerseKey;
  playCurrentWord: PlayCurrentWord;
  tooltip: 'translation' | 'transliteration';
  audioPosition?: number;
  isCurrentVersePlaying: boolean;
  isSearched?: boolean;
  useTextFont?: boolean;
};

class Word extends Component<Props> {
  public static propTypes = propTypes;
  public static defaultProps = defaultProps;

  timer: number | undefined = undefined;

  getTooltipTitle = () => {
    const { word, tooltip } = this.props;

    let title = '';

    if (word.charType === WORD_TYPES.CHAR_TYPE_END) {
      title = `Verse ${word.verseKey.split(':')[1]}`;
    } else if (word.charType === WORD_TYPES.CHAR_TYPE_WORD) {
      if (word[tooltip]) {
        title = (word[tooltip] || {}).text || '';
      }
    }

    return title;
  };

  getLanguageName = () => {
    const { word, tooltip } = this.props;
    const content = word[tooltip];

    if (content) {
      return content.languageName;
    }

    return '';
  };

  handleClick = () => {
    if (this.timer && this.timer < 300) {
      this.handleSegmentPlay();
      window.clearTimeout(this.timer);
      this.timer = undefined;
    } else {
      this.timer = window.setTimeout(() => {
        this.handleWordPlay();
        window.clearTimeout(this.timer);
        this.timer = undefined;
      }, 300);
    }
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
      audioPosition,
      isSearched,
      setCurrentWord,
      pause,
      setCurrentVerseKey,
      playCurrentWord,
      isCurrentVersePlaying,
    } = this.props;

    if (isSearched || !word.audio) {
      return;
    }

    if (isCurrentVersePlaying) {
      setCurrentWord(word.code);
    } else {
      pause();
      setCurrentVerseKey(word.verseKey);
      playCurrentWord({ word, position: audioPosition });
    }
  };

  render() {
    const {
      audioPosition,
      isCurrentVersePlaying,
      word,
      useTextFont,
    } = this.props;

    let text = '';
    const { verseKey } = word;
    const className = `${useTextFont ? 'text-' : ''}${word.className} ${
      word.charType
    } ${word.highlight ? word.highlight : ''}`;

    const id = `word-${(verseKey || '').replace(/:/, '-')}-${audioPosition}`;

    if (useTextFont) {
      if (word.charType === WORD_TYPES.CHAR_TYPE_END) {
        text = pad(word.verseKey.split(':')[1], 3, '0');
      } else if (word.textMadani) {
        text = word.textMadani;
      }
    } else {
      text = word.code;
    }

    // const tooltipText = this.getTooltipTitle();
    // const tooltipHtml = (
    //   <div className={this.getLanguageName()}>{tooltipText}</div>
    // );

    return (
      <span>
        {/* <Tooltip
          arrow
          interactive
          title={tooltipText}
          html={tooltipHtml}
          style={{ position: 'relative', float: 'right', overflow: 'hidden' }}
        > */}
        <WordWrap
          role="button"
          tabIndex={audioPosition}
          highlight={isCurrentVersePlaying}
          id={id}
          // onDoubleClick={this.handleSegmentPlay}
          onClick={this.handleClick}
          onKeyPress={this.handleWordPlay}
        >
          <WordGlyph
            className={className}
            dangerouslySetInnerHTML={{ __html: text }}
          />

          <WordText
            dangerouslySetInnerHTML={{ __html: `${word.textMadani} ` || ' ' }}
          />
        </WordWrap>
        {/* </Tooltip> */}
        {word.charType === WORD_TYPES.CHAR_TYPE_WORD && (
          <small style={{ letterSpacing: -15 }}>&nbsp;</small>
        )}
      </span>
    );
  }
}

export default Word;
