import React, { Component, ReactNode } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Element from 'react-scroll/lib/components/Element';
import T from './T';
import Translation from './Translation';

import { VerseShape, ChapterShape } from '../shapes';
import Text from './verse/Text';
import Controls from './verse/Controls';

// TODO: Change this
const VerseNode = styled(Element)<{ highlight?: boolean; textMuted: string }>`
  padding: 2.5% 0;
  border-bottom: 1px solid rgba(${({ textMuted }) => textMuted}, 0.5);

  ${({ highlight }) =>
    highlight ? 'background-color: #F5FBF7;' : ''} .text-info {
    color: ${({ theme }) => theme.brandInfo};
    &:hover {
      color: ${({ theme }) => theme.brandPrimary};
    }
  }
`;

const propTypes = {
  isSearched: PropTypes.bool,
  verse: VerseShape.isRequired,
  chapter: ChapterShape.isRequired,
  match: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  isPlaying: PropTypes.bool,
  tooltip: PropTypes.string,
  isCurrentVerse: PropTypes.bool,
  currentVerse: PropTypes.string,
  fetchTafsirs: PropTypes.func.isRequired,
  pause: PropTypes.func.isRequired,
  setVerse: PropTypes.func.isRequired,
  play: PropTypes.func.isRequired,
  isPdf: PropTypes.bool,
};

const defaultProps: $TsFixMe = {
  isSearched: false,
  isPdf: false,
  match: null,
  isPlaying: false,
  tooltip: null,
  isCurrentVerse: false,
  currentVerse: null,
};

type Props = {
  isSearched?: boolean;
  verse: VerseShape;
  chapter: ChapterShape;
  match: $TsFixMe;
  isPlaying?: boolean;
  tooltip?: string;
  currentWord?: number;
  isCurrentVerse?: boolean;
  currentVerse?: string;
  userAgent?: { [key: string]: boolean };
  fetchTafsirs(verse: VerseShape, title: ReactNode | string): $TsFixMe;
  play(): $TsFixMe;
  pause(): $TsFixMe;
  setVerse(verseKey: string): $TsFixMe;
  isPdf?: boolean;
};

class Verse extends Component<Props> {
  public static propTypes = propTypes;

  public static defaultProps = defaultProps;

  handlePlay = () => {
    const {
      isPlaying,
      verse,
      pause,
      setVerse,
      play,
      isCurrentVerse,
    } = this.props;

    if (isPlaying) {
      pause();
    }

    if (isCurrentVerse) {
      return;
    }

    setVerse(verse.verseKey);
    play();
  };

  handleTafsirsClick = () => {
    const { verse, fetchTafsirs } = this.props;

    return fetchTafsirs(
      verse,
      <T id="tafsir.select" defaultMessage="Select a tafsir" />
    );
  };

  render() {
    const {
      verse,
      isCurrentVerse,
      currentVerse,
      isPlaying,
      isSearched,
      match,
      chapter,
      isPdf,
    } = this.props;
    const translations: Array<$TsFixMe> = match || verse.translations || [];

    return (
      <VerseNode
        name={`verse:${verse.verseKey}`}
        className="row"
        highlight={isCurrentVerse}
      >
        <Controls
          isSearched={isSearched}
          verse={verse}
          chapter={chapter}
          isPlaying={isPlaying}
          currentVerse={currentVerse}
          isPdf={isPdf}
          onPlayClick={this.handlePlay}
          onTafsirsClick={this.handleTafsirsClick}
        />
        <div className="col-md-11 col-sm-11">
          <Text verse={verse} isSearched={isSearched} />
          {translations.map(translation => (
            <Translation key={translation.id} translation={translation} />
          ))}
        </div>
      </VerseNode>
    );
  }
}

export default Verse;
