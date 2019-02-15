import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Badge from './Badge';
import VerseCopy from '../VerseCopy';
import Share from '../Share';
import { VerseShape, ChapterShape } from '../../shapes';
import T, { KEYS } from '../T';
import ButtonLink from '../dls/ButtonLink';

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

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
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
  isCurrentVersePlaying: PropTypes.bool.isRequired,
  isPdf: PropTypes.bool,
  onPlayClick: PropTypes.func.isRequired,
  onTafsirsClick: PropTypes.func.isRequired,
};

const defaultProps: $TsFixMe = {
  isSearched: false,
  isPdf: false,
};

type Props = {
  isSearched?: boolean;
  verse: VerseShape;
  chapter: ChapterShape;
  isCurrentVersePlaying: boolean;
  isPdf?: boolean;
  onPlayClick(): void;
  onTafsirsClick(): void;
};

const Controls: React.SFC<Props> = ({
  isPdf,
  isSearched,
  verse,
  chapter,
  isCurrentVersePlaying,
  onPlayClick,
  onTafsirsClick,
}: Props) => (
  <ControlsNode className="col-md-1 col-sm-1">
    <Badge isSearched={isSearched} verse={verse} />
    {!isSearched &&
      !isPdf && (
        <ButtonLink type="button" onClick={onPlayClick}>
          <i
            className={`ss-icon ${
              isCurrentVersePlaying ? 'ss-pause' : 'ss-play'
            } vertical-align-middle`}
          />{' '}
          <T
            id={isCurrentVersePlaying ? KEYS.ACTIONS_PAUSE : KEYS.ACTIONS_PLAY}
          />
        </ButtonLink>
      )}
    {!isPdf &&
      !isSearched && (
        <VerseCopy text={verse.textMadani} verseKey={verse.verseKey} />
      )}
    <ButtonLink type="button" onClick={onTafsirsClick}>
      <i className="ss-book vertical-align-middle" />{' '}
      <T id={KEYS.ACTIONS_TAFSIRS} />
    </ButtonLink>
    {!isSearched && !isPdf && <Share chapter={chapter} verse={verse} inline />}
  </ControlsNode>
);

Controls.propTypes = propTypes;
Controls.defaultProps = defaultProps;

export default Controls;
