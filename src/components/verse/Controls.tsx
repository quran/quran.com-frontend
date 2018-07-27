import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { asyncComponent } from 'react-async-component';
import Badge from './Badge';
import { VerseShape, ChapterShape } from '../../shapes';
import T, { KEYS } from '../T';

const VerseCopy = asyncComponent({
  resolve: () => import(/* webpackChunkName: "VerseCopy" */ '../VerseCopy'),
});

const Share = asyncComponent({
  resolve: () => import(/* webpackChunkName: "Share" */ '../Share'),
});

const ControlsNode = styled.div<{ textMuted?: $TsFixMe }>`
  a {
    margin-bottom: 15px;
    display: block;
    text-decoration: none;
    font-size: 12px;
    cursor: pointer;

    &:focus {
      color: ${({ textMuted }) => textMuted};
    }
  }
  .label {
    padding: 0.65em 1.1em;
    border-radius: 0;
    display: inline-block;
    margin-bottom: 15px;
    font-weight: 300;
    color: ${({ theme }) => theme.textColor};

    &:hover {
      opacity: 0.7;
    }
  }

  @media (max-width: ${({ theme }) => theme.screen.sm}) {
    h4,
    a {
      display: inline-block;
      margin: 0 10;
    }

    h4 {
      margin: 0;
    }

    padding: 0;
  }
`;

const propTypes = {
  isSearched: PropTypes.bool,
  verse: VerseShape.isRequired,
  chapter: ChapterShape.isRequired,
  isPlaying: PropTypes.bool,
  currentVerse: PropTypes.string,
  isPdf: PropTypes.bool,
  onPlayClick: PropTypes.func.isRequired,
  onTafsirsClick: PropTypes.func.isRequired,
};

const defaultProps: $TsFixMe = {
  isSearched: false,
  isPdf: false,
  isPlaying: false,
  currentVerse: null,
};

type Props = {
  isSearched?: boolean;
  verse: VerseShape;
  chapter: ChapterShape;
  isPlaying: boolean;
  currentVerse?: string;
  isPdf?: boolean;
  onPlayClick(): void;
  onTafsirsClick(): void;
};

const Controls: React.SFC<Props> = ({
  isPdf,
  isSearched,
  verse,
  chapter,
  currentVerse,
  isPlaying,
  onPlayClick,
  onTafsirsClick,
}: Props) => {
  const isCurrentVersePlaying = verse.verseKey === currentVerse && isPlaying;

  return (
    <ControlsNode className="col-md-1 col-sm-1">
      <Badge isSearched={isSearched} verse={verse} />
      {!isSearched &&
        !isPdf && (
          <button
            type="button"
            onClick={onPlayClick}
            className="text-muted btn btn-link"
          >
            <i
              className={`ss-icon ${
                isCurrentVersePlaying ? 'ss-pause' : 'ss-play'
              } vertical-align-middle`}
            />{' '}
            <T
              id={
                isCurrentVersePlaying ? KEYS.ACTIONS_PAUSE : KEYS.ACTIONS_PLAY
              }
            />
          </button>
        )}
      {!isPdf &&
        !isSearched && (
          <VerseCopy text={verse.textMadani} verseKey={verse.verseKey} />
        )}
      <button
        type="button"
        className="text-muted btn btn-link"
        onClick={onTafsirsClick}
      >
        <i className="ss-book vertical-align-middle" />{' '}
        <T id={KEYS.ACTIONS_TAFSIRS} />
      </button>
      {!isSearched && !isPdf && <Share chapter={chapter} verse={verse} />}
    </ControlsNode>
  );
};

Controls.propTypes = propTypes;
Controls.defaultProps = defaultProps;

export default Controls;
