import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Element from 'react-scroll/modules/components/Element';
import Translation from './Translation';

import { VerseShape, ChapterShape } from '../shapes';
import Text from './verse/Text';
import Controls from './verse/Controls';
import { FetchTafsirs } from '../redux/actions/tafsirs';
import { SetCurrentVerseKey, Play, Pause } from '../redux/actions/audioplayer';

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
  isCurrentVersePlaying: PropTypes.bool.isRequired,
  fetchTafsirs: PropTypes.func.isRequired,
  pause: PropTypes.func.isRequired,
  setCurrentVerseKey: PropTypes.func.isRequired,
  isPdf: PropTypes.bool,
};

const defaultProps: $TsFixMe = {
  isSearched: false,
  isPdf: false,
  match: null,
  currentVerse: null,
};

type Props = {
  isSearched?: boolean;
  verse: VerseShape;
  chapter: ChapterShape;
  isCurrentVersePlaying: boolean;
  tooltip: 'translation' | 'transliteration';
  fetchTafsirs: FetchTafsirs;
  play: Play;
  pause: Pause;
  setCurrentVerseKey: SetCurrentVerseKey;
  isPdf?: boolean;
};

class Verse extends Component<Props> {
  public static propTypes = propTypes;

  public static defaultProps = defaultProps;

  handlePlay = () => {
    const {
      isCurrentVersePlaying,
      verse,
      pause,
      setCurrentVerseKey,
    } = this.props;

    if (isCurrentVersePlaying) {
      pause();
    }

    setCurrentVerseKey(verse.verseKey, true);
  };

  handleTafsirsClick = () => {
    const { verse, fetchTafsirs } = this.props;
    // TODO: Fix this

    return fetchTafsirs(verse.chapterId, verse.id, 1);
  };

  render() {
    const {
      verse,
      isCurrentVersePlaying,
      isSearched,
      chapter,
      isPdf,
    } = this.props;
    const translations: Array<$TsFixMe> = verse.translations || [];

    return (
      <VerseNode
        name={`verse:${verse.verseKey}`}
        className="row"
        highlight={isCurrentVersePlaying}
      >
        <Controls
          isSearched={isSearched}
          verse={verse}
          chapter={chapter}
          isCurrentVersePlaying={isCurrentVersePlaying}
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
