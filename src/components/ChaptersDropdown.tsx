import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import NavDropdown from 'react-bootstrap/lib/NavDropdown';
import T, { KEYS } from './T';

import { ChapterShape } from '../shapes';

const Arabic = styled.div`
  direction: rtl;
  padding-right: 5px;
`;

const StyledDropdown = styled(NavDropdown)`
  .dropdown-menu {
    max-height: 400px;
    max-height: 60vh;
    overflow-y: scroll;
    overflow-x: hidden;
    -webkit-overflow-scrolling: touch;
  }
`;

const propTypes = {
  chapters: PropTypes.objectOf(ChapterShape).isRequired,
  chapter: ChapterShape.isRequired,
};

type Props = {
  chapters: { [key: string]: ChapterShape };
  chapter: ChapterShape;
};

const ChaptersDropdown: React.SFC<Props> = ({ chapters, chapter }: Props) => (
  <StyledDropdown
    id="chapters-dropdown"
    title={chapter ? chapter.nameSimple : <T id={KEYS.SETTING_CHAPTERS} />}
  >
    {Object.values(chapters).map((currentChapter: ChapterShape) => (
      <li key={`chapter-${currentChapter.id}`}>
        <Link to={`/${currentChapter.chapterNumber}`}>
          <div className="row">
            <div className="col-xs-2 col-md-2">
              <span className="chapter-num">
                {currentChapter.chapterNumber}
              </span>
            </div>
            <div className="col-xs-7 col-md-7">
              <span className="suran-name">{currentChapter.nameSimple}</span>
              <br />
              <span className="chapter-meaning">
                {currentChapter.translatedName.name}
              </span>
            </div>
            <Arabic className="col-xs-3  col-md-3 text-right">
              {currentChapter.nameArabic}
            </Arabic>
          </div>
        </Link>
      </li>
    ))}
  </StyledDropdown>
);

ChaptersDropdown.propTypes = propTypes;

export default ChaptersDropdown;
