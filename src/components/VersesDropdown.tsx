import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import range from 'lodash/range';
import NavDropdown from 'react-bootstrap/lib/NavDropdown';
import MenuItem from 'react-bootstrap/lib/MenuItem';
import { Link } from 'react-scroll';
import T, { KEYS } from './T';
import { ChapterShape, VerseShape } from '../shapes';

const StyledDropdown = styled(NavDropdown)`
  .dropdown-menu {
    max-height: 400px;
    max-height: 60vh;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
    overflow-x: hidden;
  }
`;

const propTypes = {
  chapter: ChapterShape.isRequired,
  onClick: PropTypes.func.isRequired,
  isReadingMode: PropTypes.bool.isRequired,
  verses: PropTypes.shape({
    verseKey: VerseShape,
  }).isRequired,
};

type Props = {
  chapter?: ChapterShape;
  onClick(verseKey: string): void;
  isReadingMode: boolean;
  verses?: { [verseKey: string]: VerseShape };
};

const VersesDropdown: React.SFC<Props> = ({
  chapter,
  isReadingMode,
  onClick,
  verses,
}: Props) => {
  if (!chapter || !verses) return null;

  const title = <T id={KEYS.SETTING_VERSES} />;
  const array = range(chapter.versesCount).map(
    number => `${chapter.chapterNumber}:${number + 1}`
  );

  return (
    <StyledDropdown className="dropdown" id="verses-dropdown" title={title}>
      {array.map(verseKey => {
        if (verses[verseKey] && !isReadingMode) {
          return (
            <li key={verseKey}>
              <Link
                onClick={() => onClick(verseKey)}
                to={`verse:${verseKey}`}
                smooth
                spy
                offset={-120}
                activeClass="active"
                duration={500}
                className="pointer"
              >
                {verseKey}
              </Link>
            </li>
          );
        }

        return (
          <MenuItem key={verseKey} onClick={() => onClick(verseKey)}>
            {verseKey}
          </MenuItem>
        );
      })}
    </StyledDropdown>
  );
};

VersesDropdown.propTypes = propTypes;

export default VersesDropdown;
