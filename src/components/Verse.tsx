import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Element from 'react-scroll/modules/components/Element';
import Translation from './Translation';

import { VerseShape, ChapterShape, FootNoteShape } from '../shapes';
import Text from './verse/Text';
import Controls from './verse/Controls';
import { FetchTafsirs } from '../redux/actions/tafsirs';
import { SetCurrentVerseKey, Play, Pause } from '../redux/actions/audioplayer';
import { FetchFootNote } from '../redux/actions/footNotes';
import FootNote from './FootNote';

// TODO: Change this
const VerseNode = styled(Element)<{ highlight?: boolean; isNightMode?:boolean; textMuted: string }>`
  padding: 2.5% 0;
  border-bottom: 1px solid rgba(${({ textMuted }) => textMuted}, 0.5);
  background-color: ${({ highlight, isNightMode }) => highlight ? isNightMode ? "#151414" : "#F5FBF7" : ''}; 
  .text-info {
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
  fetchFootNote: PropTypes.func.isRequired,
  isPdf: PropTypes.bool,
  footNote: FootNoteShape,
  isNightMode: PropTypes.bool
};

const defaultProps: $TsFixMe = {
  isSearched: false,
  isPdf: false,
  match: null,
  currentVerse: null,
  footNote: null,
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
  fetchFootNote: FetchFootNote;
  isPdf?: boolean;
  footNote?: FootNoteShape;
  isNightMode: boolean;
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
      footNote,
      isCurrentVersePlaying,
      isSearched,
      chapter,
      isPdf,
      fetchFootNote,
      isNightMode
    } = this.props;
    const translations: Array<$TsFixMe> = verse.translations || [];
    return (
      <VerseNode
        name={`verse:${verse.verseKey}`}
        className="row"
        highlight={isCurrentVersePlaying}
        isNightMode={isNightMode}
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
            <Translation
              key={translation.id}
              translation={translation}
              fetchFootNote={fetchFootNote}
              verseKey={verse.verseKey}
              isNightMode={isNightMode}
            />
          ))}
          {footNote && <FootNote footNote={footNote} />}
        </div>
      </VerseNode>
    );
  }
}

export default Verse;
