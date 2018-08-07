import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Element from 'react-scroll/modules/components/Element';
import Translation from './Translation';

import { VerseShape, ChapterShape } from '../shapes';
import Text from './verse/Text';
import Controls from './verse/Controls';
import { FetchTafsirs } from '../redux/actions/tafsirs';
import { setCurrentVerseKey } from '../redux/actions/audioplayer';

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
  isCurrentVersePlaying: PropTypes.bool.isRequired,
  fetchTafsirs: PropTypes.func.isRequired,
  pause: PropTypes.func.isRequired,
  setCurrentVerseKey: PropTypes.func.isRequired,
  play: PropTypes.func.isRequired,
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
  match?: $TsFixMe;
  isCurrentVersePlaying: boolean;
  tooltip?: string;
  currentWord?: number;
  currentVerse?: string;
  userAgent?: { [key: string]: boolean };
  fetchTafsirs: FetchTafsirs;
  play(): any;
  pause(): any;
  setCurrentVerseKey: setCurrentVerseKey;
  isPdf?: boolean;
};

class Verse extends Component<Props> {
  public static propTypes = propTypes;

  public static defaultProps = defaultProps;

  handlePlay = () => {
    const { isCurrentVersePlaying, verse, pause, setCurrentVerseKey } = this.props;

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
      match,
      chapter,
      isPdf,
    } = this.props;
    const translations: Array<$TsFixMe> = match || verse.translations || [];

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
